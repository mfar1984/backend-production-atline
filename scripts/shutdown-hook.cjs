// ─────────────────────────────────────────────────────────────
// Guarantee the process actually dies when Passenger restarts the app.
//
// ── The problem ──
//
// Restarting the Node app in cPanel left the OLD process alive. Passenger then
// started a fresh one, so the process count climbed on every restart and never
// came down, each corpse still holding its memory and its MySQL pool until the
// account hit its limits.
//
// ── Why the old process never died ──
//
// next/dist/server/lib/start-server.js installs its own SIGTERM handler, and it
// shuts down like this:
//
//     await new Promise((res) => {
//       server.close((err) => { ...; res(); });
//       if (isDev) {
//         server.closeAllConnections();   // ← development ONLY
//       }
//     });
//     ...
//     process.exit(143);
//
// server.close() stops accepting new connections but WAITS for the ones already
// open to finish. The call that forcibly destroys them, closeAllConnections(), is
// made only when isDev is true. In production nothing destroys them.
//
// That would be survivable if every connection ended on its own. One does not:
// pages/api/notifications/stream.ts is a Server-Sent Events endpoint that holds
// its response open on purpose and never calls res.end(). Every admin browser tab
// with the panel open holds one, and it only cleans up on `req.on('close')` —
// that is, when the CLIENT disconnects. Nothing tells it the server is going
// away.
//
// So the await never resolves, process.exit(143) is never reached, and the
// duplicate-signal guard inside that handler (`cleanupStarted`) means a second
// SIGTERM from Passenger is ignored too.
//
// Measured, with one open SSE stream:
//   server.close() alone                → callback NEVER fires
//   server.close() + closeAllConnections() → callback fires immediately
//
// ── The fix ──
//
// Register our own signal handler BEFORE Next registers its own — requiring this
// file ahead of the standalone server is what puts us first, since Node runs
// signal listeners in registration order. Ours destroys every open connection, so
// by the time Next's handler runs its server.close() there is nothing left to wait
// for and Next exits through its own normal path.
//
// A watchdog then guarantees the exit even if something else hangs. This matters
// more than it looks: attaching ANY listener to SIGTERM overrides Node's default
// behaviour of terminating on it, so a handler that fails to exit would make the
// process immortal — which is the exact bug being fixed here.
// ─────────────────────────────────────────────────────────────
'use strict';

const http = require('http');
const https = require('https');

/**
 * How long to allow the graceful path before leaving anyway.
 *
 * Comfortably longer than a normal shutdown, which completes in milliseconds once
 * the connections are gone, and comfortably shorter than the point at which
 * Passenger stops waiting and starts a replacement alongside the old one.
 */
const GRACE_MS = Number(process.env.SHUTDOWN_GRACE_MS || 10000);

/** Every HTTP server this process created. Next makes one; this does not assume so. */
const servers = new Set();

function capture(module) {
  const original = module.createServer;
  module.createServer = function capturingCreateServer(...args) {
    const server = original.apply(this, args);
    servers.add(server);
    // A server that is closed and gone must not be held here, or a long-running
    // process would accumulate dead references.
    server.on('close', () => servers.delete(server));
    return server;
  };
}

capture(http);
capture(https);

let started = false;

function shutdown(signal) {
  // Passenger can send the signal more than once, and Next's handler is also
  // listening. Only the first one does the work.
  if (started) return;
  started = true;

  for (const server of servers) {
    // Stop accepting new work first, so nothing reconnects into a dying process.
    try { server.close(); } catch { /* already closing */ }
    // Then hang up on what is already connected. This is the call Next omits in
    // production, and the reason the process used to survive.
    //
    // closeIdleConnections is called first so keep-alive sockets sitting between
    // requests go quietly, before anything mid-response is cut off.
    try { server.closeIdleConnections?.(); } catch { /* older Node */ }
    try { server.closeAllConnections?.(); } catch { /* older Node */ }
  }

  const code = signal === 'SIGINT' ? 130 : 143;

  // unref'd on purpose. If the event loop drains, the process exits on its own and
  // this never fires — the clean outcome. If anything is still holding the loop
  // open (the SSE poll timers, a stuck DB query), it fires and we leave regardless.
  const watchdog = setTimeout(() => {
    console.error(
      `⚠ Shutdown did not complete within ${GRACE_MS}ms — forcing exit. `
      + 'The process is being left no chance to linger.',
    );
    process.exit(code);
  }, GRACE_MS);
  watchdog.unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

// Printed so the cPanel Node.js log confirms the hook is loaded. Without it there
// is no way to tell an app that will shut down cleanly from one that will not,
// short of restarting and counting processes.
console.log(`🛑 Shutdown hook active — connections forced closed on exit, ${GRACE_MS}ms grace`);

module.exports = { servers, shutdown, GRACE_MS };

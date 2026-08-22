// ─────────────────────────────────────────────────────────────
// Resolve X-HTTP-Method-Override for EVERY route, before Next sees the request.
//
// ── The problem ──
//
// The web server in front of Passenger refuses PUT, PATCH and DELETE outright.
// Measured against sys.atline.com.my:
//
//   GET    /api/config/pwa  → 200 application/json   (our handler answered)
//   POST   /api/config/pwa  → 405 application/json   (our handler answered)
//   PUT    /api/config/pwa  → 403 text/html          (never reached Node)
//   PATCH  /api/config/pwa  → 403 text/html          (never reached Node)
//   DELETE /api/config/pwa  → 403 text/html          (never reached Node)
//
// The JSON bodies prove GET and POST arrive. The HTML 403 is LiteSpeed or
// mod_security refusing the method before Passenger, and nothing in this codebase
// can produce that response. The .htaccess block titled "Allow HTTP methods for
// API" does not help: `<LimitExcept GET POST PUT PATCH DELETE OPTIONS>` governs
// the methods NOT listed, so it says "allow everything else" — a no-op.
//
// The effect was that the admin panel could read every screen but save none of
// them: 46 fetch calls across 30 files use these three methods.
//
// ── Why this file rather than 27 edited handlers ──
//
// 27 API handlers branch on req.method. Editing each to consult an override
// header would work, and lib/fieldMethodOverride.ts already does exactly that for
// the field routes. But it puts the same three lines in 27 places, and every
// handler written afterwards has to remember — the one that forgets fails only in
// production, only on save, with a 403 that looks like a permission problem.
//
// Resolving it here means handlers keep reading req.method and keep meaning it.
//
// ── Why patching createServer is safe here ──
//
// next/dist/server/lib/start-server.js creates the listener with
// `_http.default.createServer(requestListener)`. Replacing http.createServer
// before that module is loaded lets us wrap the listener at the outermost point
// of the request path, so the method is already correct by the time Next routes,
// parses a body, or picks a handler.
//
// It is deliberately narrow: only a POST, only with the header present, only for
// the three methods, and the header is deleted afterwards so nothing downstream
// can act on it twice.
// ─────────────────────────────────────────────────────────────
'use strict';

const http = require('http');

/** Only these may be tunnelled. Never GET: a GET must stay safe and cacheable. */
const TUNNELLABLE = ['PUT', 'PATCH', 'DELETE'];
const HEADER = 'x-http-method-override';

function resolve(req) {
  // Honoured on POST only. Allowing it on GET would turn a link into a delete.
  if ((req.method || '').toUpperCase() !== 'POST') return;

  const raw = req.headers[HEADER];
  const wanted = String(Array.isArray(raw) ? raw[0] : raw || '').toUpperCase();
  if (!TUNNELLABLE.includes(wanted)) return;

  req.method = wanted;
  // Consumed. Left in place it would be re-read by lib/fieldMethodOverride.ts,
  // which is harmless today because it agrees, but it is state that has already
  // been acted on and should not be able to disagree later.
  delete req.headers[HEADER];
}

const original = http.createServer;

http.createServer = function patchedCreateServer(...args) {
  // Signature is createServer([options][, requestListener]).
  const index = args.findIndex((arg) => typeof arg === 'function');
  if (index === -1) return original.apply(this, args);

  const listener = args[index];
  const wrapped = function methodOverrideListener(req, res) {
    try {
      resolve(req);
    } catch {
      // A malformed header must never take the server down; the request simply
      // stays a POST and the handler answers 405.
    }
    return listener.call(this, req, res);
  };

  const patched = args.slice();
  patched[index] = wrapped;
  return original.apply(this, patched);
};

// Printed so the cPanel Node.js log confirms the hook is loaded, since a missing
// one looks like a permissions bug rather than a transport one.
console.log(`🔀 Method override active — POST + ${HEADER} accepted for ${TUNNELLABLE.join('/')}`);

module.exports = { resolve, HEADER, TUNNELLABLE };

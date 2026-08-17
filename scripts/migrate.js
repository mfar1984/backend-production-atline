/**
 * Run all SQL migration files in order.
 * Usage: node scripts/migrate.js
 */

const mysql = require('mysql2/promise');
const fs    = require('fs');
const path  = require('path');

/**
 * Load whichever env file this machine has.
 *
 * Development uses .env.local; the production server has .env (and no
 * .env.local). Loading only .env.local meant that on the server every DB_*
 * variable was undefined and the fallbacks below took over — so migrations ran
 * as root against a database called `atlinebackend`, which either does not exist
 * on the server or, worse, is not the one intended.
 *
 * First file wins: dotenv does not overwrite a variable that is already set, so
 * a real environment variable still beats a file.
 */
const root = path.join(__dirname, '..');
for (const file of ['.env.local', '.env', '.env.production']) {
  const full = path.join(root, file);
  if (fs.existsSync(full)) require('dotenv').config({ path: full });
}

async function run() {
  // No credential fallbacks. Silently connecting as root to a guessed database
  // is how a migration ends up running against the wrong data; a missing
  // variable has to stop the run instead.
  const missing = ['DB_HOST', 'DB_USER', 'DB_NAME']
    .filter(k => !process.env[k]);
  if (missing.length) {
    console.error(`Cannot run migrations: ${missing.join(', ')} not set.`);
    console.error(`Checked .env.local, .env and .env.production in ${root}`);
    process.exit(1);
  }

  const conn = await mysql.createConnection({
    host:     process.env.DB_HOST,
    port:     parseInt(process.env.DB_PORT || '3306'),
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME,
    multipleStatements: true,
  });

  console.log(`Database: ${process.env.DB_NAME}@${process.env.DB_HOST} as ${process.env.DB_USER}\n`);

  const migrationsDir = path.join(__dirname, '..', 'migrations');
  const files = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort();

  console.log(`Found ${files.length} migration file(s).\n`);

  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
    console.log(`Running: ${file} ...`);
    try {
      await conn.query(sql);
      console.log(`  ✓ Done\n`);
    } catch (err) {
      console.error(`  ✗ Error in ${file}:`, err.message, '\n');
    }
  }

  await conn.end();
  console.log('Migration complete.');
}

run().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});

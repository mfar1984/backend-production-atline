-- ─────────────────────────────────────────────────────────────
-- Global Config → PWA
--
-- Lets the office switch the staff app's Employee Self Service surface off
-- without a deploy. Until now the only way to stop staff applying for leave from
-- their phones was to rebuild the PWA with the tiles removed.
--
-- Every flag defaults to '1'. That is deliberate: an existing installation runs
-- this migration and behaves exactly as it did before, rather than silently
-- losing ESS the moment the schema is updated.
--
-- Stored as '1'/'0' strings in config_settings because that column is VARCHAR and
-- every other flag in the table already uses that shape (see integration_settings
-- cors_enabled). A boolean column would be cleaner and would also mean a second
-- storage convention for the same idea.
-- ─────────────────────────────────────────────────────────────

INSERT IGNORE INTO `config_settings` (`module`, `key`, `value`) VALUES
  -- Master switch. Off hides the whole ESS surface in the app and makes every
  -- /api/field/ess/* endpoint answer 403.
  ('pwa', 'ess_enabled',   '1'),
  -- Per-module, so a company can run leave through the app but keep expenses on
  -- paper. Each is ignored when the master switch is off.
  ('pwa', 'ess_leave',     '1'),
  ('pwa', 'ess_claim',     '1'),
  ('pwa', 'ess_overtime',  '1'),
  ('pwa', 'ess_expenses',  '1'),
  ('pwa', 'ess_payslips',  '1'),
  ('pwa', 'ess_kpi',       '1');

-- ── Permission for the new tab ──
--
-- Copied from settings.config.general rather than granted to role 1 by number.
-- Whoever can already edit General is the same person who should be able to reach
-- PWA, and hard-coding role 1 would leave every other admin role unable to see a
-- tab that had appeared in their sidebar.
INSERT IGNORE INTO `role_permissions` (`role_id`, `module`, `permission`)
SELECT `role_id`, 'settings.config.pwa', `permission`
FROM `role_permissions`
WHERE `module` = 'settings.config.general'
  AND `permission` IN ('Read', 'Update');

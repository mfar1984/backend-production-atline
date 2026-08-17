-- ============================================================
-- Migration 065: Separate browser sessions from app sessions
--
--   The Field Service mobile app authenticates the SAME staff
--   account that is already used for the ESS web portal. Until
--   now `api/auth/login.ts` deleted every row in user_sessions
--   for the user on each login ("force single session"), so a
--   phone login would silently sign the staff member out of the
--   web portal, and the next web login would sign the phone out.
--
--   `client_type` is set by WHICH endpoint issued the token —
--   /api/auth/login always writes 'browser', /api/field/login
--   always writes 'app'. It is never sniffed from the
--   User-Agent, which a client controls and can spoof.
--
--   Single-session enforcement now happens per client_type, so
--   web stays single-session while a staff member can carry a
--   phone and still use the web portal.
-- ============================================================

-- client_type: which surface issued this session
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='user_sessions' AND COLUMN_NAME='client_type');
SET @s := IF(@c=0, "ALTER TABLE `user_sessions` ADD COLUMN `client_type` ENUM('browser','app') NOT NULL DEFAULT 'browser' AFTER `token_hash`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- device_label: human-readable device name shown in the session list
-- so a staff member can recognise and revoke the right phone.
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='user_sessions' AND COLUMN_NAME='device_label');
SET @s := IF(@c=0, "ALTER TABLE `user_sessions` ADD COLUMN `device_label` VARCHAR(120) DEFAULT NULL AFTER `user_agent`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- last_seen_at: updated on each authenticated request so an
-- abandoned device can be spotted and revoked.
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='user_sessions' AND COLUMN_NAME='last_seen_at');
SET @s := IF(@c=0, "ALTER TABLE `user_sessions` ADD COLUMN `last_seen_at` DATETIME DEFAULT NULL AFTER `expires_at`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- Composite index: every login and every session lookup filters
-- on (user_id, client_type).
SET @c := (SELECT COUNT(*) FROM information_schema.STATISTICS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='user_sessions' AND INDEX_NAME='idx_sess_user_client');
SET @s := IF(@c=0, "ALTER TABLE `user_sessions` ADD INDEX `idx_sess_user_client` (`user_id`, `client_type`)", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- Existing rows predate the app entirely, so they are all browser
-- sessions. The column default already covers this; the UPDATE is
-- here only for rows that somehow carry NULL.
UPDATE `user_sessions` SET `client_type` = 'browser' WHERE `client_type` IS NULL;

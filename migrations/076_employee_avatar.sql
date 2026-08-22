-- ============================================================
-- Migration 076: Employee profile photo
--
-- Staff can set their own photo from the PWA. Until now the app drew initials in
-- a coloured circle and there was no way to change that from anywhere — no
-- column existed for it in this schema at all.
--
-- ── Why hr_employees and not users ──
--
-- Everything the app shows next to the circle already comes from hr_employees:
-- full_name, employee_id, department and position. The photo belongs with them.
-- It is also the record that survives: field jobs are assigned to an employee,
-- never to a user account, so a person keeps their photo through an account being
-- deleted and re-created.
--
-- ── Why a path and not the image ──
--
-- The bytes live on disk under uploads/avatars/ and this column holds the
-- relative path, matching fs_job_photos. The alternative — a base64 data URL in
-- the row, as ESS receipts and the branding logos do — would ride along in every
-- /api/field/login and /api/field/me response, which the app calls on every
-- single launch. A 100 KB photo would make the cheapest request in the system the
-- most expensive one.
--
-- avatar_updated_at is what the app actually receives. It is a version marker:
-- the client refetches the image only when this changes, so the photo is fetched
-- once and then served from the HTTP cache. Sending the path instead would leak
-- the storage layout for no gain, since the image is only ever reachable through
-- an authenticated endpoint that resolves the path itself.
-- ============================================================

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='hr_employees' AND COLUMN_NAME='avatar_path');
SET @s := IF(@c=0, "ALTER TABLE `hr_employees` ADD COLUMN `avatar_path` VARCHAR(255) DEFAULT NULL COMMENT 'relative path under uploads/ — set by the staff PWA, never sent to the client' AFTER `full_name`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- Stamped on both set and clear, so it also answers "when did this last change".
-- The API derives "is there a photo" from avatar_path, not from this.
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='hr_employees' AND COLUMN_NAME='avatar_updated_at');
SET @s := IF(@c=0, "ALTER TABLE `hr_employees` ADD COLUMN `avatar_updated_at` DATETIME DEFAULT NULL COMMENT 'version marker the app caches against' AFTER `avatar_path`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

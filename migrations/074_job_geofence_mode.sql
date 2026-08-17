-- ============================================================
-- Migration 074: Per-job geofence override
--
--   Field Settings › Geofence sets the house rule. This column lets one job
--   depart from it, because sites genuinely differ:
--
--     'default'  follow Field Settings (the normal case)
--     'off'      never block at this job — the position is still recorded, but
--                the technician is not stopped. For a customer whose equipment
--                sits in a basement car park with no sky view, or a job whose
--                real work happens at a satellite building nobody pinned.
--     'enforce'  block signing away from the site at this job even when the
--                house rule is permissive. For work that is disputed, billed by
--                attendance, or under a contract that requires proof of
--                presence.
--
--   Stored as a mode rather than a boolean because two booleans (block? require
--   GPS?) per job would let an administrator pick the one combination that
--   cannot work: demand on-site signing while allowing a signature with no GPS
--   fix, which any technician could bypass by switching location off.
--   'enforce' therefore implies both, and that decision lives in
--   resolveGeofencePolicy() so the app and the server read it identically.
--
--   The default is 'default', so every existing job keeps behaving exactly as
--   it did before this column existed.
-- ============================================================

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_jobs' AND COLUMN_NAME='geofence_mode');
SET @s := IF(@c=0, "ALTER TABLE `fs_jobs` ADD COLUMN `geofence_mode` ENUM('default','off','enforce') NOT NULL DEFAULT 'default' COMMENT 'per-job override of the Field Settings geofence rule' AFTER `geofence_radius_m`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

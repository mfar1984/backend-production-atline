-- ============================================================
-- Migration 073: Mirror the site coordinates from atlinehelp
--
--   Organizations in atlinehelp now carry latitude/longitude, set on a map in
--   External Settings › Organization List. Those coordinates are the anchor the
--   geofence measures against: a signature records its own GPS position, and the
--   distance between the two is what says whether the technician was on site.
--
--   Mirrored here so a job created in this backend can inherit the site position
--   automatically instead of an administrator retyping a coordinate pair per job
--   — which is exactly how a decimal place gets dropped and a technician ends up
--   400km from their own geofence.
--
--   DECIMAL(10,7), matching the source column. Not a float: a boundary decision
--   a customer may dispute must not move because of binary rounding.
--
--   Nullable. Most organizations predate this entirely, and the app already
--   handles that case explicitly by recording geofence_status='no_site_coords'
--   rather than pretending the technician was inside the radius.
-- ============================================================

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='ext_organizations' AND COLUMN_NAME='latitude');
SET @s := IF(@c=0, "ALTER TABLE `ext_organizations` ADD COLUMN `latitude` DECIMAL(10,7) DEFAULT NULL COMMENT 'geofence anchor, mirrored from atlinehelp' AFTER `country`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='ext_organizations' AND COLUMN_NAME='longitude');
SET @s := IF(@c=0, "ALTER TABLE `ext_organizations` ADD COLUMN `longitude` DECIMAL(10,7) DEFAULT NULL COMMENT 'geofence anchor, mirrored from atlinehelp' AFTER `latitude`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- Lets the admin UI list which mirrored sites still have no pin, since those are
-- the ones where geofencing silently cannot help.
SET @c := (SELECT COUNT(*) FROM information_schema.STATISTICS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='ext_organizations' AND INDEX_NAME='idx_ext_org_coords');
SET @s := IF(@c=0, "ALTER TABLE `ext_organizations` ADD INDEX `idx_ext_org_coords` (`latitude`, `longitude`)", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

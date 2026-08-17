-- ============================================================
-- Migration 072: Pin a photo to a device sheet
--
--   Migration 069 moved checklist rows and signatures onto a form instance
--   (job_form_id) but left fs_job_photos hanging off the job only. That is
--   wrong for the way the forms actually work: a visit produces a stack of
--   sheets, and a photo of a switch's serial label or a UPS display belongs to
--   THAT sheet, not to the visit as a whole. Without it, twenty photos from a
--   twenty-device visit arrive as one undifferentiated pile and nobody can tell
--   which device each one evidences.
--
--   Nullable on purpose: a general site photo that belongs to no single device
--   is still valid, and that is what NULL means here.
-- ============================================================

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_job_photos' AND COLUMN_NAME='job_form_id');
SET @s := IF(@c=0, "ALTER TABLE `fs_job_photos` ADD COLUMN `job_form_id` INT UNSIGNED DEFAULT NULL COMMENT 'fs_job_forms.id — null = a general site photo' AFTER `job_id`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.STATISTICS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_job_photos' AND INDEX_NAME='idx_fs_photo_form');
SET @s := IF(@c=0, "ALTER TABLE `fs_job_photos` ADD INDEX `idx_fs_photo_form` (`job_form_id`)", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- Deleting a sheet must not orphan its photos into a job they no longer
-- describe, so the reference is cleared rather than the row removed: the image
-- itself is still evidence that the visit happened.
SET @c := (SELECT COUNT(*) FROM information_schema.TABLE_CONSTRAINTS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_job_photos' AND CONSTRAINT_NAME='fk_fs_photo_form');
SET @s := IF(@c=0, "ALTER TABLE `fs_job_photos` ADD CONSTRAINT `fk_fs_photo_form` FOREIGN KEY (`job_form_id`) REFERENCES `fs_job_forms`(`id`) ON DELETE SET NULL", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

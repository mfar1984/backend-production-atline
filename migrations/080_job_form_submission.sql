-- ============================================================
-- Migration 080: When a device sheet was submitted, and by whom
--
--   A preventive maintenance visit produces a stack of sheets, one per asset,
--   and the office needs to see per asset whether that one is finished and who
--   finished it. fs_job_forms recorded neither.
--
--   `completed_at` already on the table is NOT this. That is the working time a
--   technician writes on the paper — "Completed Time 15:05" — and it is filled
--   in while the sheet is still being edited. There was no way to tell a sheet
--   nobody had opened from one that was done and handed over.
--
--   WHY NO `status` COLUMN
--
--   The three states the office table shows — Pending, In Progress, Submitted —
--   are derived in the API from these two columns plus the sheet's own checklist
--   and photo rows, which that query already joins in order to show the check
--   counts. A stored status would be a second copy of something already
--   knowable, and the copy is what goes stale the first time a later code path
--   forgets to write it. The same applies to the work order's own status: "every
--   sheet submitted" is COUNT(*) WHERE submitted_at IS NULL = 0, not a flag to
--   maintain.
-- ============================================================

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_job_forms' AND COLUMN_NAME='submitted_at');
SET @s := IF(@c=0, "ALTER TABLE `fs_job_forms` ADD COLUMN `submitted_at` DATETIME DEFAULT NULL COMMENT 'server clock; null = still open for editing' AFTER `customer_remarks`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- hr_employees, not users, for the same reason the job assignment is: a staff
-- login can be deleted or re-issued, but the record of who completed a sheet a
-- customer signed has to survive that.
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_job_forms' AND COLUMN_NAME='submitted_by');
SET @s := IF(@c=0, "ALTER TABLE `fs_job_forms` ADD COLUMN `submitted_by` INT UNSIGNED DEFAULT NULL COMMENT 'hr_employees.id of the technician who submitted it' AFTER `submitted_at`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- The office table lists sheets for one job and separates the submitted from
-- the outstanding, so the index leads with job_id.
SET @c := (SELECT COUNT(*) FROM information_schema.STATISTICS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_job_forms' AND INDEX_NAME='idx_fs_form_submitted');
SET @s := IF(@c=0, "ALTER TABLE `fs_job_forms` ADD INDEX `idx_fs_form_submitted` (`job_id`, `submitted_at`)", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

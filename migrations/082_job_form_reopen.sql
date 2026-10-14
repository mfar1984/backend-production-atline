-- ============================================================
-- Migration 082: Reopening a sheet the office needs corrected
--
--   WHY A MARKER AND NOT JUST "CLEAR submitted_at"
--
--   checkFormWritable() locks a sheet on TWO things: its own submitted_at, and
--   any signature row against it. Signing is the step immediately before
--   submitting, so a sheet submitted too early is almost always already signed
--   — and clearing submitted_at alone would leave it read-only in the app,
--   making Reopen useless for the one case it exists for.
--
--   reopened_at is what the signature branch reads. A reopen voids the lock the
--   signatures BEFORE it held; a signature captured AFTER it locks the sheet
--   again, because signed_at > reopened_at. The customer's signature is never
--   edited or deleted — this table stays append-only, as 067 requires.
--
--   WHY NO `status` COLUMN, STILL
--
--   These are event timestamps, not a state. The office table keeps deriving
--   Not Started / In Progress / Submitted from submitted_at plus the sheet's
--   own counts, exactly as 080 argued. A reopened sheet reads In Progress
--   again because its checks and photos are still there.
--
--   NO BACKFILL. NULL already means "never reopened", which is true of every
--   row that exists.
-- ============================================================

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_job_forms' AND COLUMN_NAME='reopened_at');
SET @s := IF(@c=0, "ALTER TABLE `fs_job_forms` ADD COLUMN `reopened_at` DATETIME DEFAULT NULL COMMENT 'server clock; the office sent this sheet back for correction. null = never reopened' AFTER `no_signature_reason`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- users.id, NOT hr_employees.id like submitted_by. A reopen is an office action
-- by a portal account, which need not have an employee record at all; fs_jobs
-- .created_by is the same id space for the same reason. Spelled out here
-- because the two columns sit next to each other and look alike.
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_job_forms' AND COLUMN_NAME='reopened_by');
SET @s := IF(@c=0, "ALTER TABLE `fs_job_forms` ADD COLUMN `reopened_by` INT UNSIGNED DEFAULT NULL COMMENT 'users.id of the office user who reopened it — NOT hr_employees.id like submitted_by' AFTER `reopened_at`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- Mandatory at the endpoint, so a reopened sheet always carries a stated cause.
-- The audit row has it too; this copy is what the technician is shown on the
-- sheet, because a form that silently unlocks is a form that gets resubmitted
-- unchanged.
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_job_forms' AND COLUMN_NAME='reopen_reason');
SET @s := IF(@c=0, "ALTER TABLE `fs_job_forms` ADD COLUMN `reopen_reason` VARCHAR(500) DEFAULT NULL COMMENT 'why the office reopened it; required from the operator' AFTER `reopened_by`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

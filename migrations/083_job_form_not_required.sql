-- ============================================================
-- Migration 083: "Not required" — an asset that was not serviced
--
--   A 309-sheet work order is raised from a contract, months before anyone
--   walks the site. By the time the crew arrives some of those assets are
--   decommissioned, relocated, or behind a door nobody can open. The sheet for
--   such an asset can never be filled in, and until now it blocked the whole
--   job for ever: checkSubmissionRequirements() refuses to complete a job while
--   any required Device Information field is blank, and nothing was ever going
--   to fill in the Model and Serial of a switch that is no longer there.
--
--   WHY A MARKER AND NOT A DELETE
--
--   Deleting the sheet would close the job just as well, and it was explicitly
--   rejected ("tak boleh buang"). The sheet IS the record that the asset was in
--   scope for this visit: it carries the Form No. the contract was costed
--   against, the frozen asset snapshot, and whatever the technician did manage
--   to tick before giving up. A deleted row answers "was this asset covered?"
--   with silence, which is the one answer a government client cannot be given
--   months later. Marked, it still prints, still appears in the ASSETS TO
--   MAINTAIN list, and says in its own words why it was not serviced.
--
--   This is NOT a claim that any work was done. Nothing here ticks a checklist
--   row or invents a Model or a Serial — the sheet stops BLOCKING, it does not
--   start LYING. That distinction is the whole design.
--
--   WHY NO `status` COLUMN, STILL
--
--   The same argument 080 made and 082 repeated: these are event timestamps,
--   not a state. The office table keeps deriving Not Started / In Progress /
--   Submitted / Not Required from the timestamps plus the sheet's own counts. A
--   stored status would be a second copy of something already knowable, and the
--   copy is what goes stale the first time a code path forgets to write it.
--
--   WHY THE REASON IS ON THE ROW AS WELL AS IN THE AUDIT LOG
--
--   logAudit() records every mark, so the actor and the cause are already in
--   history. This copy is what is DISPLAYED: the work-order row prints
--   "Not required — <reason>" under the status pill, the technician's blocker
--   message quotes it, and the printed page carries it. A reason reachable only
--   by opening the audit log is a reason nobody reads, and a sheet that silently
--   stops blocking is a sheet whose exemption gets forgotten and never
--   reviewed. Retracting the mark NULLs this copy; the audit row's `before`
--   block keeps the retracted text, so nothing is lost and no stale reason is
--   left dangling on a row that is required again.
--
--   NO BACKFILL. NULL already means "this sheet is required", which is true of
--   every row that exists.
-- ============================================================

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_job_forms' AND COLUMN_NAME='not_required_at');
SET @s := IF(@c=0, "ALTER TABLE `fs_job_forms` ADD COLUMN `not_required_at` DATETIME DEFAULT NULL COMMENT 'server clock; the office marked this asset as not serviced, so the sheet stops blocking job completion. null = the sheet is required' AFTER `reopen_reason`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- users.id, NOT hr_employees.id like submitted_by — the same point 082 spells
-- out for reopened_by, and worth repeating because these columns sit next to
-- each other and look alike. Marking a sheet not-required is an office decision
-- taken by a portal account, which need not have an employee record at all.
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_job_forms' AND COLUMN_NAME='not_required_by');
SET @s := IF(@c=0, "ALTER TABLE `fs_job_forms` ADD COLUMN `not_required_by` INT UNSIGNED DEFAULT NULL COMMENT 'users.id of the office user who marked it — NOT hr_employees.id like submitted_by' AFTER `not_required_at`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- Mandatory at the endpoint: this column is the only thing that distinguishes a
-- considered exemption from a shortcut taken to get a job closed. VARCHAR(500)
-- matches reopen_reason, and the endpoint trims and slices to the same length.
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_job_forms' AND COLUMN_NAME='not_required_reason');
SET @s := IF(@c=0, "ALTER TABLE `fs_job_forms` ADD COLUMN `not_required_reason` VARCHAR(500) DEFAULT NULL COMMENT 'why the asset was not serviced; required from the operator, shown on the row and on the printed page' AFTER `not_required_by`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

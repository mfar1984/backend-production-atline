-- ============================================================
-- Migration 081: The two paragraphs the photo report prints
--
--   The printed service form carries three free-text passages, and the table
--   had a column for only one of them:
--
--     Observation on arrival   page 2, under the BEFORE photos   -> NEW
--     Notes                    page 1, above the declaration     -> notes
--     Completion summary       page 2, under the AFTER photos     -> NEW
--
--   `customer_remarks` is the existing column and it is NOT any of these. It
--   held what the customer said about the work, and it is being retired: it is
--   no longer collected in the app and no longer printed. The column stays so
--   the remarks already recorded against signed sheets are not destroyed — a
--   sheet a customer signed is evidence, and dropping a column it was signed
--   with would quietly rewrite it.
--
--   WHY THREE SEPARATE COLUMNS AND NOT ONE BLOB
--
--   Each prints in a different place on a different page, and the app collects
--   each at a different point in the visit: the observation before any work is
--   done, the notes while ticking the checklist, the summary at submission. One
--   column would have to be parsed back apart to lay the page out, and the
--   first typo in a separator would move a technician's words into the wrong
--   section of a signed document.
-- ============================================================

-- What the technician found when they walked up to the device, before touching
-- it. Collected at the before-photos step, which is the only moment it can
-- honestly be written.
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_job_forms' AND COLUMN_NAME='arrival_note');
SET @s := IF(@c=0, "ALTER TABLE `fs_job_forms` ADD COLUMN `arrival_note` TEXT DEFAULT NULL COMMENT 'Observation on arrival; prints under the BEFORE photos' AFTER `customer_remarks`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- The technician's own notes to the office. Prints on page 1 above the fixed
-- declaration, in the space Customer Remarks used to occupy.
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_job_forms' AND COLUMN_NAME='notes');
SET @s := IF(@c=0, "ALTER TABLE `fs_job_forms` ADD COLUMN `notes` TEXT DEFAULT NULL COMMENT 'technician notes; prints on page 1 above the declaration' AFTER `arrival_note`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- What the visit achieved, written at submission. Prints under the AFTER
-- photos.
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_job_forms' AND COLUMN_NAME='completion_summary');
SET @s := IF(@c=0, "ALTER TABLE `fs_job_forms` ADD COLUMN `completion_summary` TEXT DEFAULT NULL COMMENT 'Completion summary; prints under the AFTER photos' AFTER `notes`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- ── Submitting without a signature ──
--
-- Nobody on site is always available to sign, and the alternative the app used
-- to leave was a sheet that could never be submitted. The reason is recorded
-- rather than left blank so the office can tell "the customer refused" from
-- "the technician skipped it", which are not the same thing when a job is
-- queried months later.
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_job_forms' AND COLUMN_NAME='no_signature_reason');
SET @s := IF(@c=0, "ALTER TABLE `fs_job_forms` ADD COLUMN `no_signature_reason` VARCHAR(255) DEFAULT NULL COMMENT 'why the sheet was submitted unsigned; null = it was signed' AFTER `submitted_by`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

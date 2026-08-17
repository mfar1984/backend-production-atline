-- ============================================================
-- Migration 071: Mirror the project's Contract / Reference No.
--
--   Added to atlinehelp's `projects` table and exposed by its read-only API.
--   It is the number the customer knows the engagement by, e.g.
--   QT240000000024647, and it is printed at the top of every PM service form.
--
--   Distinct from `po_number`, which is already mirrored: a PO is raised per
--   order, the contract reference identifies the agreement, and the two do not
--   always match.
-- ============================================================

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='ext_projects' AND COLUMN_NAME='contract_reference');
SET @s := IF(@c=0, "ALTER TABLE `ext_projects` ADD COLUMN `contract_reference` VARCHAR(120) DEFAULT NULL COMMENT 'Contract / Reference No. from atlinehelp' AFTER `org_name`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- Jobs are looked up by this reference when a customer calls about a contract.
SET @c := (SELECT COUNT(*) FROM information_schema.STATISTICS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='ext_projects' AND INDEX_NAME='idx_ext_project_contract');
SET @s := IF(@c=0, "ALTER TABLE `ext_projects` ADD INDEX `idx_ext_project_contract` (`contract_reference`)", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- The PM form number is now <WO|SC>-YYMMDD-NNN, taking its prefix from the job
-- type via the existing jobs.wo_prefix / jobs.sc_prefix settings. The separate
-- 'PM' form prefix no longer has a reader, and dead configuration invites
-- someone to change it and wonder why nothing happens.
DELETE FROM `fs_settings` WHERE `module` = 'jobs' AND `key_name` = 'form_prefix';

-- ============================================================
-- Migration 068: Field Service approval flow + checklist templates
--
--   LIFECYCLE
--     Draft/Open → Assigned → In Progress → Completed
--                                              ├─ Approve → Approved → Fully Completed
--                                              └─ Reject  → In Progress (rework)
--     Cancelled is reachable from any non-terminal status.
--
--   "Completed" means the technician submitted from site: photos taken,
--   customer signed. It is NOT the end of the job — the company still has to
--   verify the work, and may want to raise an invoice first. That verification
--   is the Approve step, and "Fully Completed" is the final close-out.
--
--   Work orders raised by staff in the app follow the same path, which is why
--   `created_source` is recorded: an office-raised job and a staff-raised job
--   are otherwise indistinguishable once submitted.
--
--   Both job types now share ONE status vocabulary. Service Cases previously
--   had Resolved/Closed, which would have meant a second approval engine for
--   no behavioural difference.
-- ============================================================

-- ── fs_jobs: approval progress ──

-- Which level of the approval chain has signed off so far. 0 = none yet.
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_jobs' AND COLUMN_NAME='current_level');
SET @s := IF(@c=0, "ALTER TABLE `fs_jobs` ADD COLUMN `current_level` INT NOT NULL DEFAULT 0 AFTER `status`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- Who raised it. Staff-raised jobs still need company approval, so this is
-- the only way to tell the two intake routes apart afterwards.
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_jobs' AND COLUMN_NAME='created_source');
SET @s := IF(@c=0, "ALTER TABLE `fs_jobs` ADD COLUMN `created_source` ENUM('backend','app') NOT NULL DEFAULT 'backend' AFTER `created_by`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- hr_employees.id of the technician who submitted from site. Distinct from
-- created_by, which is a users.id and may be an office account.
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_jobs' AND COLUMN_NAME='submitted_by');
SET @s := IF(@c=0, "ALTER TABLE `fs_jobs` ADD COLUMN `submitted_by` INT UNSIGNED DEFAULT NULL AFTER `created_source`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_jobs' AND COLUMN_NAME='submitted_at');
SET @s := IF(@c=0, "ALTER TABLE `fs_jobs` ADD COLUMN `submitted_at` DATETIME DEFAULT NULL AFTER `submitted_by`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_jobs' AND COLUMN_NAME='approved_at');
SET @s := IF(@c=0, "ALTER TABLE `fs_jobs` ADD COLUMN `approved_at` DATETIME DEFAULT NULL AFTER `completed_at`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_jobs' AND COLUMN_NAME='rejected_at');
SET @s := IF(@c=0, "ALTER TABLE `fs_jobs` ADD COLUMN `rejected_at` DATETIME DEFAULT NULL AFTER `approved_at`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_jobs' AND COLUMN_NAME='reject_reason');
SET @s := IF(@c=0, "ALTER TABLE `fs_jobs` ADD COLUMN `reject_reason` VARCHAR(500) DEFAULT NULL AFTER `rejected_at`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_jobs' AND COLUMN_NAME='fully_completed_at');
SET @s := IF(@c=0, "ALTER TABLE `fs_jobs` ADD COLUMN `fully_completed_at` DATETIME DEFAULT NULL AFTER `reject_reason`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_jobs' AND COLUMN_NAME='fully_completed_by');
SET @s := IF(@c=0, "ALTER TABLE `fs_jobs` ADD COLUMN `fully_completed_by` INT UNSIGNED DEFAULT NULL COMMENT 'users.id' AFTER `fully_completed_at`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- ── fs_jobs: invoicing ──
-- Raising an invoice is optional. When it IS raised the number is mandatory,
-- because a job marked as invoiced with no reference cannot be reconciled
-- against the accounts later.

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_jobs' AND COLUMN_NAME='invoice_no');
SET @s := IF(@c=0, "ALTER TABLE `fs_jobs` ADD COLUMN `invoice_no` VARCHAR(80) DEFAULT NULL AFTER `fully_completed_by`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_jobs' AND COLUMN_NAME='invoice_date');
SET @s := IF(@c=0, "ALTER TABLE `fs_jobs` ADD COLUMN `invoice_date` DATE DEFAULT NULL AFTER `invoice_no`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_jobs' AND COLUMN_NAME='invoice_amount');
SET @s := IF(@c=0, "ALTER TABLE `fs_jobs` ADD COLUMN `invoice_amount` DECIMAL(14,2) DEFAULT NULL AFTER `invoice_date`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_jobs' AND COLUMN_NAME='invoice_remarks');
SET @s := IF(@c=0, "ALTER TABLE `fs_jobs` ADD COLUMN `invoice_remarks` VARCHAR(500) DEFAULT NULL AFTER `invoice_amount`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_jobs' AND COLUMN_NAME='invoiced_at');
SET @s := IF(@c=0, "ALTER TABLE `fs_jobs` ADD COLUMN `invoiced_at` DATETIME DEFAULT NULL AFTER `invoice_remarks`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_jobs' AND COLUMN_NAME='invoiced_by');
SET @s := IF(@c=0, "ALTER TABLE `fs_jobs` ADD COLUMN `invoiced_by` INT UNSIGNED DEFAULT NULL COMMENT 'users.id' AFTER `invoiced_at`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- Invoice numbers must be unique so the same invoice cannot be attached to two
-- jobs. NULL is allowed many times over, which is what we want for the
-- majority of jobs that are never invoiced.
SET @c := (SELECT COUNT(*) FROM information_schema.STATISTICS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_jobs' AND INDEX_NAME='uq_fs_invoice_no');
SET @s := IF(@c=0, "ALTER TABLE `fs_jobs` ADD UNIQUE KEY `uq_fs_invoice_no` (`invoice_no`)", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- ── Approval chain configuration ──
--   Mirrors hr_approval_workflow so administrators configure it the same way
--   they already configure Leave and Claim. Approvers are administrator user
--   accounts. The chain controls HOW MANY sign-offs are needed; WHO may click
--   is enforced by the Approve/Reject permission on the job module.
CREATE TABLE IF NOT EXISTS `fs_approval_workflow` (
  `id`               INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `module`           VARCHAR(40)  NOT NULL COMMENT 'work_order | service_case',
  `level`            INT          NOT NULL DEFAULT 1,
  `approver_user_id` INT UNSIGNED DEFAULT NULL COMMENT 'users.id of an administrator',
  `approver_role`    VARCHAR(100) DEFAULT NULL COMMENT 'snapshot label only, written server-side',
  `status`           ENUM('Active','Inactive') NOT NULL DEFAULT 'Active',
  `created_at`       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_fs_wf_module` (`module`, `level`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Approval action history ──
--   Append-only. Includes Submitted / Invoiced / Fully Completed as well as
--   Approved / Rejected, so the job detail page can show one continuous
--   timeline instead of stitching together scattered timestamp columns.
CREATE TABLE IF NOT EXISTS `fs_approval_records` (
  `id`            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `job_id`        INT UNSIGNED NOT NULL,
  `module`        VARCHAR(40)  NOT NULL COMMENT 'work_order | service_case',
  `level`         INT          NOT NULL DEFAULT 0,
  `action`        VARCHAR(30)  NOT NULL COMMENT 'Submitted | Approved | Rejected | Invoiced | Fully Completed',
  `actor_user_id` INT UNSIGNED DEFAULT NULL,
  `actor_name`    VARCHAR(150) DEFAULT NULL,
  `remarks`       VARCHAR(500) DEFAULT NULL,
  `created_at`    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_fs_ar_job` (`job_id`, `id`),
  CONSTRAINT `fk_fs_ar_job` FOREIGN KEY (`job_id`) REFERENCES `fs_jobs`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Checklist form templates ──
--   A preventive-maintenance sheet is not a flat list: it is sections
--   ("Cabling", "Switch", "UPS") each with their own tasks. Modelling that as
--   template → group → item lets one template reproduce the paper form, while
--   `group_id NULL` still allows a plain ungrouped checklist for the common
--   case where a single extra item is all that is needed.
CREATE TABLE IF NOT EXISTS `fs_checklist_templates` (
  `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name`        VARCHAR(150) NOT NULL,
  `job_type`    ENUM('work_order','service_case','any') NOT NULL DEFAULT 'any'
                COMMENT 'restricts which job types may pick this template',
  `description` VARCHAR(500) DEFAULT NULL,
  -- Applied automatically to a new job of the matching type. Enforced in code
  -- rather than by a constraint, because "only one default per job_type"
  -- cannot be expressed as a unique key alongside job_type='any'.
  `is_default`  TINYINT(1)   NOT NULL DEFAULT 0,
  `status`      ENUM('Active','Inactive') NOT NULL DEFAULT 'Active',
  `created_by`  INT UNSIGNED DEFAULT NULL COMMENT 'users.id',
  `created_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_fs_tpl_name` (`name`),
  KEY `idx_fs_tpl_type` (`job_type`, `status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `fs_checklist_groups` (
  `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `template_id` INT UNSIGNED NOT NULL,
  `name`        VARCHAR(200) NOT NULL,
  `seq`         SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_fs_grp_tpl` (`template_id`, `seq`),
  CONSTRAINT `fk_fs_grp_tpl` FOREIGN KEY (`template_id`) REFERENCES `fs_checklist_templates`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `fs_checklist_items` (
  `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `template_id` INT UNSIGNED NOT NULL,
  -- NULL = an ungrouped item, listed before/outside any section.
  `group_id`    INT UNSIGNED DEFAULT NULL,
  `item`        VARCHAR(400) NOT NULL,
  `is_required` TINYINT(1)   NOT NULL DEFAULT 0,
  `seq`         SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_fs_itm_tpl` (`template_id`, `seq`),
  KEY `idx_fs_itm_grp` (`group_id`),
  CONSTRAINT `fk_fs_itm_tpl` FOREIGN KEY (`template_id`) REFERENCES `fs_checklist_templates`(`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_fs_itm_grp` FOREIGN KEY (`group_id`) REFERENCES `fs_checklist_groups`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── fs_job_checklist: carry the group label onto the job ──
--   A frozen label, not a FK: the template may be renamed or deleted later,
--   but the sheet the customer signed must keep reading the same way.
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_job_checklist' AND COLUMN_NAME='group_name');
SET @s := IF(@c=0, "ALTER TABLE `fs_job_checklist` ADD COLUMN `group_name` VARCHAR(200) DEFAULT NULL AFTER `job_id`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_job_checklist' AND COLUMN_NAME='group_seq');
SET @s := IF(@c=0, "ALTER TABLE `fs_job_checklist` ADD COLUMN `group_seq` SMALLINT UNSIGNED NOT NULL DEFAULT 0 AFTER `group_name`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_job_checklist' AND COLUMN_NAME='template_id');
SET @s := IF(@c=0, "ALTER TABLE `fs_job_checklist` ADD COLUMN `template_id` INT UNSIGNED DEFAULT NULL COMMENT 'fs_checklist_templates.id it came from' AFTER `group_seq`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- Which template (if any) was applied to the job, for reporting.
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_jobs' AND COLUMN_NAME='template_id');
SET @s := IF(@c=0, "ALTER TABLE `fs_jobs` ADD COLUMN `template_id` INT UNSIGNED DEFAULT NULL COMMENT 'fs_checklist_templates.id' AFTER `requires_photos`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- ── Settings: approval + invoicing defaults ──
INSERT IGNORE INTO `fs_settings` (`module`, `key_name`, `value`, `is_secret`) VALUES
  ('approval', 'require_approval',        '1', 0),
  ('approval', 'allow_app_created_jobs',  '1', 0),
  ('approval', 'require_signature_before_submit', '1', 0),
  ('approval', 'require_photos_before_submit',    '0', 0),
  ('approval', 'invoice_enabled',         '1', 0),
  ('approval', 'invoice_required',        '0', 0);

-- Service Cases used Resolved/Closed before this migration. Nothing has been
-- deployed with those values, but normalise defensively so the two job types
-- cannot disagree about what "finished" means.
UPDATE `fs_jobs` SET `status` = 'Completed'       WHERE `status` = 'Resolved';
UPDATE `fs_jobs` SET `status` = 'Fully Completed' WHERE `status` = 'Closed';

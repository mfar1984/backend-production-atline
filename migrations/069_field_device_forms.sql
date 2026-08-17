-- ============================================================
-- Migration 069: Per-device PM service forms
--
--   WHY THIS RESHAPES MIGRATION 068's MODEL
--
--   The real ATLINE forms are one form PER DEVICE TYPE — Server, Switch,
--   Firewall, WiFi Controller, Access Point, UPS, PC — and each has its own
--   Device Information block with DIFFERENT fields:
--
--     Server            Model, S/N, IP, Location, Date Manufacture, OS, Application
--     Switch/Firewall/  Model, S/N, IP, Location, Date Manufacture, Firmware Ver.
--       WiFi Controller
--     Access Point      Model, S/N, IP, Location
--     UPS               Model, S/N, UPS Type, Location
--     PC                Model, S/N, Windows Version, Location
--
--   Those fields cannot be fixed columns on fs_jobs, so they are defined per
--   template (fs_template_fields) and answered per device (fs_job_form_fields).
--
--   One site visit produces a STACK of forms: a single work order at a
--   polytechnic may cover 1 server, 3 switches, 2 access points and a UPS —
--   seven separate sheets, each signed. So the "group" is a FORM INSTANCE bound
--   to one device, not a section inside one template. fs_job_forms is that
--   instance; fs_checklist_groups (sections WITHIN a template) is kept because a
--   long form like the 14-item Server sheet may still want sub-headings.
--
--   Checklist rows now hang off a form instance. `job_form_id IS NULL` remains
--   the ad-hoc case — a one-off check added to the job that belongs to no
--   device form at all.
-- ============================================================

-- ── Templates: identify the device and the printed form title ──
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_checklist_templates' AND COLUMN_NAME='device_type');
SET @s := IF(@c=0, "ALTER TABLE `fs_checklist_templates` ADD COLUMN `device_type` VARCHAR(80) DEFAULT NULL COMMENT 'Server | Switch | Firewall | ... — matches the asset category where possible' AFTER `job_type`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_checklist_templates' AND COLUMN_NAME='form_title');
SET @s := IF(@c=0, "ALTER TABLE `fs_checklist_templates` ADD COLUMN `form_title` VARCHAR(200) DEFAULT NULL COMMENT 'heading printed on the sheet' AFTER `device_type`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- Locked templates are the seeded ATLINE forms. They can be copied and their
-- items edited, but not deleted, so a live contract cannot lose its form.
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_checklist_templates' AND COLUMN_NAME='is_system');
SET @s := IF(@c=0, "ALTER TABLE `fs_checklist_templates` ADD COLUMN `is_system` TINYINT(1) NOT NULL DEFAULT 0 AFTER `is_default`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- ── Device Information field definitions, per template ──
CREATE TABLE IF NOT EXISTS `fs_template_fields` (
  `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `template_id` INT UNSIGNED NOT NULL,
  `label`       VARCHAR(120) NOT NULL COMMENT 'as printed, e.g. "Firmware Ver."',
  -- Stable machine key so the same concept can be compared across device types
  -- (every form has serial_number, only some have firmware_ver).
  `field_key`   VARCHAR(60)  NOT NULL,
  `input_type`  ENUM('text','textarea','date','number') NOT NULL DEFAULT 'text',
  -- Where the technician should not have to retype what the asset mirror
  -- already knows: 'serial_number' | 'model' | 'location' | 'asset_tag'.
  `autofill_from` VARCHAR(40) DEFAULT NULL,
  `is_required` TINYINT(1)   NOT NULL DEFAULT 0,
  `seq`         SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_fs_tf` (`template_id`, `field_key`),
  KEY `idx_fs_tf_tpl` (`template_id`, `seq`),
  CONSTRAINT `fk_fs_tf_tpl` FOREIGN KEY (`template_id`) REFERENCES `fs_checklist_templates`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── One filled-in form on a job ──
--   Everything printed on the sheet is frozen here, because the sheet is signed
--   by the customer and must still read the same way after the template is
--   edited or the asset renamed upstream.
CREATE TABLE IF NOT EXISTS `fs_job_forms` (
  `id`            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `job_id`        INT UNSIGNED NOT NULL,
  `template_id`   INT UNSIGNED DEFAULT NULL COMMENT 'null once the template is deleted',
  `form_no`       VARCHAR(60)  DEFAULT NULL COMMENT '"Form No." on the printed sheet',
  `seq`           SMALLINT UNSIGNED NOT NULL DEFAULT 0,

  -- Frozen template identity.
  `template_name` VARCHAR(150) DEFAULT NULL,
  `form_title`    VARCHAR(200) DEFAULT NULL,
  `device_type`   VARCHAR(80)  DEFAULT NULL,

  -- The device this sheet covers. FK to the mirror plus a frozen serial/tag,
  -- for the same reason fs_job_assets keeps a snapshot.
  `ext_asset_id`  INT UNSIGNED DEFAULT NULL COMMENT 'ext_assets.ext_id (the upstream helpdesk id)',
  `snap_asset_tag` VARCHAR(60) DEFAULT NULL,
  `snap_serial`   VARCHAR(255) DEFAULT NULL,

  -- The paper records these per sheet, not per visit: a technician working
  -- through seven devices starts and finishes each one at a different time.
  `commence_at`   DATETIME     DEFAULT NULL,
  `completed_at`  DATETIME     DEFAULT NULL,
  `attended_by`   VARCHAR(200) DEFAULT NULL COMMENT 'free text as written on the sheet',

  `customer_remarks` TEXT      DEFAULT NULL,

  `created_at`    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_fs_form_no` (`form_no`),
  KEY `idx_fs_form_job` (`job_id`, `seq`),
  KEY `idx_fs_form_asset` (`ext_asset_id`),
  CONSTRAINT `fk_fs_form_job` FOREIGN KEY (`job_id`) REFERENCES `fs_jobs`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Device Information answers ──
--   Label is copied in alongside the key so a sheet still prints correctly
--   after someone renames the field on the template.
CREATE TABLE IF NOT EXISTS `fs_job_form_fields` (
  `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `job_form_id` INT UNSIGNED NOT NULL,
  `label`       VARCHAR(120) NOT NULL,
  `field_key`   VARCHAR(60)  NOT NULL,
  `input_type`  VARCHAR(20)  NOT NULL DEFAULT 'text',
  `value`       TEXT         DEFAULT NULL,
  `seq`         SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_fs_jff` (`job_form_id`, `field_key`),
  KEY `idx_fs_jff_form` (`job_form_id`, `seq`),
  CONSTRAINT `fk_fs_jff_form` FOREIGN KEY (`job_form_id`) REFERENCES `fs_job_forms`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Checklist rows now belong to a form instance ──
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_job_checklist' AND COLUMN_NAME='job_form_id');
SET @s := IF(@c=0, "ALTER TABLE `fs_job_checklist` ADD COLUMN `job_form_id` INT UNSIGNED DEFAULT NULL COMMENT 'null = ad-hoc item on the job, not part of a device form' AFTER `job_id`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.STATISTICS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_job_checklist' AND INDEX_NAME='idx_fs_check_form');
SET @s := IF(@c=0, "ALTER TABLE `fs_job_checklist` ADD INDEX `idx_fs_check_form` (`job_form_id`, `seq`)", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- The paper has a Comment column beside every Check box. `remarks` already
-- exists but at 400 chars; widen it, because a technician explaining a fault
-- writes more than a label.
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_job_checklist' AND COLUMN_NAME='remarks' AND CHARACTER_MAXIMUM_LENGTH < 1000);
SET @s := IF(@c=1, "ALTER TABLE `fs_job_checklist` MODIFY COLUMN `remarks` VARCHAR(1000) DEFAULT NULL COMMENT 'the Comment column on the printed form'", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- ── Signatures are per sheet ──
--   Each device form carries its own Engineer and Customer Acknowledgement, so
--   a signature belongs to a form. NULL keeps job-level signatures valid for
--   jobs that are not device-form based.
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_job_signatures' AND COLUMN_NAME='job_form_id');
SET @s := IF(@c=0, "ALTER TABLE `fs_job_signatures` ADD COLUMN `job_form_id` INT UNSIGNED DEFAULT NULL COMMENT 'which device sheet was signed; null = signed for the whole job' AFTER `job_id`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.STATISTICS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_job_signatures' AND INDEX_NAME='idx_fs_sig_form');
SET @s := IF(@c=0, "ALTER TABLE `fs_job_signatures` ADD INDEX `idx_fs_sig_form` (`job_form_id`)", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- The Engineer Acknowledgement block is a company signature, not a customer
-- one, so the role list has to allow it.
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_job_signatures' AND COLUMN_NAME='signer_role' AND COLUMN_TYPE NOT LIKE '%engineer%');
SET @s := IF(@c=1, "ALTER TABLE `fs_job_signatures` MODIFY COLUMN `signer_role` ENUM('customer','engineer','technician','witness') NOT NULL DEFAULT 'customer'", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- Company Stamp is a separate box on the customer side of the sheet.
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_job_signatures' AND COLUMN_NAME='company_stamp_path');
SET @s := IF(@c=0, "ALTER TABLE `fs_job_signatures` ADD COLUMN `company_stamp_path` VARCHAR(400) DEFAULT NULL COMMENT 'optional photo of the customer company stamp' AFTER `file_size`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- ── fs_jobs: the "For Office Use Only" block and the contract reference ──
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_jobs' AND COLUMN_NAME='contract_ref');
SET @s := IF(@c=0, "ALTER TABLE `fs_jobs` ADD COLUMN `contract_ref` VARCHAR(120) DEFAULT NULL COMMENT 'Contract / Reference No. on the form' AFTER `job_no`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_jobs' AND COLUMN_NAME='hours_logged');
SET @s := IF(@c=0, "ALTER TABLE `fs_jobs` ADD COLUMN `hours_logged` DECIMAL(6,2) DEFAULT NULL AFTER `invoiced_by`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_jobs' AND COLUMN_NAME='travel_cost');
SET @s := IF(@c=0, "ALTER TABLE `fs_jobs` ADD COLUMN `travel_cost` DECIMAL(10,2) DEFAULT NULL COMMENT 'Traveling' AFTER `hours_logged`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_jobs' AND COLUMN_NAME='parking_cost');
SET @s := IF(@c=0, "ALTER TABLE `fs_jobs` ADD COLUMN `parking_cost` DECIMAL(10,2) DEFAULT NULL COMMENT 'Parking' AFTER `travel_cost`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_jobs' AND COLUMN_NAME='checked_by');
SET @s := IF(@c=0, "ALTER TABLE `fs_jobs` ADD COLUMN `checked_by` VARCHAR(150) DEFAULT NULL COMMENT 'Check by' AFTER `parking_cost`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_jobs' AND COLUMN_NAME='manager_name');
SET @s := IF(@c=0, "ALTER TABLE `fs_jobs` ADD COLUMN `manager_name` VARCHAR(150) DEFAULT NULL COMMENT 'Manager' AFTER `checked_by`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- Customer Information block: the paper asks for a department and a phone that
-- may differ from the organisation record in the mirror.
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_jobs' AND COLUMN_NAME='contact_department');
SET @s := IF(@c=0, "ALTER TABLE `fs_jobs` ADD COLUMN `contact_department` VARCHAR(150) DEFAULT NULL AFTER `contact_name`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- Sequence counter for Form No. allocation, per year.
INSERT IGNORE INTO `fs_settings` (`module`, `key_name`, `value`, `is_secret`) VALUES
  ('jobs', 'form_prefix', 'PM', 0);

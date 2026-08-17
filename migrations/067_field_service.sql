-- ============================================================
-- Migration 067: Field Service
--
--   Work Orders (planned site work) and Service Cases (reactive
--   faults) share one table because they share every field, the
--   same assignment model, the same checklist, the same photo
--   evidence and the same customer signature. `job_type` keeps
--   them apart in the UI. Two near-identical tables would have
--   meant two of everything downstream.
--
--   Assignment is to `hr_employees`, never to `users`: a staff
--   login can be deleted or re-issued, but the record of who
--   attended a site and witnessed a signature must survive.
-- ============================================================

-- ── Jobs ──
CREATE TABLE IF NOT EXISTS `fs_jobs` (
  `id`              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `job_no`          VARCHAR(40)  NOT NULL COMMENT 'WO-2026-0001 / SC-2026-0001',
  `job_type`        ENUM('work_order','service_case') NOT NULL,
  `title`           VARCHAR(255) NOT NULL,
  `description`     TEXT         DEFAULT NULL,

  -- ── Customer & site ──
  -- FK to the mirror for navigation, PLUS a frozen name. The mirror is
  -- refreshed from atlinehelp, and an organisation or project renamed there
  -- must not silently rewrite what the customer already signed.
  `ext_org_id`      INT UNSIGNED DEFAULT NULL COMMENT 'ext_organizations.ext_id (the upstream helpdesk id)',
  `ext_project_id`  INT UNSIGNED DEFAULT NULL COMMENT 'ext_projects.ext_id (the upstream helpdesk id)',
  `customer_name`   VARCHAR(255) DEFAULT NULL COMMENT 'frozen at creation',
  `site_name`       VARCHAR(255) DEFAULT NULL COMMENT 'frozen at creation',
  `site_address`    TEXT         DEFAULT NULL,

  -- ── Geofence ──
  -- Captured now so signature records carry the distance from day one. The
  -- enforcement UI comes later; until then geofence_status is informational.
  `site_lat`            DECIMAL(10,7) DEFAULT NULL,
  `site_lng`            DECIMAL(10,7) DEFAULT NULL,
  `geofence_radius_m`   INT UNSIGNED  DEFAULT NULL COMMENT 'null = fall back to fs_settings default',

  -- ── Site contact ──
  `contact_name`    VARCHAR(150) DEFAULT NULL,
  `contact_phone`   VARCHAR(60)  DEFAULT NULL,
  `contact_email`   VARCHAR(150) DEFAULT NULL,

  -- ── Scheduling & state ──
  `priority`        VARCHAR(20)  NOT NULL DEFAULT 'Normal' COMMENT 'Low | Normal | High | Urgent',
  `status`          VARCHAR(30)  NOT NULL DEFAULT 'Draft'
                    COMMENT 'work_order: Draft | Assigned | In Progress | Completed | Cancelled; service_case: Open | Assigned | In Progress | Resolved | Closed | Cancelled',
  `scheduled_start` DATETIME     DEFAULT NULL,
  `scheduled_end`   DATETIME     DEFAULT NULL,
  `started_at`      DATETIME     DEFAULT NULL COMMENT 'set by the app when the technician starts on site',
  `completed_at`    DATETIME     DEFAULT NULL,
  `cancelled_at`    DATETIME     DEFAULT NULL,
  `cancel_reason`   VARCHAR(400) DEFAULT NULL,

  -- ── Outcome ──
  `work_summary`    TEXT         DEFAULT NULL COMMENT 'what was actually done, written on site',
  `findings`        TEXT         DEFAULT NULL,
  `recommendation`  TEXT         DEFAULT NULL,
  `requires_signature` TINYINT(1) NOT NULL DEFAULT 1,
  `requires_photos`    TINYINT(1) NOT NULL DEFAULT 0,

  `created_by`      INT UNSIGNED DEFAULT NULL COMMENT 'users.id of the admin who raised it',
  `created_at`      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_fs_job_no` (`job_no`),
  KEY `idx_fs_job_type_status` (`job_type`, `status`),
  KEY `idx_fs_job_org` (`ext_org_id`),
  KEY `idx_fs_job_project` (`ext_project_id`),
  KEY `idx_fs_job_sched` (`scheduled_start`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Assigned staff ──
--   Several technicians can attend one job; exactly one is the Lead, and the
--   Lead is the one who runs the customer signature step.
CREATE TABLE IF NOT EXISTS `fs_job_staff` (
  `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `job_id`      INT UNSIGNED NOT NULL,
  `employee_id` INT UNSIGNED NOT NULL COMMENT 'hr_employees.id',
  `is_lead`     TINYINT(1)   NOT NULL DEFAULT 0,
  `assigned_by` INT UNSIGNED DEFAULT NULL COMMENT 'users.id',
  `assigned_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_fs_job_staff` (`job_id`, `employee_id`),
  KEY `idx_fs_staff_employee` (`employee_id`),
  CONSTRAINT `fk_fs_staff_job` FOREIGN KEY (`job_id`) REFERENCES `fs_jobs`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Assets covered by the job ──
--   Both a link to the mirror AND a frozen snapshot. The snapshot is what
--   appears on the signed job sheet; editing the asset in atlinehelp later
--   must not change a document a customer already put their name to.
CREATE TABLE IF NOT EXISTS `fs_job_assets` (
  `id`              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `job_id`          INT UNSIGNED NOT NULL,
  `ext_asset_id`    INT UNSIGNED DEFAULT NULL COMMENT 'ext_assets.ext_id, null if the asset was later purged',

  -- Frozen snapshot, written once when the asset is attached.
  `snap_asset_tag`  VARCHAR(60)  DEFAULT NULL,
  `snap_serial`     VARCHAR(255) DEFAULT NULL,
  `snap_model`      VARCHAR(255) DEFAULT NULL,
  `snap_brand`      VARCHAR(200) DEFAULT NULL,
  `snap_category`   VARCHAR(200) DEFAULT NULL,
  `snap_location`   VARCHAR(200) DEFAULT NULL,
  `snap_status`     VARCHAR(40)  DEFAULT NULL,

  `action_taken`    VARCHAR(60)  DEFAULT NULL COMMENT 'Inspected | Repaired | Replaced | Installed | Removed | No Fault Found | Other',
  `remarks`         TEXT         DEFAULT NULL,
  `added_at`        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_fs_job_asset` (`job_id`, `ext_asset_id`),
  KEY `idx_fs_job_asset_ext` (`ext_asset_id`),
  KEY `idx_fs_job_asset_serial` (`snap_serial`),
  CONSTRAINT `fk_fs_asset_job` FOREIGN KEY (`job_id`) REFERENCES `fs_jobs`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Checklist ──
CREATE TABLE IF NOT EXISTS `fs_job_checklist` (
  `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `job_id`      INT UNSIGNED NOT NULL,
  `seq`         SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  `item`        VARCHAR(400) NOT NULL,
  `is_required` TINYINT(1)   NOT NULL DEFAULT 0,
  `is_done`     TINYINT(1)   NOT NULL DEFAULT 0,
  `remarks`     VARCHAR(400) DEFAULT NULL,
  `done_at`     DATETIME     DEFAULT NULL,
  `done_by`     INT UNSIGNED DEFAULT NULL COMMENT 'hr_employees.id',
  PRIMARY KEY (`id`),
  KEY `idx_fs_check_job` (`job_id`, `seq`),
  CONSTRAINT `fk_fs_check_job` FOREIGN KEY (`job_id`) REFERENCES `fs_jobs`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Photo evidence ──
--   Files live on disk under uploads/field/photos, not in the database:
--   site photos are large and the existing base64-in-column pattern used
--   elsewhere in this project does not scale to a photo per asset per job.
CREATE TABLE IF NOT EXISTS `fs_job_photos` (
  `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `job_id`      INT UNSIGNED NOT NULL,
  `ext_asset_id` INT UNSIGNED DEFAULT NULL COMMENT 'optional: photo of one specific asset',
  `kind`        ENUM('before','after','issue','serial','other') NOT NULL DEFAULT 'other',
  `file_path`   VARCHAR(400) NOT NULL COMMENT 'relative to the uploads root',
  `file_name`   VARCHAR(255) DEFAULT NULL,
  `file_size`   INT UNSIGNED DEFAULT NULL,
  `mime_type`   VARCHAR(100) DEFAULT NULL,
  `caption`     VARCHAR(400) DEFAULT NULL,
  -- Where the phone was when the shutter fired, if the user granted location.
  `gps_lat`     DECIMAL(10,7) DEFAULT NULL,
  `gps_lng`     DECIMAL(10,7) DEFAULT NULL,
  `taken_at`    DATETIME     DEFAULT NULL COMMENT 'device clock, may be wrong',
  `uploaded_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'server clock, authoritative',
  `uploaded_by` INT UNSIGNED DEFAULT NULL COMMENT 'hr_employees.id',
  PRIMARY KEY (`id`),
  KEY `idx_fs_photo_job` (`job_id`, `kind`),
  CONSTRAINT `fk_fs_photo_job` FOREIGN KEY (`job_id`) REFERENCES `fs_jobs`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Customer signatures ──
--   Append-only evidence. There is no updated_at and no UPDATE path: the
--   Signature Records permission is Read/Export only. A signature captured
--   in error is superseded by a new one, never edited.
CREATE TABLE IF NOT EXISTS `fs_job_signatures` (
  `id`              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `job_id`          INT UNSIGNED NOT NULL,
  `signer_role`     ENUM('customer','technician','witness') NOT NULL DEFAULT 'customer',
  `signer_name`     VARCHAR(150) NOT NULL,
  `signer_designation` VARCHAR(150) DEFAULT NULL,
  `signer_ic`       VARCHAR(50)  DEFAULT NULL,
  `signer_phone`    VARCHAR(60)  DEFAULT NULL,

  -- PNG on disk, not base64 in the row: a signature is queried in lists far
  -- more often than it is rendered, and a MEDIUMTEXT column would be dragged
  -- through every one of those queries.
  `file_path`       VARCHAR(400) NOT NULL COMMENT 'uploads/field/signatures/...png',
  `file_size`       INT UNSIGNED DEFAULT NULL,
  -- SHA-256 of the PNG bytes. Lets us prove later that the stored image is
  -- the one that was captured, and detects silent file corruption.
  `content_hash`    CHAR(64)     DEFAULT NULL,

  -- Server clock only. The device clock is attacker-controlled and is
  -- recorded separately in device_time for comparison, never trusted.
  `signed_at`       DATETIME     NOT NULL,
  `device_time`     DATETIME     DEFAULT NULL,

  `gps_lat`         DECIMAL(10,7) DEFAULT NULL,
  `gps_lng`         DECIMAL(10,7) DEFAULT NULL,
  `gps_accuracy_m`  DECIMAL(8,2)  DEFAULT NULL,
  `geofence_status` ENUM('inside','outside','unknown','no_site_coords') NOT NULL DEFAULT 'unknown',
  `geofence_distance_m` DECIMAL(10,2) DEFAULT NULL COMMENT 'metres from the site coordinates',

  `device_info`     VARCHAR(255) DEFAULT NULL COMMENT 'model / OS reported by the app',
  `app_version`     VARCHAR(40)  DEFAULT NULL,
  `ip_address`      VARCHAR(45)  DEFAULT NULL,

  `captured_by`     INT UNSIGNED DEFAULT NULL COMMENT 'hr_employees.id of the staff holding the device',
  `created_at`      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_fs_sig_job` (`job_id`),
  KEY `idx_fs_sig_signed` (`signed_at`),
  KEY `idx_fs_sig_geofence` (`geofence_status`),
  CONSTRAINT `fk_fs_sig_job` FOREIGN KEY (`job_id`) REFERENCES `fs_jobs`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Field Service settings ──
CREATE TABLE IF NOT EXISTS `fs_settings` (
  `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `module`      VARCHAR(40)  NOT NULL COMMENT 'atlinehelp | geofence | jobs',
  `key_name`    VARCHAR(60)  NOT NULL,
  `value`       TEXT         DEFAULT NULL,
  `is_secret`   TINYINT(1)   NOT NULL DEFAULT 0 COMMENT 'never returned to the browser in clear',
  `updated_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_fs_setting` (`module`, `key_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Defaults. INSERT IGNORE so re-running the migration never overwrites a
-- value the administrator has since changed.
INSERT IGNORE INTO `fs_settings` (`module`, `key_name`, `value`, `is_secret`) VALUES
  ('atlinehelp', 'base_url',        'https://helpdesk.atline.com.my', 0),
  ('atlinehelp', 'api_token',       NULL, 1),
  ('atlinehelp', 'sync_enabled',    '0',  0),
  ('atlinehelp', 'sync_interval_h', '6',  0),
  ('atlinehelp', 'page_size',       '200',0),
  ('geofence',   'enforce',           '0',   0),
  ('geofence',   'default_radius_m',  '200', 0),
  ('geofence',   'require_gps',       '0',   0),
  ('geofence',   'block_on_outside',  '0',   0),
  ('jobs', 'wo_prefix',            'WO',  0),
  ('jobs', 'sc_prefix',            'SC',  0),
  ('jobs', 'require_signature',    '1',   0),
  ('jobs', 'require_photos',       '0',   0),
  ('jobs', 'max_photo_mb',         '8',   0);

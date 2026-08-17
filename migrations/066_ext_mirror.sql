-- ============================================================
-- Migration 066: Mirror of the atlinehelp inventory (read-only)
--
--   atlinehelp (helpdesk.atline.com.my) remains the master for
--   external asset data. This backend pulls it through the
--   read-only API at /api/v1 and keeps a local copy so that:
--     • the Field Service app works on a flaky mobile link
--       without every screen depending on a second remote host
--     • a job sheet can be rendered years later even if the
--       source row has since been edited or deleted
--
--   NOTHING in this backend may write to these tables except the
--   sync job. Every table therefore carries `ext_id`, which is the
--   PRIMARY KEY IN ATLINEHELP, as the unique natural key.
--
--   `deleted_at` is copied straight from the source: the API
--   returns soft-deleted rows when ?updated_since= is used, so a
--   non-null value here is a tombstone. Rows are never hard
--   deleted locally — a tombstoned asset may still be referenced
--   by an already-signed job.
-- ============================================================

-- ── Lookups (categories / brands / locations / vendors) ──
--   One table rather than four: they are all {id, name, active} with a couple
--   of kind-specific extras, and the Field Service UI only ever needs them to
--   label an asset.
CREATE TABLE IF NOT EXISTS `ext_lookups` (
  `id`            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `kind`          ENUM('category','brand','location','vendor') NOT NULL,
  `ext_id`        INT UNSIGNED NOT NULL COMMENT 'primary key in atlinehelp',
  `name`          VARCHAR(200) NOT NULL,
  `code`          VARCHAR(60)  DEFAULT NULL COMMENT 'categories only',
  `type`          VARCHAR(60)  DEFAULT NULL COMMENT 'locations: building/floor/room; vendors: organization_type',
  `parent_ext_id` INT UNSIGNED DEFAULT NULL COMMENT 'locations are a tree in atlinehelp',
  `phone`         VARCHAR(60)  DEFAULT NULL COMMENT 'vendors only',
  `email`         VARCHAR(150) DEFAULT NULL COMMENT 'vendors only',
  -- Categories carry fields_config, which drives the dynamic keys inside
  -- assets.specs. Stored verbatim so the UI can label those values instead of
  -- showing raw JSON keys.
  `extra`         TEXT         DEFAULT NULL,
  `is_active`     TINYINT(1)   NOT NULL DEFAULT 1,
  `synced_at`     DATETIME     NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_ext_lookup` (`kind`, `ext_id`),
  KEY `idx_ext_lookup_kind` (`kind`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Customers (atlinehelp `organizations`) ──
--   Column names follow the API payload, not a tidier scheme of our own, so a
--   field added upstream is obvious to map and nothing is quietly lost in
--   translation. atlinehelp stores the address as separate parts.
CREATE TABLE IF NOT EXISTS `ext_organizations` (
  `id`                INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `ext_id`            INT UNSIGNED NOT NULL COMMENT 'organizations.id in atlinehelp',
  `name`              VARCHAR(255) NOT NULL,
  `organization_type` VARCHAR(80)  DEFAULT NULL,
  `address_1`         VARCHAR(255) DEFAULT NULL,
  `address_2`         VARCHAR(255) DEFAULT NULL,
  `postcode`          VARCHAR(20)  DEFAULT NULL,
  `district`          VARCHAR(120) DEFAULT NULL,
  `state`             VARCHAR(120) DEFAULT NULL,
  `country`           VARCHAR(120) DEFAULT NULL,
  `phone`             VARCHAR(60)  DEFAULT NULL,
  `email`             VARCHAR(150) DEFAULT NULL,
  `website`           VARCHAR(200) DEFAULT NULL,
  `contact_person`    VARCHAR(150) DEFAULT NULL,
  `is_active`         TINYINT(1)   NOT NULL DEFAULT 1,
  `project_count`     INT UNSIGNED NOT NULL DEFAULT 0,
  `ext_created_at`    DATETIME     DEFAULT NULL,
  `ext_updated_at`    DATETIME     DEFAULT NULL,
  `deleted_at`        DATETIME     DEFAULT NULL COMMENT 'non-null = tombstoned in atlinehelp',
  `synced_at`         DATETIME     NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_ext_org` (`ext_id`),
  KEY `idx_ext_org_name` (`name`),
  KEY `idx_ext_org_deleted` (`deleted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Sites / contracts (atlinehelp `projects`) ──
CREATE TABLE IF NOT EXISTS `ext_projects` (
  `id`              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `ext_id`          INT UNSIGNED NOT NULL COMMENT 'projects.id in atlinehelp',
  `ext_org_id`      INT UNSIGNED DEFAULT NULL COMMENT 'organizations.id in atlinehelp',
  `org_name`        VARCHAR(255) DEFAULT NULL COMMENT 'denormalised, saves a join on every list',
  `name`            VARCHAR(255) NOT NULL,
  `description`     TEXT         DEFAULT NULL,
  `status`          VARCHAR(40)  DEFAULT NULL,
  -- Older atlinehelp projects have no organization_id and only this free-text
  -- customer name. Kept so those projects still show a customer.
  `client_name`     VARCHAR(255) DEFAULT NULL,
  `start_date`      DATE         DEFAULT NULL,
  `end_date`        DATE         DEFAULT NULL,
  `po_number`       VARCHAR(120) DEFAULT NULL,
  `purchase_date`   DATE         DEFAULT NULL,
  `warranty_period` VARCHAR(60)  DEFAULT NULL,
  `warranty_expiry` DATE         DEFAULT NULL,
  `asset_count`     INT UNSIGNED NOT NULL DEFAULT 0,
  `ext_created_at`  DATETIME     DEFAULT NULL,
  `ext_updated_at`  DATETIME     DEFAULT NULL,
  `deleted_at`      DATETIME     DEFAULT NULL COMMENT 'non-null = tombstoned in atlinehelp',
  `synced_at`       DATETIME     NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_ext_project` (`ext_id`),
  KEY `idx_ext_project_org` (`ext_org_id`),
  KEY `idx_ext_project_deleted` (`deleted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── External assets (atlinehelp `assets`) ──
--   NOT `internal_assets`, which is atlinehelp's own office inventory
--   and is deliberately not exposed by its API.
CREATE TABLE IF NOT EXISTS `ext_assets` (
  `id`              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `ext_id`          INT UNSIGNED NOT NULL COMMENT 'assets.id in atlinehelp',
  `asset_tag`       VARCHAR(60)  DEFAULT NULL COMMENT 'unique in atlinehelp, format XXX-XXX',
  -- Deliberately NOT unique: assets.serial_number in atlinehelp is nullable
  -- with no unique index, and the live inventory does contain duplicates.
  -- The lookup API reports ambiguous matches so a technician can choose.
  `serial_number`   VARCHAR(255) DEFAULT NULL,
  `model`           VARCHAR(255) DEFAULT NULL,
  `status`          VARCHAR(40)  DEFAULT NULL,
  `specs`           TEXT         DEFAULT NULL,
  `assigned_to`     VARCHAR(255) DEFAULT NULL,
  `department`      VARCHAR(255) DEFAULT NULL,
  `notes`           TEXT         DEFAULT NULL,
  `unit_price`      DECIMAL(14,2) DEFAULT NULL,
  `ext_project_id`  INT UNSIGNED DEFAULT NULL,
  `ext_org_id`      INT UNSIGNED DEFAULT NULL COMMENT 'denormalised from the project, for filtering',
  `ext_category_id` INT UNSIGNED DEFAULT NULL,
  `ext_brand_id`    INT UNSIGNED DEFAULT NULL,
  `ext_location_id` INT UNSIGNED DEFAULT NULL,
  `ext_vendor_id`   INT UNSIGNED DEFAULT NULL,
  `warranty_expiry` DATE         DEFAULT NULL,
  `ext_created_at`  DATETIME     DEFAULT NULL,
  `ext_updated_at`  DATETIME     DEFAULT NULL,
  `deleted_at`      DATETIME     DEFAULT NULL COMMENT 'non-null = tombstoned in atlinehelp',
  `synced_at`       DATETIME     NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_ext_asset` (`ext_id`),
  KEY `idx_ext_asset_serial` (`serial_number`),
  KEY `idx_ext_asset_tag` (`asset_tag`),
  KEY `idx_ext_asset_project` (`ext_project_id`),
  KEY `idx_ext_asset_org` (`ext_org_id`),
  KEY `idx_ext_asset_deleted` (`deleted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Sync run history ──
--   One row per sync attempt, so a stale mirror is visible in the UI
--   instead of silently serving old data to technicians.
CREATE TABLE IF NOT EXISTS `ext_sync_runs` (
  `id`             INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `trigger_type`   ENUM('manual','scheduled') NOT NULL DEFAULT 'manual',
  `triggered_by`   INT UNSIGNED DEFAULT NULL COMMENT 'users.id, null for scheduled',
  `status`         ENUM('running','success','partial','failed') NOT NULL DEFAULT 'running',
  -- The high-water mark sent as ?updated_since= on the NEXT run. Only
  -- advanced on a fully successful run, so a partial failure re-fetches
  -- rather than skipping rows forever.
  `since_used`     DATETIME     DEFAULT NULL,
  `high_water`     DATETIME     DEFAULT NULL,
  `orgs_upserted`      INT UNSIGNED NOT NULL DEFAULT 0,
  `projects_upserted`  INT UNSIGNED NOT NULL DEFAULT 0,
  `assets_upserted`    INT UNSIGNED NOT NULL DEFAULT 0,
  `lookups_upserted`   INT UNSIGNED NOT NULL DEFAULT 0,
  `tombstoned`         INT UNSIGNED NOT NULL DEFAULT 0,
  `error`          TEXT         DEFAULT NULL,
  `started_at`     DATETIME     NOT NULL,
  `finished_at`    DATETIME     DEFAULT NULL,
  `duration_ms`    INT UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_sync_started` (`started_at`),
  KEY `idx_sync_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

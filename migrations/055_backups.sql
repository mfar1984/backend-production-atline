-- Backup history + extra storage settings for Cloudflare R2 / FTP
CREATE TABLE IF NOT EXISTS `backups` (
  `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `file_name`   VARCHAR(255) NOT NULL,
  `file_path`   VARCHAR(512) DEFAULT NULL COMMENT 'relative path under uploads/ for local, or remote key',
  `storage`     VARCHAR(20)  NOT NULL DEFAULT 'local' COMMENT 'local | r2 | ftp',
  `size_bytes`  BIGINT UNSIGNED NOT NULL DEFAULT 0,
  `type`        VARCHAR(10)  NOT NULL DEFAULT 'Manual' COMMENT 'Auto | Manual',
  `status`      VARCHAR(15)  NOT NULL DEFAULT 'Complete' COMMENT 'Complete | Failed | Running',
  `note`        VARCHAR(255) DEFAULT NULL,
  `created_at`  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_backups_created` (`created_at`)
-- COLLATE is stated explicitly, like every other table in migrations/.
--
-- This was the only CREATE TABLE that omitted it, so the table inherited
-- whatever the server's default happened to be: utf8mb4_0900_ai_ci on MySQL 8,
-- utf8mb4_general_ci on MariaDB. Two consequences, both real:
--
--   1. A mysqldump taken on MySQL 8 carried utf8mb4_0900_ai_ci, which MariaDB
--      rejects outright with "#1273 Unknown collation" — the import stops dead
--      on this one table out of 89.
--   2. Even where the import succeeds, `backups` ends up with a different
--      collation from every other table, and any VARCHAR comparison against
--      them fails with "Illegal mix of collations".
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Normalise a table created before the COLLATE above was added.
--
-- CREATE TABLE IF NOT EXISTS does nothing when the table already exists, so the
-- fix above only helps fresh installs. Existing databases keep the inherited
-- collation until something converts them. Guarded so it is a no-op once done.
SET @needs_convert := (
  SELECT COUNT(*) FROM information_schema.TABLES
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME   = 'backups'
    AND TABLE_COLLATION <> 'utf8mb4_unicode_ci'
);
SET @sql := IF(@needs_convert > 0,
  'ALTER TABLE `backups` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci',
  'DO 0');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Seed additional backup storage settings (idempotent)
INSERT INTO `config_settings` (`module`, `key`, `value`)
SELECT * FROM (SELECT 'backup' AS m, 'r2_account_id' AS k, '' AS v) AS t
WHERE NOT EXISTS (SELECT 1 FROM `config_settings` WHERE `module`='backup' AND `key`='r2_account_id');

INSERT INTO `config_settings` (`module`, `key`, `value`)
SELECT * FROM (SELECT 'backup', 'r2_bucket', '') AS t
WHERE NOT EXISTS (SELECT 1 FROM `config_settings` WHERE `module`='backup' AND `key`='r2_bucket');

INSERT INTO `config_settings` (`module`, `key`, `value`)
SELECT * FROM (SELECT 'backup', 'r2_access_key', '') AS t
WHERE NOT EXISTS (SELECT 1 FROM `config_settings` WHERE `module`='backup' AND `key`='r2_access_key');

INSERT INTO `config_settings` (`module`, `key`, `value`)
SELECT * FROM (SELECT 'backup', 'r2_secret', '') AS t
WHERE NOT EXISTS (SELECT 1 FROM `config_settings` WHERE `module`='backup' AND `key`='r2_secret');

INSERT INTO `config_settings` (`module`, `key`, `value`)
SELECT * FROM (SELECT 'backup', 'ftp_host', '') AS t
WHERE NOT EXISTS (SELECT 1 FROM `config_settings` WHERE `module`='backup' AND `key`='ftp_host');

INSERT INTO `config_settings` (`module`, `key`, `value`)
SELECT * FROM (SELECT 'backup', 'ftp_port', '21') AS t
WHERE NOT EXISTS (SELECT 1 FROM `config_settings` WHERE `module`='backup' AND `key`='ftp_port');

INSERT INTO `config_settings` (`module`, `key`, `value`)
SELECT * FROM (SELECT 'backup', 'ftp_user', '') AS t
WHERE NOT EXISTS (SELECT 1 FROM `config_settings` WHERE `module`='backup' AND `key`='ftp_user');

INSERT INTO `config_settings` (`module`, `key`, `value`)
SELECT * FROM (SELECT 'backup', 'ftp_pass', '') AS t
WHERE NOT EXISTS (SELECT 1 FROM `config_settings` WHERE `module`='backup' AND `key`='ftp_pass');

INSERT INTO `config_settings` (`module`, `key`, `value`)
SELECT * FROM (SELECT 'backup', 'ftp_secure', '0') AS t
WHERE NOT EXISTS (SELECT 1 FROM `config_settings` WHERE `module`='backup' AND `key`='ftp_secure');

INSERT INTO `config_settings` (`module`, `key`, `value`)
SELECT * FROM (SELECT 'backup', 'ftp_dir', '/backups') AS t
WHERE NOT EXISTS (SELECT 1 FROM `config_settings` WHERE `module`='backup' AND `key`='ftp_dir');

INSERT INTO `config_settings` (`module`, `key`, `value`)
SELECT * FROM (SELECT 'backup' AS m, 'ftp_protocol' AS k, 'ftp' AS v) AS t
WHERE NOT EXISTS (SELECT 1 FROM `config_settings` WHERE `module`='backup' AND `key`='ftp_protocol');

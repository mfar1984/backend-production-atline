-- ============================================================
-- Migration 079: Featured suppliers — brand logos for the Products page
--
-- The "Our Featured Suppliers" strip listed brand NAMES beside a generic
-- Bootstrap icon: a router glyph for Cisco, a wifi glyph for Aruba. Those icons
-- say nothing about the brand, and the section is meant to carry the weight of
-- the names on it — a customer recognises the Cisco mark, not a line-drawing of
-- a router.
--
-- The names also lived in the page-content JSON, so adding a supplier meant
-- editing content rather than managing a list, and there was nowhere to put a
-- logo file at all.
--
-- Mirrors web_products deliberately: same status/sort_order convention, same
-- three columns for an uploaded file (path on disk, original name, mime), so the
-- admin table, the upload handling and the public image route all work the way
-- the products ones already do.
-- ============================================================

CREATE TABLE IF NOT EXISTS `web_suppliers` (
  `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name`        VARCHAR(150) NOT NULL COMMENT 'shown under the logo and as its alt text',
  -- Optional. The strip becomes a link when set, which is what a visitor expects
  -- of a brand mark, but a supplier with no public site is still valid.
  `website_url` VARCHAR(400) DEFAULT NULL,
  -- On disk under uploads/suppliers, not in the row: the same reasoning as
  -- web_products.image_path. A logo is queried in lists far more often than it
  -- is rendered.
  `logo_path`   VARCHAR(400) DEFAULT NULL,
  `logo_name`   VARCHAR(255) DEFAULT NULL,
  `mime_type`   VARCHAR(120) DEFAULT NULL,
  -- Falls back to the brand name set in type when there is no logo yet, so a
  -- half-configured supplier degrades to text instead of an empty box.
  `status`      VARCHAR(20)  NOT NULL DEFAULT 'Active' COMMENT 'Active | Hidden',
  `sort_order`  INT          NOT NULL DEFAULT 0,
  `created_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_sup_status` (`status`),
  KEY `idx_sup_sort` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- The brands currently hardcoded in the page's FALLBACK, seeded so the strip is
-- not empty on the first load after deploying. Logos are uploaded afterwards;
-- until then each renders as its name, which is what the old pills showed anyway.
--
-- INSERT ... SELECT ... WHERE NOT EXISTS rather than INSERT IGNORE: `name` has no
-- unique key, because two suppliers legitimately sharing a name is not this
-- table's problem to police, so the guard has to be explicit.
INSERT INTO `web_suppliers` (`name`, `sort_order`)
SELECT v.name, v.sort_order FROM (
            SELECT 'Cisco'           AS name,  1 AS sort_order
  UNION ALL SELECT 'Aruba / HPE',            2
  UNION ALL SELECT 'Fortinet',               3
  UNION ALL SELECT 'Ubiquiti',               4
  UNION ALL SELECT 'MikroTik',               5
  UNION ALL SELECT 'Panduit',                6
  UNION ALL SELECT 'APC / Schneider',        7
  UNION ALL SELECT 'Fluke Networks',         8
  UNION ALL SELECT 'Siemon',                 9
  UNION ALL SELECT 'Commscope',             10
  UNION ALL SELECT 'Draka',                 11
  UNION ALL SELECT 'H3C',                   12
) v
WHERE NOT EXISTS (SELECT 1 FROM `web_suppliers` w WHERE w.name = v.name);

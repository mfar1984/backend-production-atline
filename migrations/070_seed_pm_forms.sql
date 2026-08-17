-- ============================================================
-- Migration 070: Seed the seven ATLINE PM service forms
--
--   Transcribed from the printed forms. Item wording is kept EXACTLY as it
--   appears on paper, including "(if any)" and "(ftp/tftp)", because the
--   technician is signing against those words and the customer is reading them.
--
--   Idempotent by design:
--     • templates    — INSERT IGNORE on the unique name
--     • fields/items — INSERT ... SELECT ... WHERE NOT EXISTS, matched by
--                      (template, field_key) and (template, item text)
--   so re-running never duplicates, and an administrator's later edits to
--   wording are not silently overwritten either.
--
--   `is_system = 1` marks these as the standard company forms: they can be
--   copied and their items edited, but not deleted.
-- ============================================================

-- ── Templates ──
INSERT IGNORE INTO `fs_checklist_templates`
  (`name`, `job_type`, `device_type`, `form_title`, `description`, `is_default`, `is_system`, `status`) VALUES
  ('Server PM',           'work_order', 'Server',           'Server Preventive Maintenance Service Form',           'Standard ATLINE server preventive maintenance sheet.',           0, 1, 'Active'),
  ('Switch PM',           'work_order', 'Switch',           'Switch Preventive Maintenance Service Form',           'Standard ATLINE network switch preventive maintenance sheet.',    0, 1, 'Active'),
  ('Firewall PM',         'work_order', 'Firewall',         'Firewall Preventive Maintenance Service Form',         'Standard ATLINE firewall preventive maintenance sheet.',          0, 1, 'Active'),
  ('WiFi Controller PM',  'work_order', 'WiFi Controller',  'WiFi Controller Preventive Maintenance Service Form',  'Standard ATLINE wireless controller preventive maintenance sheet.',0, 1, 'Active'),
  ('Access Point PM',     'work_order', 'Access Point',     'Access Point Preventive Maintenance Service Form',     'Standard ATLINE access point preventive maintenance sheet.',      0, 1, 'Active'),
  ('UPS PM',              'work_order', 'UPS',              'Preventive Maintenance Service Form',                 'Standard ATLINE UPS preventive maintenance sheet.',               0, 1, 'Active'),
  ('PC PM',               'work_order', 'PC',               'PC Preventive Maintenance Service Form',              'Standard ATLINE desktop PC preventive maintenance sheet.',        0, 1, 'Active');

-- ── Device Information fields ──
-- Helper pattern: one row per (template, field). autofill_from lets the app
-- prefill from the mirrored asset so the technician does not retype a serial
-- they have just scanned.

-- Server: Model, S/N, IP Address, Location, Date Manufacture, Operating System, Application
INSERT INTO `fs_template_fields` (`template_id`, `label`, `field_key`, `input_type`, `autofill_from`, `is_required`, `seq`)
SELECT t.id, v.label, v.field_key, v.input_type, v.autofill_from, v.is_required, v.seq
FROM `fs_checklist_templates` t
JOIN (
  SELECT 'Model'            AS label, 'model'            AS field_key, 'text'     AS input_type, 'model'         AS autofill_from, 1 AS is_required, 1 AS seq
  UNION ALL SELECT 'Serial Number',    'serial_number',    'text',     'serial_number', 1, 2
  UNION ALL SELECT 'IP Address',       'ip_address',       'text',     NULL,            0, 3
  UNION ALL SELECT 'Location',         'location',         'text',     'location',      0, 4
  UNION ALL SELECT 'Date Manufacture', 'date_manufacture', 'text',     NULL,            0, 5
  UNION ALL SELECT 'Operating System', 'operating_system', 'text',     NULL,            0, 6
  UNION ALL SELECT 'Application',      'application',      'textarea', NULL,            0, 7
) v
WHERE t.name = 'Server PM'
  AND NOT EXISTS (SELECT 1 FROM `fs_template_fields` f WHERE f.template_id = t.id AND f.field_key = v.field_key);

-- Switch / Firewall / WiFi Controller: Model, S/N, IP Address, Location, Date Manufacture, Firmware Ver.
INSERT INTO `fs_template_fields` (`template_id`, `label`, `field_key`, `input_type`, `autofill_from`, `is_required`, `seq`)
SELECT t.id, v.label, v.field_key, v.input_type, v.autofill_from, v.is_required, v.seq
FROM `fs_checklist_templates` t
JOIN (
  SELECT 'Model'            AS label, 'model'            AS field_key, 'text' AS input_type, 'model'         AS autofill_from, 1 AS is_required, 1 AS seq
  UNION ALL SELECT 'Serial Number',    'serial_number',    'text', 'serial_number', 1, 2
  UNION ALL SELECT 'IP Address',       'ip_address',       'text', NULL,            0, 3
  UNION ALL SELECT 'Location',         'location',         'text', 'location',      0, 4
  UNION ALL SELECT 'Date Manufacture', 'date_manufacture', 'text', NULL,            0, 5
  UNION ALL SELECT 'Firmware Ver.',    'firmware_ver',     'text', NULL,            0, 6
) v
WHERE t.name IN ('Switch PM', 'Firewall PM', 'WiFi Controller PM')
  AND NOT EXISTS (SELECT 1 FROM `fs_template_fields` f WHERE f.template_id = t.id AND f.field_key = v.field_key);

-- Access Point: Model, S/N, IP Address, Location
INSERT INTO `fs_template_fields` (`template_id`, `label`, `field_key`, `input_type`, `autofill_from`, `is_required`, `seq`)
SELECT t.id, v.label, v.field_key, v.input_type, v.autofill_from, v.is_required, v.seq
FROM `fs_checklist_templates` t
JOIN (
  SELECT 'Model'         AS label, 'model'         AS field_key, 'text' AS input_type, 'model'         AS autofill_from, 1 AS is_required, 1 AS seq
  UNION ALL SELECT 'Serial Number', 'serial_number', 'text', 'serial_number', 1, 2
  UNION ALL SELECT 'IP Address',    'ip_address',    'text', NULL,            0, 3
  UNION ALL SELECT 'Location',      'location',      'text', 'location',      0, 4
) v
WHERE t.name = 'Access Point PM'
  AND NOT EXISTS (SELECT 1 FROM `fs_template_fields` f WHERE f.template_id = t.id AND f.field_key = v.field_key);

-- UPS: Model, S/N, UPS Type, Location
INSERT INTO `fs_template_fields` (`template_id`, `label`, `field_key`, `input_type`, `autofill_from`, `is_required`, `seq`)
SELECT t.id, v.label, v.field_key, v.input_type, v.autofill_from, v.is_required, v.seq
FROM `fs_checklist_templates` t
JOIN (
  SELECT 'Model'         AS label, 'model'         AS field_key, 'text' AS input_type, 'model'         AS autofill_from, 1 AS is_required, 1 AS seq
  UNION ALL SELECT 'Serial Number', 'serial_number', 'text', 'serial_number', 1, 2
  UNION ALL SELECT 'UPS Type',      'ups_type',      'text', NULL,            0, 3
  UNION ALL SELECT 'Location',      'location',      'text', 'location',      0, 4
) v
WHERE t.name = 'UPS PM'
  AND NOT EXISTS (SELECT 1 FROM `fs_template_fields` f WHERE f.template_id = t.id AND f.field_key = v.field_key);

-- PC: Model, S/N, Windows Version, Location
INSERT INTO `fs_template_fields` (`template_id`, `label`, `field_key`, `input_type`, `autofill_from`, `is_required`, `seq`)
SELECT t.id, v.label, v.field_key, v.input_type, v.autofill_from, v.is_required, v.seq
FROM `fs_checklist_templates` t
JOIN (
  SELECT 'Model'         AS label, 'model'          AS field_key, 'text' AS input_type, 'model'         AS autofill_from, 1 AS is_required, 1 AS seq
  UNION ALL SELECT 'Serial Number',   'serial_number',   'text', 'serial_number', 1, 2
  UNION ALL SELECT 'Windows Version', 'windows_version', 'text', NULL,            0, 3
  UNION ALL SELECT 'Location',        'location',        'text', 'location',      0, 4
) v
WHERE t.name = 'PC PM'
  AND NOT EXISTS (SELECT 1 FROM `fs_template_fields` f WHERE f.template_id = t.id AND f.field_key = v.field_key);

-- ── Checklist items: "Details of the job performed" ──

-- Server PM (14 items)
INSERT INTO `fs_checklist_items` (`template_id`, `group_id`, `item`, `is_required`, `seq`)
SELECT t.id, NULL, v.item, 0, v.seq FROM `fs_checklist_templates` t
JOIN (
  SELECT 'Power supply and other accessories' AS item, 1 AS seq
  UNION ALL SELECT 'Check LED status', 2
  UNION ALL SELECT 'Check all connected cable/patch cord', 3
  UNION ALL SELECT 'Backup System State', 4
  UNION ALL SELECT 'Check any log for any error (capture log if any)', 5
  UNION ALL SELECT 'Empty Recycle Bin, clear cache and temporary files', 6
  UNION ALL SELECT 'Update patches, application and drivers as needed', 7
  UNION ALL SELECT 'Run Scandisk and defrag the drive as needed', 8
  UNION ALL SELECT 'Change password (if required)', 9
  UNION ALL SELECT 'Reboot the system', 10
  UNION ALL SELECT 'UPS & Battery (Self-test)', 11
  UNION ALL SELECT 'Rack equipment cleaning', 12
  UNION ALL SELECT 'Air conditioning/ventilation fan condition (if any)', 13
  UNION ALL SELECT 'Fire fighting system', 14
) v
WHERE t.name = 'Server PM'
  AND NOT EXISTS (SELECT 1 FROM `fs_checklist_items` i WHERE i.template_id = t.id AND i.item = v.item);

-- Switch PM (9 items)
INSERT INTO `fs_checklist_items` (`template_id`, `group_id`, `item`, `is_required`, `seq`)
SELECT t.id, NULL, v.item, 0, v.seq FROM `fs_checklist_templates` t
JOIN (
  SELECT 'Power supply and other accessories' AS item, 1 AS seq
  UNION ALL SELECT 'Check LED status', 2
  UNION ALL SELECT 'Check all connected cable/patch cord', 3
  UNION ALL SELECT 'Backup config files (ftp/tftp)', 4
  UNION ALL SELECT 'Check any log for any error (capture log if any)', 5
  UNION ALL SELECT 'Check the fan (clean from dust)', 6
  UNION ALL SELECT 'Cabling/patch cord tidy-up', 7
  UNION ALL SELECT 'Air conditioning/ventilation fan condition (if any)', 8
  UNION ALL SELECT 'Rack equipment cleaning', 9
) v
WHERE t.name = 'Switch PM'
  AND NOT EXISTS (SELECT 1 FROM `fs_checklist_items` i WHERE i.template_id = t.id AND i.item = v.item);

-- Firewall PM (9 items) — differs from Switch at items 6 and 8/9
INSERT INTO `fs_checklist_items` (`template_id`, `group_id`, `item`, `is_required`, `seq`)
SELECT t.id, NULL, v.item, 0, v.seq FROM `fs_checklist_templates` t
JOIN (
  SELECT 'Power supply and other accessories' AS item, 1 AS seq
  UNION ALL SELECT 'Check LED status', 2
  UNION ALL SELECT 'Check all connected cable/patch cord', 3
  UNION ALL SELECT 'Backup config files (ftp/tftp)', 4
  UNION ALL SELECT 'Check any log for any error (capture log if any)', 5
  UNION ALL SELECT 'Check any unused/old policy', 6
  UNION ALL SELECT 'Check the fan (clean from dust)', 7
  UNION ALL SELECT 'Cabling/patch cord tidy-up', 8
  UNION ALL SELECT 'Rack equipment cleaning', 9
) v
WHERE t.name = 'Firewall PM'
  AND NOT EXISTS (SELECT 1 FROM `fs_checklist_items` i WHERE i.template_id = t.id AND i.item = v.item);

-- WiFi Controller PM (9 items) — "unused/old configuration" rather than policy
INSERT INTO `fs_checklist_items` (`template_id`, `group_id`, `item`, `is_required`, `seq`)
SELECT t.id, NULL, v.item, 0, v.seq FROM `fs_checklist_templates` t
JOIN (
  SELECT 'Power supply and other accessories' AS item, 1 AS seq
  UNION ALL SELECT 'Check LED status', 2
  UNION ALL SELECT 'Check all connected cable/patch cord', 3
  UNION ALL SELECT 'Backup config files (ftp/tftp)', 4
  UNION ALL SELECT 'Check any log for any error (capture log if any)', 5
  UNION ALL SELECT 'Check any unused/old configuration', 6
  UNION ALL SELECT 'Check the fan (clean from dust)', 7
  UNION ALL SELECT 'Cabling/patch cord tidy-up', 8
  UNION ALL SELECT 'Air conditioning/ventilation fan condition (if any)', 9
) v
WHERE t.name = 'WiFi Controller PM'
  AND NOT EXISTS (SELECT 1 FROM `fs_checklist_items` i WHERE i.template_id = t.id AND i.item = v.item);

-- Access Point PM (4 items)
INSERT INTO `fs_checklist_items` (`template_id`, `group_id`, `item`, `is_required`, `seq`)
SELECT t.id, NULL, v.item, 0, v.seq FROM `fs_checklist_templates` t
JOIN (
  SELECT 'Check LED status' AS item, 1 AS seq
  UNION ALL SELECT 'Check all connected cable/patch cord', 2
  UNION ALL SELECT 'Check antenna/accessories condition', 3
  UNION ALL SELECT 'Check wireless signal', 4
) v
WHERE t.name = 'Access Point PM'
  AND NOT EXISTS (SELECT 1 FROM `fs_checklist_items` i WHERE i.template_id = t.id AND i.item = v.item);

-- UPS PM (9 items)
INSERT INTO `fs_checklist_items` (`template_id`, `group_id`, `item`, `is_required`, `seq`)
SELECT t.id, NULL, v.item, 0, v.seq FROM `fs_checklist_templates` t
JOIN (
  SELECT 'Make sure the hardware works' AS item, 1 AS seq
  UNION ALL SELECT 'Check LCD Display ON', 2
  UNION ALL SELECT 'Check UPS Last Self Test', 3
  UNION ALL SELECT 'Check Status Battery', 4
  UNION ALL SELECT 'Check Load Used', 5
  UNION ALL SELECT 'Check Battery Temp', 6
  UNION ALL SELECT 'Check Input Connection', 7
  UNION ALL SELECT 'Check Used Output Connection', 8
  UNION ALL SELECT 'UPS Status', 9
) v
WHERE t.name = 'UPS PM'
  AND NOT EXISTS (SELECT 1 FROM `fs_checklist_items` i WHERE i.template_id = t.id AND i.item = v.item);

-- PC PM (7 items)
INSERT INTO `fs_checklist_items` (`template_id`, `group_id`, `item`, `is_required`, `seq`)
SELECT t.id, NULL, v.item, 0, v.seq FROM `fs_checklist_templates` t
JOIN (
  SELECT 'Cleaning Monitor, Keyboard, mouse and CPU' AS item, 1 AS seq
  UNION ALL SELECT 'Check fan condition', 2
  UNION ALL SELECT 'Check I/O e.g. USB Ports', 3
  UNION ALL SELECT 'Check LAN Connection', 4
  UNION ALL SELECT 'Check Wireless (WLAN) Connection', 5
  UNION ALL SELECT 'Check Power', 6
  UNION ALL SELECT 'Windows Update', 7
) v
WHERE t.name = 'PC PM'
  AND NOT EXISTS (SELECT 1 FROM `fs_checklist_items` i WHERE i.template_id = t.id AND i.item = v.item);

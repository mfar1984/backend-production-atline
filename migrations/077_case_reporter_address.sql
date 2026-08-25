-- ============================================================
-- Migration 077: Reporter's address on a job
--
-- A Service Case raised from the app now records who reported the fault as a
-- full contact: name, address, phone, email. The other three already had
-- columns — contact_name, contact_phone and contact_email have been on fs_jobs
-- since 067 — so only the address is new.
--
-- ── Why this is NOT site_address ──
--
-- site_address describes the place the work happens, and for a case raised
-- against a mirrored site it is frozen from the organization's record in
-- atlinehelp. The reporter is a person, and their address is often not the site
-- at all: a building manager calling about a switch in another block, a head
-- office raising a fault at a branch. Folding the two together would overwrite a
-- snapshot that a signed job sheet prints.
--
-- ── Scope ──
--
-- Cases only, in the app. A Work Order is raised by the office against a contract
-- that already carries the customer's details, so the field is not collected
-- there — but the column is on fs_jobs rather than a case-only table because
-- fs_jobs holds both kinds and every other contact_* column lives here too.
-- ============================================================

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='fs_jobs' AND COLUMN_NAME='contact_address');
SET @s := IF(@c=0, "ALTER TABLE `fs_jobs` ADD COLUMN `contact_address` VARCHAR(400) DEFAULT NULL COMMENT 'the reporter''s own address, not the site' AFTER `contact_email`", 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- ============================================================
-- Migration 078: Emailing a completed Service Form
--
-- When a technician finishes a job the paperwork existed only inside this
-- system: the office could open the sheet and print it, but the customer got
-- nothing, and the technician had no copy of what they signed off. This seeds
-- the settings that decide who is emailed a completed Service Form.
--
-- ── Why settings rows rather than a table ──
--
-- Three recipient groups, each a yes/no, plus a free list of extra addresses.
-- fs_settings already holds every other Field Service switch, and a
-- comma-separated TEXT value is how the rest of this codebase stores a small
-- list (see config_settings.hr_notify_email). A recipients TABLE would buy
-- per-address metadata nobody has asked for, and would need its own API and its
-- own UI in a settings page that has neither for anything else.
--
-- ── Why every key is seeded here, including the empty ones ──
--
-- updateFieldSettings() refuses to CREATE rows — it only updates keys that
-- already exist, so that a typo in the browser cannot invent configuration that
-- nothing reads. A key absent from this file is therefore a key the Notification
-- tab silently fails to save. extra_recipients is seeded as NULL rather than
-- omitted for exactly that reason.
--
-- ── Why it ships switched off ──
--
-- enabled defaults to '0'. Turning this on emails customers, and SMTP on this
-- install is configured separately under Integration › Email. An install that
-- has not set that up would otherwise start throwing on every job submission
-- the moment it deployed.
--
-- ── send_on ──
--
-- 'approval' is the default and the safer of the two: the office has verified
-- the work before the customer receives a document about it, and it fires once
-- when the last approver signs off. 'submit' sends the moment the technician
-- submits from site, which is faster but means the customer may receive a form
-- the office later rejects.
-- ============================================================

-- INSERT IGNORE against uq_fs_setting(module, key_name): re-running this never
-- overwrites a value an administrator has since changed.
INSERT IGNORE INTO `fs_settings` (`module`, `key_name`, `value`, `is_secret`) VALUES
  ('notifications', 'enabled',          '0',        0),
  ('notifications', 'send_on',          'approval', 0),
  -- The customer. Address is taken from the job's own contact_email first, then
  -- the mirrored organization's email — see lib/fieldNotify.ts.
  ('notifications', 'to_client',        '0',        0),
  -- The technicians who attended. Resolved from the job's crew, not from the
  -- sheet's "Attended by" text, which is a free-text name and cannot be mapped
  -- back to a staff record.
  ('notifications', 'to_attendee',      '0',        0),
  -- Comma or newline separated. Always copied when the notification sends,
  -- regardless of the two switches above.
  ('notifications', 'extra_recipients', NULL,       0),
  -- Blank uses the global SMTP settings. Naming a profile_key from
  -- email_profiles lets customer-facing mail leave from a different sender than
  -- internal HR mail does.
  ('notifications', 'mail_profile',     NULL,       0);

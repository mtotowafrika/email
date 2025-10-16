# Email Agent — test helpers

This repository contains small helper files to test SMTP connectivity and sending a single email with an optional attachment.

Files added:
- `test-smtp.js` — verifies SMTP connection using values from your `.env`.
- `test-send-one.js` — attempts to send one email to `TEST_RECIPIENT` (or `EMAIL_USER` if not set). Looks for an optional attachment at `uploads/sample.pdf`.
- `sample_contacts.csv` — a tiny example CSV matching the app's expected headers (`name,email`).

How to use
1. Make sure your `.env` contains valid SMTP settings (`SMTP_HOST`, `SMTP_PORT`, `EMAIL_USER`, `EMAIL_PASS`).
2. To verify the SMTP connection:

```pwsh
node test-smtp.js
```

3. To test sending one email (optionally with an attachment):
- Place a small file at `uploads/sample.pdf` (create the `uploads/` directory if it doesn't exist).
- Run:

```pwsh
node test-send-one.js
```

4. You can edit `sample_contacts.csv` and upload it in the dashboard to test batch sending.

Notes
- These scripts use the same transporter configuration as your app (secure:true when port is 465). If your provider requires STARTTLS on port 587, set `SMTP_PORT=587` in `.env`.
- If `test-smtp.js` fails, copy the error output here and I will help diagnose (DNS resolution, port blocked, auth error, etc.).

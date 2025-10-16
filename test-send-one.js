require("dotenv").config();
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

(async function () {
  const smtpPort = Number(process.env.SMTP_PORT) || 465;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: { rejectUnauthorized: false },
  });

  const to = process.env.TEST_RECIPIENT || process.env.EMAIL_USER;
  const attachmentPath = path.join(__dirname, "uploads", "sample.pdf");
  const attachments = [];

  if (fs.existsSync(attachmentPath)) {
    attachments.push({ filename: "sample.pdf", path: attachmentPath });
  } else {
    console.warn(
      "No sample attachment found at",
      attachmentPath,
      "\nContinuing without attachment. Place a small file at that path to test attachments."
    );
  }

  const mail = {
    from: `"Test" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Test email from emailagent (with optional attachment)",
    text: "This is a test email sent from the emailagent app. If an attachment was placed at uploads/sample.pdf it will be attached.",
    attachments,
  };

  try {
    const info = await transporter.sendMail(mail);
    console.log("Send succeeded:", info && (info.response || info));
  } catch (err) {
    console.error("Send failed:");
    console.error(err);
    process.exitCode = 1;
  }
})();

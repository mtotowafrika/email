require("dotenv").config();
const nodemailer = require("nodemailer");

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

  try {
    await transporter.verify();
    console.log("SMTP connection OK — transporter.verify() passed");
  } catch (err) {
    console.error("SMTP verify failed:");
    console.error(err);
    process.exitCode = 1;
  }
})();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "3f7e1287069079",
    pass: "c8e0a1ae6dd8d2",
  },
});

module.exports = transporter;

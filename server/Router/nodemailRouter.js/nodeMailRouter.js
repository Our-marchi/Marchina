const express = require('express');
const mailerRouter = express.Router();
const nodemailer = require("nodemailer");

var myemail = process.env.SENDER_EMAIL;
var mypassword = process.env.APPLICATION_PASSWORD;

function sendEmail({ name, recipient_email, subject, message }) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: myemail,
        pass: mypassword,
      },
    });

    const mail_configs = {
      from: myemail,
      to: recipient_email,
      subject: "Thank you for contacting us",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Thank you for contacting us</title>
</head>
<body>
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2>Thank you for reaching out</h2>
    <p>Dear ${name},</p>
    <p>We have received your message regarding . Our team will review your order and get back to you as soon as possible.</p>
    <p>Thank you for your patience.</p>
    <p>Best regards,<br>Customer Support Team</p>
    
  </div>
</body>
</html>`,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occurred` });
      }
      return resolve({ message: "Email sent successfully" });
    });
  });
}

mailerRouter.post("/send_email", (req, res) => {
  sendEmail(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});
module.exports = { mailerRouter };
const nodemailer = require("nodemailer");
require("dotenv").config();
async function sendFeedBack(name,email,feedback) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL,
      pass: process.env.PASS_KEY,
    },
  });
  const mailOptions = {
    from: name,
    to: process.env.GMAIL,
    subject: "Feedback from User",
    html: `
        <div style="font-family: Arial, sans-serif; text-align: center;">
          <h2 style="color: #333;">We appreciate your feedback!</h2>
          <br/>
          <br/>
          <p style="font-size: 18px;">Username: ${name}</p>
          <p style="font-size: 18px;">Email: ${email}</p>
          <p style="font-size: 18px;">Feedback:</p>
          <p style="font-size: 18px;">${feedback}</p>
          <p style="font-size: 16px; color: #666;">Best Regards,</p>
          <p style="font-size: 16px; color: #666;">Your Company Name</p>
        </div>
      `,
};

  await transporter.sendMail(mailOptions);
}

module.exports = { sendFeedBack };

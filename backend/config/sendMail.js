import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // or use 'smtp'
  secure: true,
  auth: {
    user: process.env.USER_EMAIL, // your email
    pass: process.env.USER_PASSWORD, // app password (not your Gmail password!)
  },
});

// Send email function
export const sendMail = async (to, otp, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.USER_EMAIL, // sender address
      to: to, // list of receivers
      subject: "Reset your password",
      text, // plain text body
      html: `<h2>🔐 Password Reset Request</h2>
             <p>Hello,</p>
             <p>Your <strong>One-Time Password (OTP)</strong> is:</p>
             <h1 style="letter-spacing: 5px; color:#000;">${otp}</h1>
             <p>This code will <strong>expire in 5 minutes</strong>.</p>
             <p>If you did not request a password reset, you can safely ignore this email.</p>
             <br/>
             <p>Thanks,<br/>The Support Team</p>`, // html body
    });

    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

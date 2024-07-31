require("dotenv").config()
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

const sendOTPEmail = async (to, otp) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      secure:true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: "BlogeIt",
      to: to,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log('OTP Email sent: ' + info.response);
    return info
  } catch (error) {
    console.error('Error sending OTP email: ', error);
    throw error;
  }

};

module.exports = {
  generateOTP,
  sendOTPEmail,
};

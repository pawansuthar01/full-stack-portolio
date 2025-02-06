import nodemailer from "nodemailer";
const sendEmail = async function (email, subject, message) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    const info = await transporter.sendMail({
      from: `${process.env.SMTP_USERNAME}<${process.env.SMTP_USER}>`,
      to: email,
      subject: subject,
      html: message,
    });
    return info;
  } catch (error) {
    throw error;
  }
};
export default sendEmail;

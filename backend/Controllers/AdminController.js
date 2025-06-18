import AdminData from "../Modules/Admin.js";
import AppError from "../Utils/AppErrors.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import sendEmail from "../Utils/EmailSender.js";
import * as dotenv from "dotenv";
import OtpModule from "../Modules/OtpModule.js";
import UserRouter from "../Routers/UserRouter.js";

dotenv.config();

const failedAttempts = new Map();

// 🔹 Utility to generate and send password reset email
const generateAndSendResetEmail = async (admin, email, next) => {
  const resetToken = admin.generatePasswordResetToken();
  await admin.save();

  const resetURL = `${process.env.FRONTEND_CLIENT_URL}/changePassword/${resetToken}`;
  const subject = "Reset Password";
  const message = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4; border-radius: 8px;">
      <h2 style="color: #333;">🔐 Reset Your Password</h2>
      <p>Hello <strong>Admin</strong>,</p>
      <p>Click the button below to reset your password. This link will expire in 10 minutes.</p>
      <p><a href="${resetURL}" style="padding: 10px 20px; background: #007bff; color: #fff; border-radius: 4px; text-decoration: none;">🔄 Reset Password</a></p>
      <p>If that doesn't work, copy and paste this link into your browser:</p>
      <code style="word-break: break-word;">${resetURL}</code>
      <hr />
      <p>Regards,<br /><strong>Pawan Kumar</strong></p>
    </div>
  `;

  try {
    await sendEmail(email, subject, message);
  } catch (err) {
    admin.forgotPasswordToken = undefined;
    admin.forgotPasswordExpiry = undefined;
    await admin.save();
    return next(new AppError("Failed to send email: " + err.message, 500));
  }
};

// 🔹 Admin Login or Create
export const AdminCheck = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Email and password are required.", 400));
  }

  try {
    let admin = await AdminData.findOne({ Key_id: "_Admin_ID_" });

    // First-time setup: create admin
    if (!admin) {
      admin = new AdminData({ email, password });
      await admin.save();
      return res
        .status(200)
        .json({ success: true, message: "Admin created successfully." });
    }

    // Email check
    if (admin.email !== email) {
      return res
        .status(401)
        .json({ success: false, message: "Email mismatch." });
    }

    if (!failedAttempts.has(email)) failedAttempts.set(email, 0);

    const isValid = await bcrypt.compare(password, admin.password);

    if (isValid) {
      failedAttempts.set(email, 0);

      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      // Delete previous OTPs
      await OtpModule.deleteMany({ email });

      // Save new OTP
      await OtpModule.create({ email, otp: otpCode, expiry });
      const subject = "🔐 Your OTP Code";
      const message = `
      <div style="font-family: Arial; padding: 20px;">
        <h2>OTP Verification</h2>
        <p>Your OTP code is:</p>
        <h1 style="letter-spacing: 3px;">${otpCode}</h1>
        <p>This code is valid for 10 minutes.</p>
      </div>
    `;

      await sendEmail(email, subject, message);
      // Login alert email

      return res.status(200).json({
        success: true,
        message: "otp send  successfully.",
        email: email,
      });
    }

    let attempts = failedAttempts.get(email) + 1;
    failedAttempts.set(email, attempts);

    if (attempts >= 5) {
      failedAttempts.set(email, 0);
      await generateAndSendResetEmail(admin, email, next);
      return res.status(400).json({
        success: false,
        message: "Too many failed attempts. Reset password email sent.",
      });
    }

    return res.status(400).json({
      success: false,
      message: `Incorrect password. Attempt ${attempts}/5.`,
    });
  } catch (err) {
    return next(new AppError(err.message || "Login failed", 500));
  }
};

// 🔹 Send Reset Password Email Manually
export const sendResetPasswordEmail = async (email, next) => {
  if (!email) return next(new AppError("Please provide an email", 400));

  const admin = await AdminData.findOne({ email });
  if (!admin) return next(new AppError("No admin found with this email", 400));

  await generateAndSendResetEmail(admin, email, next);
};

// 🔹 Change Password Using Reset Token
export const changePassword = async (req, res, next) => {
  const { resetToken } = req.params;
  const { newPassword } = req.body;
  if (!newPassword) return next(new AppError("New password required", 400));

  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const admin = await AdminData.findOne({
      forgotPasswordToken: hashedToken,
      forgotPasswordExpiry: { $gt: Date.now() },
    });

    if (!admin) return next(new AppError("Invalid or expired token", 400));

    admin.password = newPassword;
    admin.forgotPasswordToken = undefined;
    admin.forgotPasswordExpiry = undefined;
    await admin.save();

    await sendEmail(
      admin.email,
      "🔒 Password Changed",
      `<div style="font-family: Arial, sans-serif; padding: 20px;">
        <h3>Password Changed</h3>
        <p>Your password has been changed successfully. If this wasn't you, please contact support.</p>
      </div>`
    );

    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully." });
  } catch (err) {
    return next(new AppError(err.message, 400));
  }
};

// 🔹 Validate Reset Token (e.g., before showing reset form)
export const checkPasswordResetToken = async (req, res, next) => {
  const { resetToken } = req.params;
  if (!resetToken) return next(new AppError("Token required", 400));

  try {
    const hashed = crypto.createHash("sha256").update(resetToken).digest("hex");
    const admin = await AdminData.findOne({
      forgotPasswordToken: hashed,
      forgotPasswordExpiry: { $gt: Date.now() },
    });

    if (!admin) return next(new AppError("Invalid or expired token", 400));
    return res.status(200).json({ success: true, message: "Valid token." });
  } catch (err) {
    return next(new AppError(err.message, 400));
  }
};

// 🔹 Change Password from Profile (Authenticated)
export const updatePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword)
    return next(new AppError("All fields required", 400));

  try {
    const admin = await AdminData.findOne({ Key_id: "_Admin_ID_" });
    if (!admin) return next(new AppError("Login required", 401));

    const isMatch = await admin.comparePassword(oldPassword);
    if (!isMatch) return next(new AppError("Incorrect old password", 400));

    admin.password = newPassword;

    const resetToken = admin.generatePasswordResetToken();
    await admin.save();

    const resetURL = `${process.env.FRONTEND_CLIENT_URL}/changePassword/${resetToken}`;

    await sendEmail(
      admin.email,
      "🔒 Password Changed",
      `<div style="font-family: Arial, sans-serif; padding: 20px;">
        <h3>Password Changed</h3>
        <p>Your password has been changed successfully at ${new Date().toLocaleString()}.</p>
        <p>If this wasn't you, click below to reset:</p>
        <a href="${resetURL}" style="padding: 10px 20px; background: #dc3545; color: #fff; border-radius: 4px;">Reset Password</a>
      </div>`
    );

    res
      .status(200)
      .json({ success: true, message: "Password changed successfully." });
  } catch (err) {
    return next(new AppError(err.message, 400));
  }
};
/// otp send///

export const sendOtp = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: "Email required" });
  }

  console.log(req.body);
  try {
    // 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Delete previous OTPs
    await OtpModule.deleteMany({ email });

    // Save new OTP
    await OtpModule.create({ email, otp: otpCode, expiry });

    const subject = "🔐 Your OTP Code";
    const message = `
      <div style="font-family: Arial; padding: 20px;">
        <h2>OTP Verification</h2>
        <p>Your OTP code is:</p>
        <h1 style="letter-spacing: 3px;">${otpCode}</h1>
        <p>This code is valid for 10 minutes.</p>
      </div>
    `;

    await sendEmail(email, subject, message);

    return res
      .status(200)
      .json({ success: true, message: "OTP sent to email" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
// verify otp//
export const verifyOtp = async (req, res, next) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res
      .status(400)
      .json({ success: false, message: "Email and OTP required" });
  }

  try {
    const record = await OtpModule.findOne({ email });

    if (!record)
      return res.status(400).json({ success: false, message: "OTP not found" });

    if (record.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (record.expiry < new Date()) {
      await OtpModule.deleteMany({ email });
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    // OTP is valid
    await OtpModule.deleteMany({ email }); // Optional: remove after success
    const user = await AdminData.findOne({ email });

    res.status(200).json({
      success: true,
      message: "OTP verified",
      user,
      expired: new Date(Date.now() + 24 * 60 * 60),
    });
    (async () => {
      await sendEmail(
        process.env.EMAIL,
        "🔐 Admin Login Alert",
        `<div style="font-family: Arial, sans-serif; padding: 20px;">
          <h3>Admin Login Detected</h3>
          <p>Login detected to your admin panel. If this was not you, reset your password immediately.</p>
          <p>&copy; ${new Date().getFullYear()} Your Security Team</p>
        </div>`
      );
    })();
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

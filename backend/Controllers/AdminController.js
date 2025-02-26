import AdminData from "../Modules/Admin.js";
import AppError from "../Utils/AppErrors.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import sendEmail from "../Utils/EmailSender.js";
import * as dotenv from "dotenv";
dotenv.config();
const failedAttempts = new Map();

// 🔹 Send Reset Password Email
export const sendResetPasswordEmail = async (email, next) => {
  if (!email) {
    return next(new AppError("Enter your email.", 400));
  }

  const adminExist = await AdminData.findOne({ email });
  if (!adminExist) {
    return next(new AppError("Email not found...", 400));
  }

  const resetToken = adminExist.generatePasswordResetToken();

  await adminExist.save();

  const resetPassword_url = `${process.env.FRONTEND_URL}/changePassword/${resetToken}`;
  const subject = "Reset Password";
  const message = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
    <h2 style="color: #333; text-align: center;">🔒 Password Reset Request</h2>
    
    <p>Dear <strong>${" Admin"}</strong>,</p>

    <p>We received a request to reset your password. If you made this request, please click the button below to reset your password:</p>

    <p style="text-align: center;">
      <a href="${resetPassword_url}" 
         style="color: #ffffff; background-color: #007bff; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block;">
         🔄 Reset Your Password
      </a>
    </p>

    <p>If the button above doesn't work, copy and paste this link into your browser:</p>
    <p style="word-break: break-word; background-color: #f9f9f9; padding: 10px; border-left: 3px solid #007bff;">
      ${resetPassword_url}
    </p>

    <p><strong>⏳ This link is valid for only 10 minutes.</strong> If you did not request this, please ignore this email.</p>

    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">

    <p>If you need further assistance, feel free to contact us at 
      <a href="mailto:${process.env.EMAIL}" style="color: #007bff;">${
    process.env.EMAIL
  }</a>.
    </p>

    <p>Best regards,</p>
    <p><strong>Pawan Kumar</strong></p>
  </div>
`;

  try {
    await sendEmail(email, subject, message);
  } catch (error) {
    adminExist.forgotPasswordToken = undefined;
    adminExist.forgotPasswordExpiry = undefined;
    await adminExist.save();
    return next(new AppError("Failed to send email: " + error.message, 500));
  }
};

// 🔹 Admin Login or Create
export const AdminCheck = async (req, res, next) => {
  const { password, email } = req.params;

  if (!password || !email) {
    return next(
      new AppError("Admin authentication requires email and password", 400)
    );
  }

  try {
    const findAdmin = await AdminData.findOne({ Key_id: "_Admin_ID_" });

    if (!findAdmin) {
      const createAdmin = new AdminData({ email, password });
      await createAdmin.save();
      return res.status(200).json({
        success: true,
        message: "Admin account created successfully.",
      });
    }

    if (findAdmin?.email !== email) {
      return res.status(401).json({
        success: false,
        message: "Email does not match.",
      });
    }

    if (!failedAttempts.has(email)) {
      failedAttempts.set(email, 0);
    }

    const isPasswordValid = await bcrypt.compare(password, findAdmin.password);

    if (isPasswordValid) {
      failedAttempts.set(email, 0);
      return res.status(200).json({
        success: true,
        message: "Successfully logged in as Admin.",
      });
    } else {
      let attempts = failedAttempts.get(email) + 1;
      failedAttempts.set(email, attempts);

      if (attempts >= 5) {
        failedAttempts.set(email, 0);
        try {
          await sendResetPasswordEmail(email, next);
          return res.status(400).json({
            success: false,
            message:
              "Too many failed attempts. A reset password email has been sent.",
          });
        } catch (error) {
          return next(new AppError(error));
        }
      }

      return res.status(400).json({
        success: false,
        message: `Password does not match. Attempt ${attempts}/5`,
      });
    }
  } catch (error) {
    return next(new AppError(error.message || "Something went wrong...", 500));
  }
};

// 🔹 Change Password After Reset
export const changePassword = async (req, res, next) => {
  const { resetToken } = req.params;
  const { newPassword } = req.body;

  if (!newPassword) {
    return next(new AppError("Enter your new password", 400));
  }

  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const admin = await AdminData.findOne({
      forgotPasswordToken: hashedToken,
      forgotPasswordExpiry: { $gt: Date.now() },
    });

    if (!admin) {
      return next(
        new AppError("Invalid or expired token, please try again", 400)
      );
    }

    admin.password = newPassword;
    admin.forgotPasswordToken = undefined;
    admin.forgotPasswordExpiry = undefined;

    await admin.save();
    const subject = "🔒 Password Changed Successfully";

    const message = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
        <h2 style="color: #28a745; text-align: center;">🔒 Password Changed Successfully</h2>
        
        <p>Dear <strong>${"Admin"}</strong>,</p>
    
        <p>Your password has been successfully updated.</p>
    
        <p>If you did not make this change, please contact support immediately.</p>
    
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
    
        <p>Best regards,</p>
        <p><strong>Pawan Kumar</strong></p>
      </div>
    `;

    try {
      await sendEmail(admin.email, subject, message);
    } catch (error) {
      return next(new AppError("Failed to send email: " + error.message, 500));
    }
    res.status(200).json({
      success: true,
      message: "Password successfully updated.",
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

// 🔹 Check Password Reset Token Validity
export const checkPasswordResetToken = async (req, res, next) => {
  const { resetToken } = req.params;

  if (!resetToken) {
    return next(new AppError("Reset token not found", 400));
  }

  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const admin = await AdminData.findOne({
      forgotPasswordToken: hashedToken,
      forgotPasswordExpiry: { $gt: Date.now() },
    });

    if (!admin) {
      return next(
        new AppError("Invalid or expired token, please try again", 400)
      );
    }

    res.status(200).json({
      success: true,
      message: "Token is valid.",
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

// 🔹 Update Password (Authenticated Admin)
export const updatePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return next(new AppError("All fields are required.", 400));
  }

  try {
    const adminExist = await AdminData.findOne({ Key_id: "_Admin_ID_" });

    if (!adminExist) {
      return next(new AppError("Please log in.", 400));
    }

    const isMatch = await adminExist.comparePassword(oldPassword);
    if (!isMatch) {
      return next(new AppError("Old password does not match.", 400));
    }

    adminExist.password = newPassword;

    const resetToken = adminExist.generatePasswordResetToken();

    await adminExist.save();

    const resetPassword_url = `${process.env.FRONTEND_URL}/changePassword/${resetToken}`;
    const subject = "🔒 Password Changed Successfully";

    const message = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
        <h2 style="color: #28a745; text-align: center;">🔒 Password Changed Successfully</h2>
        
        <p>Dear <strong>${"Admin"}</strong>,</p>
    
        <p>We wanted to inform you that your password was successfully changed on <strong>${new Date().toLocaleString()}</strong>.</p>
    
        <p>If you made this change, no further action is required.</p>
    
        <p>⚠️ <strong>Didn't request this change?</strong></p>
        <p>If you did not request this password change, please reset your password immediately using the link below:</p>
    
        <p style="text-align: center;">
          <a href="${resetPassword_url}" 
             style="color: #ffffff; background-color: #dc3545; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block;">
             🔄 Reset Your Password
          </a>
        </p>
    
        <p>If you have any concerns, please contact our support team at 
          <a href="mailto:${process.env.EMAIL}" style="color: #007bff;">${
      process.env.EMAIL
    }</a>.
        </p>
    
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
    
        <p>Best regards,</p>
        <p><strong>Pawan Kumar</strong></p>
      </div>
    `;

    try {
      await sendEmail(adminExist.email, subject, message);
    } catch (error) {
      adminExist.forgotPasswordToken = undefined;
      adminExist.forgotPasswordExpiry = undefined;
      await adminExist.save();
      return next(new AppError("Failed to send email: " + error.message, 500));
    }
    res.status(200).json({
      success: true,
      message: "Password successfully updated.",
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

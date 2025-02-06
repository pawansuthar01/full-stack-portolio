import admin from "../Config/AdminFirebase.js";
import Notification from "../Modules/NotificationModule.js";
import User from "../Modules/UserModule.js";
import AppError from "../Utils/AppErrors.js";
import jwt from "jsonwebtoken";
import sendEmail from "../Utils/SendEmail.js";
export const RegisterUser = async (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    return next(new AppError("token is required to register user", 400));
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, email, name, picture } = decodedToken;
    let user = await User.findOne({ firebaseUID: uid });
    if (user) {
      const authToken = jwt.sign(
        {
          userId: user._id,
          email: user.email,
          role: user.role,
          fullName: user.fullName,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.EXPIRES_IN,
        }
      );
      return res.json({
        success: true,
        authToken: authToken,
        data: user,
        message: "Login SuccessFully.. ",
      });
    }

    user = new User({
      firebaseUID: uid,
      email,
      fullName: name || "anonymous",
      avatar: picture || "",
    });
    await user.save();
    const notification = new Notification({
      userId: user._id,
      message:
        "Hi welcome to our platform! We're thrilled to have you with us. 😊",
      type: "New User",
    });
    await notification.save();
    const Admin = await User.find({
      role: { $in: ["ADMIN"] },
    });
    const notifications = {
      userId: Admin._id,
      message: `A new account has been created with the phoneNumber: ${user._id}. Please review the details.`,
      type: "New Account",
    };
    await notification.save();
    const path = process.env.FRONTEND_URL;
    const orderConfirmationUrl = `${path}/`;
    const subject = "Welcome to portfolio";

    const message = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2 style="color: #4CAF50;">Welcome to Portfolio!</h2>
    
      <p>Congratulations on creating your account with us! We're excited to have you on board.</p>
      <p>Here are your account details:</p>
      <ul>
        <li><strong>User ID:</strong> ${user._id}</li>
        <li><strong>Email:</strong> ${user.email}</li>
      </ul>
      <p>You can manage your account or explore our offerings by clicking the link below:</p>
      <p><a href="${orderConfirmationUrl}" style="color: #ffffff; background-color: #4CAF50; padding: 10px 20px; text-decoration: none; border-radius: 5px;" target="_blank">Go to Home</a></p>
      <p>If the button above doesn't work, copy and paste this link into your browser:</p>
      <p>${orderConfirmationUrl}</p>
      <p>If you have any questions or need assistance, feel free to contact us at 
      <a href="mailto:${process.env.EMAIL}">${process.env.EMAIL}</a>.
      </p>
      <p>Thank you for joining!</p>
      <p>Best regards,</p>
      <p><strong>Pawan Kumar</strong></p>
    </div>
    `;
    await sendEmail(user.email, subject, message);
    const authToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
        fullName: user.fullName,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.EXPIRES_IN,
      }
    );
    res.json({
      success: true,
      authToken: authToken,
      data: user,
      message: "Registering SuccessFully..",
    });
  } catch (error) {
    return next(new AppError(error.message, 401));
  }
};

export const Login = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      return next(new AppError("token is required to login user", 400));
    }
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid } = decodedToken;
    const user = await User.findOne({ firebaseUID: uid });
    if (!user) {
      return next(new AppError("User not found", 404));
    }
    const authToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
        fullName: user.fullName,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.EXPIRES_IN,
      }
    );
    return res.json({
      success: true,
      authToken: authToken,
      data: user,
      message: "Login successful",
    });
  } catch (error) {
    return next(new AppError(error.message, 401));
  }
};
export const logout = async (req, res, next) => {
  try {
    res.json({ success: true, message: "Logout SuccessFully.." });
  } catch (error) {
    return next(new AppError(error.message, 401));
  }
};

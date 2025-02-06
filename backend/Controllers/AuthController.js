import admin from "../Config/AdminFirebase.js";
import User from "../Modules/UserModule.js";
import AppError from "../Utils/AppErrors.js";
import jwt from "jsonwebtoken";
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

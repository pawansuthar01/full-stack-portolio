import { config } from "dotenv";
config();
import AppError from "../Utils/AppErrors.js";
import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.header("token");

    if (!token) {
      return next(new AppError("token is required to authentication", 400));
    }
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decodedToken.userId,
      email: decodedToken.email,
      role: decodedToken.role,
      exp: decodedToken.exp,
    };
  } catch (error) {
    return next(new AppError(error.message, 401));
  }
  next();
};

export const authorizeRoles =
  (...roles) =>
  async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("you have not permission for this work", 400));
    }
    next();
  };

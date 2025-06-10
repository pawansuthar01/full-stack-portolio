import { config } from "dotenv";
config();
import AppError from "../Utils/AppErrors.js";
import jwt from "jsonwebtoken";

export const isAdmin = async (req, res, next) => {
  try {
    const { pass } = req.query;

    if (!pass) {
      return next(new AppError("password is required to authentication", 401));
    }
  } catch (error) {
    return next(new AppError(error.message, 401));
  }
  next();
};

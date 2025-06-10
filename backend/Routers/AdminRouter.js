import { Router } from "express";
import {
  AdminCheck,
  changePassword,
  checkPasswordResetToken,
  sendOtp,
  updatePassword,
  verifyOtp,
} from "../Controllers/AdminController.js";
import { AllSubscribers } from "../Controllers/SubscribeController.js";

const Admin = Router();
Admin.post("/login", AdminCheck);
Admin.post("/auth/verify-otp", verifyOtp);
Admin.post("/auth/resend-otp", sendOtp);
Admin.get("/checkPasswordReset/:resetToken", checkPasswordResetToken);
Admin.put("/change/Password/:resetToken", changePassword);
Admin.put("/update/password", updatePassword);
Admin.get("/subscribe", AllSubscribers);

export default Admin;

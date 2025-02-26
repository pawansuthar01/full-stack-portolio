import { Router } from "express";
import {
  AdminCheck,
  changePassword,
  checkPasswordResetToken,
  updatePassword,
} from "../Controllers/AdminController.js";
import { AllSubscribers } from "../Controllers/SubscribeController.js";

const Admin = Router();
Admin.get("/Login/:email/:password", AdminCheck);
Admin.get("/checkPasswordReset/:resetToken", checkPasswordResetToken);
Admin.put("/change/Password/:resetToken", changePassword);
Admin.put("/update/password", updatePassword);
Admin.get("/subscribe", AllSubscribers);

export default Admin;

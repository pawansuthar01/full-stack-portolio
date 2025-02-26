import { Router } from "express";
import {
  AdminCheck,
  changePassword,
  checkPasswordResetToken,
  updatePassword,
} from "../Controllers/AdminController.js";

const Admin = Router();
Admin.get("/Login/:email/:password", AdminCheck);
Admin.get("/checkPasswordReset/:resetToken", checkPasswordResetToken);
Admin.put("/change/Password/:resetToken", changePassword);
Admin.put("/update/password", updatePassword);

export default Admin;

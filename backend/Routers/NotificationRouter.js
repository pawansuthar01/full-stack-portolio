import { Router } from "express";
import { authorizeRoles, isLoggedIn } from "../Middlewares/authMiddlware.js";
import {
  sendEmailToUser,
  sendNotification,
} from "../Controllers/NotificationController.js";

const NotificationRouter = Router();
NotificationRouter.post(
  "/Notification",
  isLoggedIn,
  authorizeRoles("ADMIN"),
  sendNotification
);
NotificationRouter.post(
  "/Email",
  isLoggedIn,
  authorizeRoles("ADMIN"),
  sendEmailToUser
);
export default NotificationRouter;

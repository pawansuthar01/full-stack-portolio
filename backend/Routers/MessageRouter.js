import { Router } from "express";
import {
  getAllMessage,
  markToReadMessage,
  submitMessage,
} from "../Controllers/MessageController.js";
import { authorizeRoles, isLoggedIn } from "../Middlewares/authMiddlware.js";
const MessageRouter = Router();
MessageRouter.route("/message")
  .post(isLoggedIn, authorizeRoles("ADMIN"), submitMessage)
  .get(getAllMessage);
MessageRouter.route("/message:id").put(
  isLoggedIn,
  authorizeRoles("ADMIN"),
  markToReadMessage
);
export default MessageRouter;

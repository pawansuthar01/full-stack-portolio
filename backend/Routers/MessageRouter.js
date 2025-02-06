import { Router } from "express";
import {
  getAllMessage,
  markToReadMessage,
  submitMessage,
} from "../Controllers/MessageController.js";
import { isLoggedIn } from "../Middlewares/authMiddlware.js";
const MessageRouter = Router();
MessageRouter.route("/message").post(submitMessage).get(getAllMessage);
MessageRouter.route("/message:id").put(isLoggedIn, markToReadMessage);
export default MessageRouter;

import { Router } from "express";
import {
  getAllMessage,
  markToReadMessage,
  submitMessage,
} from "../Controllers/MessageController.js";
const MessageRouter = Router();
MessageRouter.route("/").post(submitMessage).get(getAllMessage);
MessageRouter.route("/:id").put(markToReadMessage);
export default MessageRouter;

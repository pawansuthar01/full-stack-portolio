import { Router } from "express";
import {
  addFeedback,
  deleteFeedbackById,
  getAllFeedback,
  updateFeedback,
} from "../Controllers/FeedbackController.js";

const feedbackRouter = Router();
feedbackRouter.route("/").post(addFeedback).get(getAllFeedback);
feedbackRouter.route("/:id").put(updateFeedback).delete(deleteFeedbackById);
export default feedbackRouter;

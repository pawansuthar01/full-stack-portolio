import { Router } from "express";
import { isLoggedIn } from "../Middlewares/authMiddlware.js";
import {
  addFeedback,
  deleteFeedbackById,
  getAllFeedback,
  updateFeedback,
} from "../Controllers/FeedbackController.js";

const feedbackRouter = Router();
feedbackRouter
  .route("/feedback")
  .post(isLoggedIn, addFeedback)
  .get(getAllFeedback);
feedbackRouter
  .route("/feedback:id")
  .put(isLoggedIn, updateFeedback)
  .delete(isLoggedIn, deleteFeedbackById);
export default feedbackRouter;

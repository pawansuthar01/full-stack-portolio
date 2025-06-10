import { Router } from "express";
import {
  addFeedback,
  deleteFeedbackById,
  getAllFeedback,
} from "../Controllers/FeedbackController.js";
import { Upload } from "../Middlewares/multerMiddleware.js";

const feedbackRouter = Router();
feedbackRouter
  .route("/")
  .post(Upload.single("avatar"), addFeedback)
  .get(getAllFeedback);
feedbackRouter.route("/:id").delete(deleteFeedbackById);
export default feedbackRouter;

import { Router } from "express";
import { isLoggedIn } from "../Middlewares/authMiddlware.js";
import { Upload } from "../Middlewares/multerMiddleware.js";
import {
  AddFavorite,
  AllGetProject,
  DeleteFeedbackById,
  getAllFeedback,
  GetProjectById,
  LikeProjectById,
  NewProjectAdd,
  ProjectDeleteById,
  projectFeedback,
  removeToFavoriteList,
  updateProjectById,
  updateProjectFeedback,
} from "../Controllers/ProjectController.js";
const ProjectRouter = Router();
ProjectRouter.route("/project:id")
  .get(GetProjectById)
  .put(isLoggedIn, Upload.single("image"), updateProjectById)
  .delete(isLoggedIn, ProjectDeleteById);

ProjectRouter.route("/project/Feedback:id").put(isLoggedIn, projectFeedback);

ProjectRouter.route("/project:projectId/feedback:feedbackId")
  .put(isLoggedIn, updateProjectFeedback)
  .delete(isLoggedIn, DeleteFeedbackById);
ProjectRouter.route("/project/like:id").put(isLoggedIn, LikeProjectById);
ProjectRouter.route("/project/add/favorite:id").put(isLoggedIn, AddFavorite);
ProjectRouter.route("/project/remove/favorite:id").put(
  isLoggedIn,
  removeToFavoriteList
);

ProjectRouter.route("/project")
  .post(isLoggedIn, Upload.single("image"), NewProjectAdd)
  .get(AllGetProject);
ProjectRouter.route("/feedback").get(getAllFeedback);

export default ProjectRouter;

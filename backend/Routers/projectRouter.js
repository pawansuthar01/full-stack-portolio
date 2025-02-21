import { Router } from "express";
import { Upload } from "../Middlewares/multerMiddleware.js";
import {
  AllGetProject,
  DeleteFeedbackById,
  getAllFeedback,
  GetProjectById,
  NewProjectAdd,
  ProjectDeleteById,
  projectFeedback,
  updateProjectById,
  updateProjectFeedback,
} from "../Controllers/ProjectController.js";
const ProjectRouter = Router();
ProjectRouter.route("/project:id")
  .get(GetProjectById)
  .put(updateProjectById)
  .delete(ProjectDeleteById);

ProjectRouter.route("/project/Feedback:id").put(projectFeedback);

ProjectRouter.route("/project:projectId/feedback:feedbackId")
  .put(updateProjectFeedback)
  .delete(DeleteFeedbackById);

ProjectRouter.route("/project")
  .post(Upload.single("image"), NewProjectAdd)
  .get(AllGetProject);
ProjectRouter.route("/feedback").get(getAllFeedback);

export default ProjectRouter;

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
ProjectRouter.route("/:id")
  .get(GetProjectById)
  .put(Upload.single("image"), updateProjectById)
  .delete(ProjectDeleteById);

ProjectRouter.route("/project/Feedback:id").put(projectFeedback);

ProjectRouter.route("/project:projectId/feedback:feedbackId")
  .put(updateProjectFeedback)
  .delete(DeleteFeedbackById);

ProjectRouter.route("/")
  .post(Upload.single("image"), NewProjectAdd)
  .get(AllGetProject);
ProjectRouter.route("/feedback").get(getAllFeedback);

export default ProjectRouter;

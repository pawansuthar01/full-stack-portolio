import { Router } from "express";
import { isLoggedIn } from "../Middlewares/authMiddlware.js";
import { Upload } from "../Middlewares/multerMiddleware.js";
import {
  AllGetProject,
  GetProjectById,
  NewProjectAdd,
  ProjectDeleteById,
  updateProjectById,
} from "../Controllers/ProjectController.js";
const ProjectRouter = Router();
ProjectRouter.route("/project:id")
  .get(GetProjectById)
  .put(isLoggedIn, Upload.single("image"), updateProjectById)
  .delete(isLoggedIn, ProjectDeleteById);
ProjectRouter.route("/project")
  .post(isLoggedIn, Upload.single("image"), NewProjectAdd)
  .get(AllGetProject);

export default ProjectRouter;

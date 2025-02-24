import { Router } from "express";
import { Upload } from "../Middlewares/multerMiddleware.js";
import {
  CreateNewSkillsCart,
  newSkillAddToCart,
} from "../Controllers/SkillsController.js";
const SkillRouter = Router();
SkillRouter.route("/").post(CreateNewSkillsCart).put(newSkillAddToCart);
export default SkillRouter;

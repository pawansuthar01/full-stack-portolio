import { Router } from "express";
import { Upload } from "../Middlewares/multerMiddleware.js";
import {
  CreateNewSkillsCart,
  newSkillAddToCart,
} from "../Controllers/SkillsController.js";
const SkillRouter = Router();
SkillRouter.post(
  "/create/cart/skills",

  Upload.single("image"),
  CreateNewSkillsCart
);
SkillRouter.put(
  "/add/cart/skill:id",

  Upload.single("image"),
  newSkillAddToCart
);
export default SkillRouter;

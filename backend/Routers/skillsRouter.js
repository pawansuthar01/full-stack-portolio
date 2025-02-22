import { Router } from "express";
import { Upload } from "../Middlewares/multerMiddleware.js";
import {
  CreateNewSkillsCart,
  newSkillAddToCart,
} from "../Controllers/SkillsController.js";
const SkillRouter = Router();
SkillRouter.post(
  "/create/cart/skills",

  CreateNewSkillsCart
);
SkillRouter.put(
  "/add/cart/skill:id",

  newSkillAddToCart
);
export default SkillRouter;

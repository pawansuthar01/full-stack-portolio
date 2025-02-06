import { Router } from "express";
import { isLoggedIn } from "../Middlewares/authMiddlware.js";
import { Upload } from "../Middlewares/multerMiddleware.js";
import {
  CreateNewSkillsCart,
  newSkillAddToCart,
} from "../Controllers/SkillsController.js";
const SkillRouter = Router();
SkillRouter.post(
  "/create/cart/skills",
  isLoggedIn,
  Upload.single("image"),
  CreateNewSkillsCart
);
SkillRouter.put(
  "/add/cart/skill:id",
  isLoggedIn,
  Upload.single("image"),
  newSkillAddToCart
);
export default SkillRouter;

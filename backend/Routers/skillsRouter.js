import { Router } from "express";
import { Upload } from "../Middlewares/multerMiddleware.js";
import {
  CreateNewSkillsCart,
  DeleteSkillCart,
  DeleteSkillInCart,
  newSkillAddToCart,
  newSkillUpdateToCart,
  updateSkillCartTitle,
} from "../Controllers/SkillsController.js";
const SkillRouter = Router();
SkillRouter.route("/").post(CreateNewSkillsCart);
SkillRouter.put("/updateTitle/:id", updateSkillCartTitle);
SkillRouter.route("/:id").delete(DeleteSkillCart).put(newSkillAddToCart);
SkillRouter.route("/:cartId/:skillId")
  .delete(DeleteSkillInCart)
  .put(newSkillUpdateToCart);
export default SkillRouter;

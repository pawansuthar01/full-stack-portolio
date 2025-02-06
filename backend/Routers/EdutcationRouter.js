import { Router } from "express";
import { isLoggedIn } from "../Middlewares/authMiddlware.js";
import { Upload } from "../Middlewares/multerMiddleware.js";
import {
  AddEductionCart,
  AllEductionCart,
  DeleteEducationCartById,
  updatedEductionCartById,
} from "../Controllers/EducationController.js";
const EducationRouter = Router();
EducationRouter.route("/education")
  .post(isLoggedIn, Upload.single("image"), AddEductionCart)
  .get(AllEductionCart);
EducationRouter.route("/education:id")
  .put(isLoggedIn, Upload.single("image"), updatedEductionCartById)
  .delete(isLoggedIn, DeleteEducationCartById);

export default EducationRouter;

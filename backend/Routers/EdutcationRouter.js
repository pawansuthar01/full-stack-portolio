import { Router } from "express";
import { Upload } from "../Middlewares/multerMiddleware.js";
import {
  AddEductionCart,
  AllEductionCart,
  DeleteEducationCartById,
  updatedEductionCartById,
} from "../Controllers/EducationController.js";
const EducationRouter = Router();
EducationRouter.route("/education")
  .post(Upload.single("image"), AddEductionCart)
  .get(AllEductionCart);
EducationRouter.route("/education:id")
  .put(Upload.single("image"), updatedEductionCartById)
  .delete(DeleteEducationCartById);

export default EducationRouter;

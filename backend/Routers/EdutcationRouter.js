import { Router } from "express";
import { Upload } from "../Middlewares/multerMiddleware.js";
import {
  AddEductionCart,
  AllEductionCart,
  DeleteEducationCartById,
  updatedEductionCartById,
} from "../Controllers/EducationController.js";
const EducationRouter = Router();
EducationRouter.route("/education").post(AddEductionCart).get(AllEductionCart);
EducationRouter.route("/education:id")
  .put(updatedEductionCartById)
  .delete(DeleteEducationCartById);

export default EducationRouter;

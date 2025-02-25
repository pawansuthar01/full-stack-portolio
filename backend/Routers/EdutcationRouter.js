import { Router } from "express";
import { Upload } from "../Middlewares/multerMiddleware.js";
import {
  AddEductionCart,
  AllEductionCart,
  DeleteEducationCartById,
  updatedEductionCartById,
} from "../Controllers/EducationController.js";
const EducationRouter = Router();
EducationRouter.route("/").post(AddEductionCart).get(AllEductionCart);
EducationRouter.route("/:id")
  .put(updatedEductionCartById)
  .delete(DeleteEducationCartById);

export default EducationRouter;

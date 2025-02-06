import { Router } from "express";
import { authorizeRoles, isLoggedIn } from "../Middlewares/authMiddlware.js";
import { Upload } from "../Middlewares/multerMiddleware.js";
import {
  AddEductionCart,
  AllEductionCart,
  DeleteEducationCartById,
  updatedEductionCartById,
} from "../Controllers/EducationController.js";
const EducationRouter = Router();
EducationRouter.route("/education")
  .post(
    isLoggedIn,
    authorizeRoles("ADMIN"),
    Upload.single("image"),
    AddEductionCart
  )
  .get(AllEductionCart);
EducationRouter.route("/education:id")
  .put(
    isLoggedIn,
    authorizeRoles("ADMIN"),
    Upload.single("image"),
    updatedEductionCartById
  )
  .delete(isLoggedIn, authorizeRoles("ADMIN"), DeleteEducationCartById);

export default EducationRouter;

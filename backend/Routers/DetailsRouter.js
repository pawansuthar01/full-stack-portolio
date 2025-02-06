import { Router } from "express";
import {
  getDetails,
  SubmitDetails,
  updateDetail,
} from "../Controllers/DetailsController.js";
import { authorizeRoles, isLoggedIn } from "../Middlewares/authMiddlware.js";
const DetailsRouter = Router();
DetailsRouter.route("/details")
  .post(isLoggedIn, authorizeRoles("ADMIN"), SubmitDetails)
  .put(isLoggedIn, authorizeRoles("ADMIN"), updateDetail)
  .get(getDetails);
export default DetailsRouter;

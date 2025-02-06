import { Router } from "express";
import {
  getDetails,
  SubmitDetails,
  updateDetail,
} from "../Controllers/DetailsController.js";
import { authorizeRoles, isLoggedIn } from "../Middlewares/authMiddlware.js";
const DetailsRouter = Router();
DetailsRouter.route("/details")
  .post(SubmitDetails, isLoggedIn, authorizeRoles("ADMIN"))
  .put(updateDetail, isLoggedIn, authorizeRoles("ADMIN"))
  .get(getDetails);
export default DetailsRouter;

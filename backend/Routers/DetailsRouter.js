import { Router } from "express";
import {
  getDetails,
  SubmitDetails,
  updateDetail,
} from "../Controllers/DetailsController.js";
const DetailsRouter = Router();
DetailsRouter.route("/details")
  .post(SubmitDetails)
  .put(updateDetail)
  .get(getDetails);
export default DetailsRouter;

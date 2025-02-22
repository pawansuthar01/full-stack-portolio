import { Router } from "express";
import {
  SubmitSociolLink,
  updateSociolLink,
} from "../Controllers/SociolController.js";
const SociolRouter = Router();
SociolRouter.route("/details").post(SubmitSociolLink).put(updateSociolLink);

export default SociolRouter;

import { Router } from "express";
import { AllDataGet } from "../Controllers/AllDataController.js";

const UserRouter = Router();
UserRouter.route("/").get(AllDataGet);
export default UserRouter;

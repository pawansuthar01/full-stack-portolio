import { Router } from "express";
import { AllDataGet } from "../Controllers/AllDataController.js";
import { SubscribeUser } from "../Controllers/SubscribeController.js";

const UserRouter = Router();
UserRouter.route("/").get(AllDataGet);
UserRouter.route("/subscribe/:email").post(SubscribeUser);
export default UserRouter;

import express from "express";
import { Upload } from "../Middlewares/multerMiddleware.js";
import {
  MainDetailsCreate,
  UpdatedMainSectionData,
} from "../Controllers/mainController.js";

const MainSectionRouter = express.Router();

MainSectionRouter.post(
  "/create",

  Upload.single("photo"),
  MainDetailsCreate
);
MainSectionRouter.put(
  "/updated",

  Upload.single("photo"),
  UpdatedMainSectionData
);
export default MainSectionRouter;

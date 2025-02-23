import express from "express";
import { Upload } from "../Middlewares/multerMiddleware.js";
import {
  MainDetailsCreate,
  UpdatedMainSectionData,
} from "../Controllers/mainController.js";

const MainSectionRouter = express.Router();

MainSectionRouter.route("/")
  .post(Upload.single("photo"), MainDetailsCreate)
  .put(Upload.single("photo"), UpdatedMainSectionData);
export default MainSectionRouter;

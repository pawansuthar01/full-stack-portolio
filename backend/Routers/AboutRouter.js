import express from "express";
import { Upload } from "../Middlewares/multerMiddleware.js";

import {
  AboutSectionCreate,
  AboutSectionUpdate,
} from "../Controllers/About.controller.js";

const AboutRouter = express.Router();

AboutRouter.route("/")
  .post(Upload.single("photo"), AboutSectionCreate)
  .put(Upload.single("photo"), AboutSectionUpdate);
export default AboutRouter;

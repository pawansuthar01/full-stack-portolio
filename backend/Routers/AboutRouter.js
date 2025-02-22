import express from "express";
import { Upload } from "../Middlewares/multerMiddleware.js";

import {
  AboutSectionCreate,
  AboutSectionUpdate,
} from "../Controllers/About.controller.js";

const AboutRouter = express.Router();

AboutRouter.post(
  "/create",

  Upload.single("photo"),
  AboutSectionCreate
);
AboutRouter.put(
  "/updated",

  Upload.single("photo"),
  AboutSectionUpdate
);
export default AboutRouter;

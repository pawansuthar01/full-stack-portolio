import express from "express";
import { Upload } from "../Middlewares/multerMiddleware.js";

import {
  AboutSectionCreate,
  AboutSectionUpdate,
  addFunFact,
  addJourneyItem,
} from "../Controllers/About.controller.js";

const AboutRouter = express.Router();

AboutRouter.route("/")
  .post(
    Upload.fields([
      { name: "BannerAboutImage", maxCount: 1 },
      { name: "AboutPageImage", maxCount: 1 },
    ]),
    AboutSectionCreate
  )
  .put(
    Upload.fields([
      { name: "BannerAboutImage", maxCount: 1 },
      { name: "AboutPageImage", maxCount: 1 },
    ]),
    AboutSectionUpdate
  );
AboutRouter.post("/journey", addJourneyItem);
AboutRouter.post("/funfact", addFunFact);
export default AboutRouter;

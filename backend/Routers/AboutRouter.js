import express from "express";
import { Upload } from "../Middlewares/multerMiddleware.js";

import {
  AboutSectionCreate,
  AboutSectionUpdate,
  addFunFact,
  addJourneyItem,
  deleteFunFact,
  deleteJourneyItem,
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
AboutRouter.delete("/journey/:id", deleteJourneyItem);
AboutRouter.post("/funfact", addFunFact);
AboutRouter.delete("/funfact/:id", deleteFunFact);
export default AboutRouter;

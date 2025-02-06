import express from "express";
import { authorizeRoles, isLoggedIn } from "../Middlewares/authMiddlware.js";
import { Upload } from "../Middlewares/multerMiddleware.js";
import {
  MainDetailsCreate,
  UpdatedMainSectionData,
} from "../Controllers/mainController.js";

const MainSectionRouter = express.Router();

MainSectionRouter.post(
  "/create",
  isLoggedIn,
  //   authorizeRoles("ADMIN"),
  Upload.single("photo"),
  MainDetailsCreate
);
MainSectionRouter.put(
  "/updated",
  isLoggedIn,
  //   authorizeRoles("ADMIN"),
  Upload.single("photo"),
  UpdatedMainSectionData
);
export default MainSectionRouter;

import AuthRouter from "./Routers/AuthRouter.js";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { connectDB } from "./Config/DBConfig.js";
import ErrorMiddleware from "./Middlewares/ErrorMiddleware.js";
import MainSectionRouter from "./Routers/MainSectionDataRouter.js";
import SkillRouter from "./Routers/skillsRouter.js";
import ProjectRouter from "./Routers/projectRoter.js";
import EducationRouter from "./Routers/EdutcationRouter.js";
const app = express();
//Db connection Call//
connectDB();
//middleware setup//
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

/// routed handel///

app.use("/app/auth", AuthRouter);
app.use("/app/admin/v3/mainSection", MainSectionRouter);
app.use("/app/admin/v3/skillCart", SkillRouter);
app.use("/app/admin/v3/projectCart", ProjectRouter);
app.use("/app/admin/v3/Education", EducationRouter);

//handel 404 not found page //
app.use("*", (req, res, next) => {
  res.status(404).send("oops ! Page Not Found ");
});
app.use(ErrorMiddleware);
export default app;

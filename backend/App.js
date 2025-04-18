import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import ErrorMiddleware from "./Middlewares/ErrorMiddleware.js";
import MainSectionRouter from "./Routers/MainSectionDataRouter.js";
import SkillRouter from "./Routers/skillsRouter.js";
import ProjectRouter from "./Routers/projectRouter.js";
import EducationRouter from "./Routers/EdutcationRouter.js";
import MessageRouter from "./Routers/MessageRouter.js";
import feedbackRouter from "./Routers/FeedbackRouter.js";
import { connectDB } from "./Config/DbConfig.js";
import UserRouter from "./Routers/UserRouter.js";
import SociolRouter from "./Routers/SociolRouter.js";
import AboutRouter from "./Routers/AboutRouter.js";
import Admin from "./Routers/AdminRouter.js";
import axios from "axios";
const app = express();
//Db connection Call//
connectDB();
//middleware setup//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With, Set-Cookie"
  );
  next();
});
// handel server ping to 30s to up//
setInterval(async () => {
  try {
    await axios.get(`${process.env.Backend_URL}/ping`);
  } catch (error) {
    console.error("Error pinging server:", error.message);
  }
}, 15000);

/// routed handel///

app.get("/ping", async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Pong..",
  });
});
app.use("/app/admin/v3/mainSection", MainSectionRouter);
app.use("/app/admin/v3/", Admin);
app.use("/app/admin/v3/About", AboutRouter);
app.use("/app/user/v3/Data", UserRouter);
app.use("/app/admin/v3/skill", SkillRouter);
app.use("/app/admin/v3/project", ProjectRouter);
app.use("/app/admin/v3/education", EducationRouter);
app.use("/app/user/v3/Message", MessageRouter);
app.use("/app/admin/v3/social", SociolRouter);
app.use("/app/user/v3/Feedback", feedbackRouter);

//handel 404 not found page //
app.use("*", (req, res, next) => {
  res.status(404).send("oops ! Page Not Found ");
});
app.use(ErrorMiddleware);

export default app;

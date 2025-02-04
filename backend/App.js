import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
const app = express();
//middleware setup//
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

/// routed handel///

//handel 404 not found page //
app.use("*", (req, res) => {
  res.status(404).send("oops ! Page Not Found ");
});
export default app;

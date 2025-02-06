import { Router } from "express";
import { Login, logout, RegisterUser } from "../Controllers/AuthController.js";
const AuthRouter = Router();
AuthRouter.post("/register", RegisterUser);
AuthRouter.post("/login", Login);
AuthRouter.post("/logout", logout);
export default AuthRouter;

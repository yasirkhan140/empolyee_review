import express from "express";
const userRoutes = express.Router();
import {
  createUser,
  home,
  login,
  loginUser,
  logoutUser,
  signup,
} from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
userRoutes.get("/", verifyJWT, home);
userRoutes.get("/login", login);
userRoutes.post("/login", loginUser);
userRoutes.get("/signup", signup);
userRoutes.post("/signup", createUser);
userRoutes.get("/logout", verifyJWT, logoutUser);
export default userRoutes;

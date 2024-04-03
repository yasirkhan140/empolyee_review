import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
export const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;
    // console.log(token);
    if (!token) {
      return res.redirect("/login");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      return res.redirect("/login");
    }
    req.user = user;
    next();
  } catch (error) {
    return res.redirect("/login");
  }
};

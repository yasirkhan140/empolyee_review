import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
const app = express();
dotenv.configDotenv({ path: "./.env" });
// url encoded
app.use(
  express.urlencoded({
    extended: true,
  })
);
// static assets js and css
app.use(express.static("public"));
// cookie parse to access the cookie
app.use(cookieParser());

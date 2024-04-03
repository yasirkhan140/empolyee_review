import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import expressEjsLayouts from "express-ejs-layouts";
import connectDB from "./db/index.js";
import userRoutes from "./routes/user.routes.js";
import flash from "req-flash";
import session from "express-session";
import adminRoutes from "./routes/admin.routes.js";
import { verifyJWT } from "./middleware/auth.middleware.js";
import reviewRouter from "./routes/review.routes.js";
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
// meassge3
app.use(session({ secret: "123" }));
app.use(flash());
// app use express-ejs-layout
app.use(expressEjsLayouts);
// extract all css and javascript to layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
// set view engine
app.set("view engine", "ejs");
// set a view
app.set("views", "./src/views");
// routes
app.use("/", userRoutes);
app.use("/admin", verifyJWT, adminRoutes);
app.use("/review", verifyJWT, reviewRouter);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000),
      () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}}`);
      };
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });

import express from "express";
import {
  addEmployee,
  myReviews,
  removeEmployee,
  updateEmployee,
  updateUserAdmin,
  viewAndUpdateEmployee,
} from "../controller/admin.contoller.js";
import { verifyAdmin } from "../middleware/admin.middleware.js";
const adminRoutes = express.Router();

adminRoutes.get("/user-update", verifyAdmin, updateUserAdmin);
adminRoutes.post("/add-employee", verifyAdmin, addEmployee);
adminRoutes.get("/remove-employee", verifyAdmin, removeEmployee);
adminRoutes.post("/update-employee", verifyAdmin, updateEmployee);
adminRoutes.get("/update-employee", verifyAdmin, viewAndUpdateEmployee);
adminRoutes.get("/get-myreviews", verifyAdmin, myReviews);
export default adminRoutes;

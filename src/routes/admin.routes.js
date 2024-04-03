import express from "express";
import {
  addEmployee,
  removeEmployee,
  updateEmployee,
  updateUserAdmin,
  viewAndUpdateEmployee,
} from "../controller/admin.contoller.js";
const adminRoutes = express.Router();

adminRoutes.get("/user-update", updateUserAdmin);
adminRoutes.post("/add-employee", addEmployee);
adminRoutes.get("/remove-employee", removeEmployee);
adminRoutes.post("/update-employee", updateEmployee);
adminRoutes.get("/update-employee", viewAndUpdateEmployee);
export default adminRoutes;

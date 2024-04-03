import express from "express";
import {
  createReview,
  createReviewView,
} from "../controller/review.controller.js";

const reviewRouter = express.Router();
reviewRouter.get("/assign-review", createReviewView);
reviewRouter.post("/assign-review", createReview);
export default reviewRouter;

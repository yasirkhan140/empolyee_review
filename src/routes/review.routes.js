import express from "express";
import {
  createReview,
  createReviewView,
  giveAReview,
  giveAReviewView,
} from "../controller/review.controller.js";

const reviewRouter = express.Router();
reviewRouter.get("/assign-review", createReviewView);
reviewRouter.post("/assign-review", createReview);
reviewRouter.get("/give-review", giveAReviewView);
reviewRouter.post("/give-review", giveAReview);
export default reviewRouter;

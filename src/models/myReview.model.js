import mongoose, { Schema } from "mongoose";
const myReviewSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rating: {
      type: Number,
      default: 100,
    },
  },
  {
    timestamps: true,
  }
);

export const MyReview = mongoose.model("MyReview", myReviewSchema);

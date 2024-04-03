import mongooge, { Schema } from "mongoose";

const assignReviewSchema = new Schema(
  {
    fromUser: {
      type: mongooge.Schema.Types.ObjectId,
      ref: "User",
    },
    toUser: {
      type: mongooge.Schema.Types.ObjectId,
      rerf: "User",
    },
  },
  {
    timestamps: true,
  }
);
export const AssignReview = mongooge.model("AssignReview", assignReviewSchema);

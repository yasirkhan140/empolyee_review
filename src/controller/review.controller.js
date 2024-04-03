import { AssignReview } from "../models/assignReview.model.js";
import { User } from "../models/user.model.js";

export const createReviewView = async (req, res) => {
  let users = await User.find({}).select("-password -refreshToken");
  return res.render("assignWork", {
    title: "assign work",
    user: req.user,
    message: req.flash(),
    users: users,
  });
};
export const createReview = async (req, res) => {
  // let review  =await
  const { recipient, reviewer } = req.body;
  let review = await AssignReview.findOne({
    fromUser: reviewer,
    toUser: recipient,
  });
  if (review) {
    req.flash("errorMessage", "Already Assigned for same recipent");
  }
  review = await AssignReview.create({
    fromUser: reviewer,
    toUser: recipient,
  });
  let user = await User.findById(reviewer);
  user.assignedReviews.push(review);
  user.save();

  req.flash("errorMessage", "Review Assigned Successfully");
  return res.redirect("back");
};

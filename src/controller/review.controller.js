import { AssignReview } from "../models/assignReview.model.js";
import { MyReview } from "../models/myReview.model.js";
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
  if (reviewer === recipient) {
    req.flash("errorMessage", "Same user to user cannot assign");
    return res.redirect("back");
  }
  if (review) {
    req.flash("errorMessage", "Already Assigned for same recipent");
    return res.redirect("back");
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

// give a review view
export const giveAReviewView = async (req, res) => {
  let user = await User.findById(req.user._id).populate({
    path: "assignedReviews",
    populate: {
      path: "toUser",
    },
  });
  let recipent = [];
  for (let i = 0; i < user.assignedReviews.length; i++) {
    let userName = await User.findById(user.assignedReviews[i].toUser);
    recipent.push(userName);
  }
  res.render("giveReview", {
    title: "give review",
    message: req.flash(),
    user,
    recipent,
  });
};
export const giveAReview = async (req, res) => {
  const { rating, review, toUser } = req.body;

  let assignedReview = await AssignReview.findOne({
    fromUser: req.user._id,
    toUser: toUser,
  });

  await User.findByIdAndUpdate(req.user._id, {
    $pull: { assignedReviews: assignedReview._id },
  });

  await AssignReview.findByIdAndDelete(assignedReview._id);
  // toUser
  let user = await User.findById(toUser);
  let reviewData = await MyReview.create({
    fromUser: req.user._id,
    toUser: toUser,
    message: review,
    rating: rating,
  });
  user.myReviews.push(reviewData);
  user.save();

  if (reviewData) {
    return res.redirect("back");
  }
};

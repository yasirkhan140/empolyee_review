import { MyReview } from "../models/myReview.model.js";
import { User } from "../models/user.model.js";

// update User to admin/user
export const updateUserAdmin = async (req, res) => {
  let id = req.query.id;
  const user = await User.findById(id);
  let filter;
  if (user.isAdmin) {
    filter = {
      isAdmin: false,
    };
  } else {
    filter = {
      isAdmin: true,
    };
  }
  await User.findByIdAndUpdate(id, { $set: filter }, { new: true });
  return res.redirect("back");
};

export const addEmployee = async (req, res) => {
  const { email, name, password } = req.body;
  if ([name, email, password].some((field) => field?.trim === "")) {
    req.flash("errorMessage", "all feild are required");
    return res.redirect("back");
  }
  const existedUser = await User.findOne({
    $or: [{ email }],
  });
  if (existedUser) {
    req.flash("errorMessage", "email already exists");
    return res.redirect("back");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    req.flash("errorMessage", "employee created successfully");
    return res.redirect("back");
  } else {
    req.flash("errorMessage", "some error");
    return res.redirect("back");
  }
};
// delete employee
export const removeEmployee = async (req, res) => {
  const id = req.query.id;
  const user = await User.findByIdAndDelete(id);
  return res.redirect("back");
};
// update employee view
export const viewAndUpdateEmployee = async (req, res) => {
  const id = req.query.id;
  const empolyee = await User.findById(id);
  if (empolyee) {
    return res.render("viewEmployeeUpdate", {
      title: `view ${empolyee.name}`,
      user: req.user,
      employee: empolyee,
      message: req.flash(),
    });
  }
};
// update employee post and save
export const updateEmployee = async (req, res) => {
  const { name, email, id } = req.body;
  console.log(id);
  const user = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        name,
        email,
      },
    },
    { new: true }
  ).select("-password -refreshToken");
  if ((user.email = email)) {
    req.flash("errorMessage", "successfully update employee");
  }
  return res.redirect("/");
};

// myy reviews
export const myReviews = async (req, res) => {
  let reviews = await MyReview.find({
    toUser: req.user._id,
  });
  for (let i = 0; i < reviews.length; i++) {
    let user = await User.findById(reviews[i].fromUser);
    reviews[i].userName = user.name;
  }
  return res.render("userHome", {
    title: "Emplolyee Review",
    message: req.flash(),
    user: req.user,
    reviews,
  });
};

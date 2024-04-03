import { MyReview } from "../models/myReview.model.js";
import { User } from "../models/user.model.js";
// admin home
export const home = async (req, res) => {
  if (!req.user.isAdmin) {
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
  }
  // find all user and remove password and refreshToken
  let users = await User.find({}).select("-password -refreshToken");
  return res.render("home", {
    title: "Emplolyee Review",
    message: req.flash(),
    users: users,
    user: req.user,
  });
};
// login controller
export const login = async (req, res) => {
  return res.render("login", {
    title: "Login page",
    message: req.flash(),
    user: false,
  });
};
// singup controller
export const signup = async (req, res) => {
  return res.render("signup", {
    title: "Register page",
    message: req.flash(),
    user: false,
  });
};
// createUser by singup
export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
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
    req.flash("successMessage", "user created successfully");
    return res.redirect("/login");
  } else {
    req.flash("errorMessage", "some error");
    return res.redirect("back");
  }
};
// genertae acces token and refresh  token
const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};
// login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  3;
  if (!email && !password) {
    req.flash("errorMessage", "email and password required");
    return res.redirect("/");
  }

  const user = await User.findOne({
    $or: [{ email }],
  });
  if (!user) {
    req.flash("errorMessage", "email and password required");
    return res.redirect("back");
  }
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    req.flash("errorMessage", "password is invalid ");
    return res.redirect("back");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );
  const option = {
    httpOnly: true,
    secure: true,
  };
  req.flash("errorMessage", "successfully login");
  return res
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .redirect("/");
};

// logout user
export const logoutUser = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .redirect("/login");
};

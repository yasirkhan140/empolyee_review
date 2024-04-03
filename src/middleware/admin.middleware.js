export const verifyAdmin = async (req, res, next) => {
  try {
    // console.log(token);
    if (req.user.isAdmin) {
      next();
    } else {
      return res.redirect("back");
    }
  } catch (error) {
    return res.redirect("back");
  }
};

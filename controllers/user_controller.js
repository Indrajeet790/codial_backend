const User = require("../models/user");
module.exports.profile = function (req, res) {
  return res.render("User_profile", {
    title: "User",
  });
};

// render the signup page
module.exports.signup = function (req, res) {
  return res.render("user_sign_up", {
    title: "Codeial |Sign up",
  });
};

// render the signIn page
module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "Codeial |Sign in",
  });
};
// get the sign up data
module.exports.create = async (req, res) => {
  try {
    if (req.body.password != req.body.confirm_password) {
      return res.redirect("back");
    }
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      const newUser = await User.create(req.body);
      return res.redirect("/users/sign-in");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
  }
};

// sign in and create a session
module.exports.createSession = async (req, res) => {
  try {
    // find the user
    const user = await User.findOne({ email: req.body.email });
    // if user found
    if (user) {
      // handle password which doesn't match
      if (user.password != req.body.password) {
        return res.redirect("back");
      } else {
        // handle session creation
        res.cookie("user_id", user.id);
        return res.redirect("/users/profile");
      }
    } else {
      // handle user not found
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
  }
};

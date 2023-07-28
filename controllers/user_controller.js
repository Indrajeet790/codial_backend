// ****************************Manual Authentication**************//
// const User = require("../models/user");
// module.exports.profile = async (req, res) => {
//   try {
//     // find user_id if user_id is found then send to the user profile
//     if (req.cookies.user_id) {
//       const user = await User.findById(req.cookies.user_id);
//       if (user) {
//         return res.render("User_profile", {
//           title: "User",
//           user: user,
//         });
//       }
//     } else {
//       // if not found user_id then back to the sign-n page
//       return res.redirect("users/sign-in");
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// // render the signup page
// module.exports.signup = function (req, res) {
//   return res.render("user_sign_up", {
//     title: "Codeial |Sign up",
//   });
// };

// // render the signIn page
// module.exports.signIn = function (req, res) {
//   return res.render("user_sign_in", {
//     title: "Codeial |Sign in",
//   });
// };
// // get the sign up data
// module.exports.create = async (req, res) => {
//   try {
//     // check user password is confirm or not
//     if (req.body.password != req.body.confirm_password) {
//       return res.redirect("back");
//     }
//     // find user by email
//     const user = await User.findOne({ email: req.body.email });
//     //  find user if user is not created then create a new user
//     if (!user) {
//       const newUser = await User.create(req.body);
//       return res.redirect("/users/sign-in");
//     } else {
//       return res.redirect("back");
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// // sign in and create a session
// module.exports.createSession = async (req, res) => {
//   try {
//     // find the user
//     const user = await User.findOne({ email: req.body.email });
//     // if user found
//     if (user) {
//       // handle password which doesn't match
//       if (user.password != req.body.password) {
//         return res.redirect("back");
//       } else {
//         // handle session creation
//         res.cookie("user_id", user.id);
//         return res.redirect("/users/profile");
//       }
//     } else {
//       // handle user not found
//       return res.redirect("back");
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };
// *************************************************************************//
const User = require("../models/user");

module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "User Profile",
  });
};

// render the sign up page
module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
};

// render the sign in page
module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "Codeial | Sign In",
  });
};

// get the sign up data
module.exports.create = async (req, res) => {
  try {
    // check user password is confirm or not
    if (req.body.password != req.body.confirm_password) {
      return res.redirect("back");
    }
    // find user by email
    const user = await User.findOne({ email: req.body.email });
    //  find user if user is not created then create a new user
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

/// sign in and create a session for the user
module.exports.createSession = function (req, res) {
  return res.redirect("/");
};

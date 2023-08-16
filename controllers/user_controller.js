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

module.exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send("User not found"); // Handle case where user is not found
    }

    return res.render("User_profile", {
      title: "User profile",
      profile_user: user,
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    return res.status(500).send("Internal Server Error"); // Handle other errors
  }
};

// update user profile 
module.exports.update = async function(req, res) {
  try {
    if(req.user.id === req.params.id) {
      await User.findByIdAndUpdate(req.params.id , req.body);
      return res.redirect("back")
    }else {
      return res.status(401).send("unauthorized");
    }
  } catch (error) {
    return res.status(500).send({error:error});
  }
}

// render the sign up page
module.exports.signUp = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
};

// render the sign in page
module.exports.signIn = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
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
module.exports.createSession = async (req, res) => {
  req.flash('success','logged in successfully')
  return res.redirect("/");
};

// sign-out the session
module.exports.destroySession = async (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  req.flash('success','you have logged out successfully')
    return res.redirect("/");
  });
};

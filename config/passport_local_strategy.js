const passport = require("passport");
const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;

// authentication using Passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback:true
    },
    async function (req,email, password, done) {
      try {
        // find a user and establish the identity
        const user = await User.findOne({ email: email });
        if (!user || user.password !== password) {
          req.flash('error','Invalid username/password')
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        req.flash('error',err);
        return done(err);
      }
    }
  )
);

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  if (!user) {
    console.log("Error in finding user --> Passport");
  }

  return done(null, user);
});

// check if the user authenticate
passport.checkAuthentication = (req, res, next) => {
  // if the user is signed in then pass the request to next function(controller's action)
  if (req.isAuthenticated()) {
    return next();
  }
  // if the user is not signed in
  return res.redirect("/users/sign-in");
};

// check user is signed in or not if user is signed in
passport.setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    // req.user contains the current signed from the session cookie and we are just sending this to the locals for the views
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;

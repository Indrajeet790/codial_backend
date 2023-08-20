const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt; // helps to extract token from header
const User = require("../models/user");

// // Options for the JWT strategy configuration
let opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "codeial",
};
// // Configure Passport to use the JWT strategy
passport.use(
  new JWTStrategy(opts, async function (JWTPayload, done) {
    try {
      // Find a user in the database based on the ID extracted from the JWT payload
      const user = await User.findById(JWTPayload._id);

      if (user) {
        // If a user is found, pass the user data to the next middleware
        return done(null, user);
      } else {
        // If no user is found, deny access by passing 'false' to the next middleware
        return done(null, false);
      }
    } catch (err) {
      console.log("Error in finding user from JWT:", err);
      return done(err, false);
    }
  })
);

module.exports = passport;

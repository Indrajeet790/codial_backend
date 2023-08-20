const passport=require("passport");
const JwtStrategy=require("passport-jwt").Strategy;
const ExtractJWT=require("passport-jwt").ExtractJwt;
const User=require("../models/user");

// Options for the JWT strategy configuration
let opts={
    // Extract JWT token from the authorization header
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken, 
    secretOrKey: 'codeial' // Secret key to decode the JWT token
}
// Configure Passport to use the JWT strategy
passport.use(new JwtStrategy(opts, function(jwt_payload, done){
      // Find a user in the database based on the ID extracted from the JWT payload
    User.findOne({id: jwt_payload._id}, function(err, user){
        if(err){
            console.log("error",err);
            return;
        }
        if(user){
              // If a user is found, pass the user data to the next middleware
            return done(null,user)
        }else{
              // If no user is found, deny access by passing 'false' to the next middleware
              return done(null, false);
        }

    })

}));
module.exports=passport;
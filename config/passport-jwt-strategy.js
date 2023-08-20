const passport=require("passport");
const JwtStrategy=require("passport-jwt").Strategy;
const ExtractJWT=require("passport-jwt").ExtractJwt;
const User=require("../models/user");

let opts={
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey :'codeial'
}
passport.use(new JwtStrategy(opts, function(jwt_payload, done){
    User.findOne({id: jwt_payload._id}, function(err, user){
        if(err){
            console.log("error",err);
            return;
        }
        if(user){
            return done(null,user)
        }else{
            return done(null,false)
        }

    })

}));
module.exports=passport;
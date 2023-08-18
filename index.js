const express = require("express");
const app = express();
const path = require("path");
const uploads=path.join(__dirname,'uploads')
const port = 8000;
const cookieParser = require("cookie-parser");
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
// use session cookies
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport_local_strategy");
const MongoStore = require("connect-mongo")(session);
const flash=require("connect-flash")
const customMiddleware=require("./config/middleware")

//
app.use(express.urlencoded());

// setting middleware for cookie parser
app.use(cookieParser());
// using expressLayouts
app.use(expressLayouts);

//extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// setup of view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/assets"));
// make uploads 
app.use("/uploads",express.static(__dirname + "/uploads"))
// mongo store is used to store the session cookie in the db
//session configuration
const mongoStore = new MongoStore({
  db: "session",
  url: "mongodb+srv://codieal:Gupta1998@cluster0.oidggmh.mongodb.net/Codeial",
});
app.use(
  session({
    secret: "somethingblabla",
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, //cookie valid for 24 hours
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
// flash middleware
app.use(flash());
app.use(customMiddleware.setFlash)

//use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("error", err);
  } else {
    console.log(`server is running on port ${port}`);
  }
});

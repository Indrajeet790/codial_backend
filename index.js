const express = require("express");
const app = express();
const path = require("path");
const port = 8000;
const cookieParser = require("cookie-parser");
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
// use session cookies
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport_local_strategy");

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

// passport middleware
app.use(
  session({
    name: "codeial",
    // todo change the secret before in production mode

    secret: "something",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

//use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("error", err);
  } else {
    console.log(`server is running on port ${port}`);
  }
});

const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const passport = require("passport");

// profile  routes
router.get("/profile", userController.profile);

// sign-in routes
router.get("/sign-in", userController.signIn);

// sign-up routes
router.get("/sign-up", userController.signUp);

//  routes for create a new user
router.post("/create", userController.create);

// use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  userController.createSession
);
module.exports = router;

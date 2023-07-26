const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");

// profile  routes
router.get("/profile", userController.profile);

// sign-in routes
router.get("/sign-in", userController.signIn);

// sign-up routes
router.get("/sign-up", userController.signup);

//  routes for create a new user
router.post("/create", userController.create);

// routes for session creation if user is signed in
router.post("/create-session", userController.createSession);

module.exports = router;

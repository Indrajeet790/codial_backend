const express = require("express");
const router = express.Router();
const user_apiController=require("../../../controllers/API/v1/user_api")

router.post("/create-session",user_apiController.createSession)
module.exports=router;
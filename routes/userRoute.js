const express = require("express");
const userController = require("../controllers/userId")
const router = express.Router();

router.get("/",userController.getAllUser)
router.post("/signup",userController.signUpUser);
router.post("/login",userController.logInUser);

module.exports = router; 


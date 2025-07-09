const express = require("express");
const { signUp, signIn } = require("../controllers/user.controller");


const userRoute = express.Router();

userRoute.post("/signUp", signUp)
userRoute.post("/signIn", signIn)

module.exports = userRoute;
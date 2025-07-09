const express = require("express");
const { signUp, signIn, logout } = require("../controllers/user.controller");


const userRoute = express.Router();

userRoute.post("/signUp", signUp)
userRoute.post("/signIn", signIn)
userRoute.post("/logout", logout)

module.exports = userRoute;
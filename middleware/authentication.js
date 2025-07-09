const jwt = require("jsonwebtoken")
const User = require("../models/user.model");

const auth = async (req, res, next) => {
  const token = req.cookies.token;
}
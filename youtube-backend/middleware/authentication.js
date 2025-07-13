// const jwt = require("jsonwebtoken")
// const User = require("../models/user.model");
// const dotenv = require("dotenv")
// dotenv.config()

// const auth = async (req, res, next) => {
//   try{
//     const token = req.cookies.token;
//     if(!token){
//       return res.status(401).json({message: "No Token, authorization denied"})
//     }
//     else{
//       try{
//         const decode = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = await User.findById(decode.userId).select("-password")
//         next();
//       }catch(err){
//         return res.status(401).json({error: "Token is not valid"})
//       }
//     }

//   }catch(err){
//     res.status(500).json({message: "Something went wrong in authentication!"})
//   }
// }

// module.exports = auth;

// comments
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const dotenv = require("dotenv");
dotenv.config();


// 🟢 Middleware to authenticate user using JWT from cookies
const auth = async (req, res, next) => {
  try {
    // ✅ Get token from cookie
    const token = req.cookies.token;

    // ❗ If no token is found, deny access
    if (!token) {
      return res.status(401).json({ message: "No Token, authorization denied" });
    } else {
      try {
        // ✅ Verify token using secret key
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        // ✅ Attach user to request object (excluding password)
        req.user = await User.findById(decode.userId).select("-password");

        next(); // ✅ Proceed to next middleware or route
      } catch (err) {
        // ❗ If token is invalid or expired
        return res.status(401).json({ error: "Token is not valid" });
      }
    }
  } catch (err) {
    // ⚠️ Handle unexpected server error
    res.status(500).json({ message: "Something went wrong in authentication!" });
  }
};

module.exports = auth;
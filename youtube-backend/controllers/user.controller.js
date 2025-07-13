// const User = require("../models/user.model");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// dotenv.config();

// const cookieOptions = {
//   httpOnly: true,
//   secure: false,
//   sameSite: "Lax",
// };

// exports.signUp = async (req, res) => {
//   try {
//     const { userName, email, about, profilePic, password } = req.body;

//     if (!userName || !email || !about || !profilePic || !password) {
//       return res
//         .status(400)
//         .json({ message: "All fields are mandatory to fill" });
//     }

//     // Email regex validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return res.status(400).json({ message: "invalid email format" });
//     }

//     // Password regex validation (at least 6 chars, 1 letter, 1 number, 1 special 1 Capital)
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
//     if (!passwordRegex.test(password)) {
//       return res.status(400).json({
//         message:
//           "password must be at least 6 characters, include at least one Capital letter one small letter, one number and one special character.",
//       });
//     }

//     const isExist = await User.findOne({ email });
//     if (isExist) {
//       return res
//         .status(400)
//         .json({ message: "Email already register try with other email" });
//     }

//     let updatedPassword = await bcrypt.hash(password, 10);
//     const user = new User({
//       userName,
//       email,
//       about,
//       profilePic,
//       password: updatedPassword,
//     });
//     await user.save();
//     res.status(201).json({ message: "User registered succesfully" });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Some error occur while registering user" });
//   }
// };

// exports.signIn = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res
//         .status(400)
//         .json({ message: "All fields are mandatory to fill" });
//     }

//     const user = await User.findOne({ email });

//     if (user && (await bcrypt.compare(password, user.password))) {
//       const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//         expiresIn: "7d",
//       });

//       // res.cookie("token", token,  cookieOptions)
//       res.cookie("token", token, {
//         httpOnly: true,
//         sameSite: "Lax", // or "None" if frontend & backend are on different domains
//         secure: false, // ✅ set to true if using HTTPS
//         maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//       });
//       res.json({ message: "Logged in succesfully", token, user });
//     } else {
//       return res.status(400).json({ message: "Invalid Credentials" });
//     }
//   } catch (err) {
//     return res.status(400).json({ message: "Something went wrong" });
//   }
// };

// exports.logout = async (req, res) => {
//   res
//     .clearCookie("token", cookieOptions)
//     .json({ message: "Logged out Succesfully" });
// };

// Comments
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// 🍪 Cookie configuration for JWT token
const cookieOptions = {
  httpOnly: true,  // ✅ Prevents JavaScript access to the cookie (secure)
  secure: false,   // ❗ Set to true in production when using HTTPS
  sameSite: "Lax", // ✅ Helps protect against CSRF
};


// 🟢 Register a new user
exports.signUp = async (req, res) => {
  try {
    const { userName, email, about, profilePic, password } = req.body;

    // ✅ 1. Basic field validation
    if (!userName || !email || !about || !profilePic || !password) {
      return res.status(400).json({ message: "All fields are mandatory to fill" });
    }

    // ✅ 2. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "invalid email format" });
    }

    // ✅ 3. Password strength validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "password must be at least 6 characters, include at least one Capital letter one small letter, one number and one special character.",
      });
    }

    // ✅ 4. Check if email already exists
    const isExist = await User.findOne({ email });
    if (isExist) {
      return res.status(400).json({ message: "Email already register try with other email" });
    }

    // ✅ 5. Hash password and create user
    let updatedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      userName,
      email,
      about,
      profilePic,
      password: updatedPassword,
    });

    await user.save(); // ✅ 6. Save user to DB

    res.status(201).json({ message: "User registered succesfully" });
  } catch (err) {
    res.status(500).json({ message: "Some error occur while registering user" });
  }
};


// 🟢 Log in existing user
exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ 1. Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are mandatory to fill" });
    }

    // ✅ 2. Find user by email
    const user = await User.findOne({ email });

    // ✅ 3. Compare hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
      // ✅ 4. Create JWT token with userId
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      // ✅ 5. Set token as HTTP-only cookie
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "Lax", // ❗ Use "None" with HTTPS if domains differ
        secure: false,   // ❗ Set to true in production with HTTPS
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.json({ message: "Logged in succesfully", token, user });
    } else {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};


// 🟢 Log out user (clear cookie)
exports.logout = async (req, res) => {
  res
    .clearCookie("token", cookieOptions) // ✅ Clear token cookie
    .json({ message: "Logged out Succesfully" });
};
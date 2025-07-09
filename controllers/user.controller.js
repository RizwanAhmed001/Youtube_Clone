const User = require("../models/user.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()


const cookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: "Lax"
}

exports.signUp = async (req, res) => {
  try{
    const {userName, email, about, profilePic, password} = req.body;

    if(!userName || !email || !about || !profilePic || !password){
      return res.status(400).json({message: "All fields are mandatory to fill"})
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "invalid email format" });
    }

    // Password regex validation (at least 6 chars, 1 letter, 1 number, 1 special 1 Capital)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return res
        .status(400)
        .json({
          message:
            "password must be at least 6 characters, include at least one Capital letter one small letter, one number and one special character.",
        });
    }

    const isExist = await User.findOne({email})
    if(isExist){
      return res.status(400).json({message: "Email already register try with other email"})
    }

    let updatedPassword = await bcrypt.hash(password, 10);
    const user = new User({userName, email, about, profilePic, password: updatedPassword})
    await user.save()
    res.status(201).json({message: "User registered succesfully"})

  }catch(err){
    res.status(500).json({message: "Some error occur while registering user"})
  }
}

exports.signIn = async (req, res) => {
  try{
    const {email, password} = req.body;

    if(!email || !password){
      return res.status(400).json({message: "All fields are mandatory to fill"})
    }

    const user = await User.findOne({email});

    if(user && await bcrypt.compare(password, user.password)){
      const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, { expiresIn: "1d" })

      res.cookie("token", token,  cookieOptions)
      res.json({message: "Logged in succesfully", token})
    }
    else{
      return res.status(400).json({message: "Invalid Credentials"})
    }

  }catch(err){

  }
}

exports.logout = async (req, res) => {
  res.clearCookie("token", cookieOptions).json({message: "Logged out Succesfully"})
}




    // "userName": "Rizwan",
    // "email": "rizwan@gmail.com",
    // "about": "Hello My Name is Rizwan, Nice to meet you",
    // "profilePic": "demo.png",
    // "password": "rizwanA1!"
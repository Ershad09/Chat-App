import bcrypt from "bcryptjs";
import User from "../model/user.model.js";
import { hashPassword } from "../utils/hashPassword.js";
import sendToken from "../utils/jwt.js";

// =================== signup ======================================
export const signup = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    // check all fields
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if email already exist
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // check password length
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "password must be at least 8 characters" });
    }

    // hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // save newUser first
      await newUser.save();

      // send jwt token
      sendToken(newUser._id, res);

      res.status(201).json({
        message: "new user created",
        _id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller:", error);

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      // Check if it's an email validation error
      if (error.errors.email) {
        return res.status(400).json({ message: error.errors.email.message });
      }
      // Handle other validation errors
      return res.status(400).json({ message: error.message });
    }

    // Handle other errors
    res.status(500).json({ message: "Internal server error" });
  }
};

// ======================= login =======================================
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check if email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //send token
    sendToken(user._id, res);

    res.status(200).json({
      message: "Login Successful",
      _id: user._id,
      userName: user.userName,
      email: user.email,
      profilePi: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ======================= logout =========================================
export const logout = (req, res) => {
  try {
    //clear cookie
    res.cookie("token", "", { maxAge: 0 });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error logging out",
    });
  }
};

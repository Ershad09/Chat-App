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
        return res.status(400).json({ message :error.errors.email.message });
      }
      // Handle other validation errors
      return res.status(400).json({ message: error.message });
    }

    // Handle other errors
    res.status(500).json({ message: "Internal server error" });
  }
  }



// ======================= login =======================================
export const login = (req, res) => {
  res.send("login");
};

// ======================= logout =========================================
export const logout = (req, res) => {
  res.send("logout");
};


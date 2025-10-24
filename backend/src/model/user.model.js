import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    match: [
      /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email",
    ],  // Validates email using regex
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  profilePic: {
    type: String,
    default: "",
  },
}, {timestamps: true}
); 

const User = mongoose.model("User", userSchema);

export default User;
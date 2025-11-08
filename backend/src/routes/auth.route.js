import express from "express";
import {
  login,
  logout,
  signup,
  updateProfile,
} from "../controller/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// ============== auth Routes =============

router.post("/signup", signup); // signup

router.post("/login", login); // login

router.post("/logout", logout); // logout

router.put("/update-profile", protect, updateProfile); //update profile

export default router;

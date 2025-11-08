// ======= External modules ===========
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
dotenv.config();

// ======== Internal Modules =========
import { connectDB } from "./lib/db.js";
import authRouter from "./routes/auth.route.js";

const app = express();

const PORT = 3000;

app.use(express.json()); //read JSON data from the request body.
app.use(cookieParser());

// ============ router ==================
app.use("/api/auth", authRouter); // Auth router

connectDB();

app.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT} 🎉🥳🎉`);
});

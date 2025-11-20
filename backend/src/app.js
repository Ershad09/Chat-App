// ======= External modules ===========
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
dotenv.config();

// ======== Internal Modules =========
import { connectDB } from "./lib/db.js";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";

const app = express();

const PORT = 3000;

app.use(express.json()); //read JSON data from the request body.
app.use(cookieParser());

// ============ routes ==================
app.use("/api/auth", authRouter); // Auth route
app.use("/api/messages", messageRouter); // Message route

connectDB();

app.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT} 🎉🥳🎉`);
});

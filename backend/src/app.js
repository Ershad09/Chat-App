// ======= External modules ===========
import express from "express";
import dotenv from "dotenv";
dotenv.config();

// ======== Internal Modules =========
import authRouter from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";

const app = express();
  
const PORT = 3000;

app.use(express.json()); //read JSON data from the request body.

// ============ router ==================
app.use("/api/auth", authRouter); // Auth router

connectDB();

app.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT} 🎉🥳🎉`);
});

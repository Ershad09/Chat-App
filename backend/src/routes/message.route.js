import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getAllConversations, getAllUsers, getMessages, sendMessage } from "../controller/message.controller.js";

const router = express.Router();

router.get("/users", getAllUsers);

router.get("/conversations",  getAllConversations);

router.get("/conversations/:userId", getMessages);

router.post("/send/:userId", sendMessage);

export default router;

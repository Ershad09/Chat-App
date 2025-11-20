import { set } from "mongoose";
import Message from "../model/message.model.js";
import User from "../model/user.model.js";

// ===================  getAllUser ==========================================
export const getAllUsers = async (req, res) => {
  try {
    //   myId (get the logged in user's ID from the auth middleware)
    const loggedInUserId = req.user._id;

    // find all users except the logged in user(me)
    const users = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json({
      users,
    });
  } catch (error) {
    console.log("Error in getAllUsers controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ===================== getAllConversations ==============================
export const getAllConversations = async (req, res) => {
  try {
    // logged in user (me)
    const loggedInUserId = req.user._id;

    // find all messages where logged in user(me) either sender or receiver
    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });

    const conversationIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString()
        )
      ),
    ];

    const conversations = await User.find({
      _id: { $in: conversationIds },
    }).select("-password");

    res.status(200).json(conversations);
  } catch (error) {
    console.log("Error in getAllConversations controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ===================   getMessages ======================================
export const getMessages = async (req, res) => {
  try {
    // get the other user's ID
    const { userId } = req.params;

    //get my ID(logged in user)
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userId },
        { senderId: userId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json({
      messages,
    });
  } catch (error) {
    console.log("Error in getMessages controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ====================  sendMessage  =====================================
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;

    if (!text && !image) {
      return res
        .status(400)
        .json({ message: "Message must contain text or image" });
    }

    // get  receiverId
    const { userId } = req.params;

    // get my ID(logged in user)
    const senderId = req.user._id;

    //If there is  an image, upload it to Cloudinary
    let imageUrl = "";

    if (image) {
      if (!image.startsWith("data:image")) {
        return res.status(400).json({
          message: "invalid image formate",
        });
      }
    }

    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "chat_images",
      transformation: [
        { width: 800, height: 800, crop: "limit" },
        { quality: "auto" },
      ],
      resource_type: "image",
      allowed_formats: ["jpg", "png", "jpeg", "webp", "gif"],
    });

    imageUrl = uploadResponse.secure_url;

    // create new message
    const newMessage = await Message.create({
      senderId: senderId,
      receiverId: userId,
      text: text || "",
      image: imageUrl,
    });

    res.status(201).json({
      newMessage,
    });
  } catch (error) {
    console.log("Error in sendMessage controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

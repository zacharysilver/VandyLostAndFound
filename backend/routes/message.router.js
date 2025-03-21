// File: /backend/routes/message.router.js
import express from "express";
import { getConversations, getMessages, sendMessage, getUnreadCount } from "../controllers/message.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Get all conversations for current user
router.get("/conversations", getConversations);

// Get messages between current user and another user
router.get("/:partnerId", getMessages);

// Send a message
router.post("/", sendMessage);

// Get unread message count
router.get("/unread/count", getUnreadCount);

export { router as messageRouter };
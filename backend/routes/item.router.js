import express from "express";
import { createItem, deleteItem, updateItem, getItems, followItem } from "../controllers/item.controller.js";
import { upload } from "../config/cloudinaryConfig.js"; // <-- Import the cloud-based 'upload'
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST → Create item + upload image to Cloudinary
router.post("/", authMiddleware, upload.single("image"), createItem);

// GET → Fetch all items (no upload needed)
router.get("/", getItems);

router.patch("/follow/:id", authMiddleware, followItem);
// DELETE → Remove an item (no upload needed)
router.delete("/:id", authMiddleware, deleteItem);

// PATCH → Update an item + upload new image to Cloudinary if provided
router.patch("/:id", upload.single("image"), updateItem);

export default router;

import express from "express";
import { createItem, deleteItem, updateItem, getItems } from "../controllers/item.controller.js";
import { upload } from "../config/cloudinaryConfig.js"; // <-- Import the cloud-based 'upload'

const router = express.Router();

// POST → Create item + upload image to Cloudinary
router.post("/", upload.single("image"), createItem);

// GET → Fetch all items (no upload needed)
router.get("/", getItems);

// DELETE → Remove an item (no upload needed)
router.delete("/:id", deleteItem);

// PATCH → Update an item + upload new image to Cloudinary if provided
router.patch("/:id", upload.single("image"), updateItem);

export default router;

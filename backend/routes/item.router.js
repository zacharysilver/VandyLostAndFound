import express from "express";
import multer from "multer";
import { createItem, deleteItem, updateItem, getItems } from "../controllers/item.controller.js";

const router = express.Router();

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save images to "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
router.post("/", upload.single("image"), createItem); // Accepts image
router.get("/", getItems);
router.delete("/:id", deleteItem);
router.patch("/:id", upload.single("image"), updateItem); // Accepts image

export default router;

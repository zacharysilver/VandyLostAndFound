import express from "express";
import { createItem, deleteItem, updateItem, getItems } from "../controllers/item.controller.js";
const router = express.Router();

router.post("/", createItem);

router.delete("/:id", deleteItem);

router.patch("/:id", updateItem);

router.get("/", getItems);


export default router;
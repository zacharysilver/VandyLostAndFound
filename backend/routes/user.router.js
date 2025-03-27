import express from "express";
import User from "../models/user.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ GET /api/users/profile - Fetch the logged-in user's profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("createdItems")
      .populate("followedItems");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ DELETE /api/users/unfollow/:itemId - Unfollow an item
router.delete("/unfollow/:itemId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { followedItems: req.params.itemId } },
      { new: true }
    )
      .populate("createdItems")
      .populate("followedItems")
      .select("-password");

    res.json({ success: true, user });
  } catch (err) {
    console.error("Error unfollowing item:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export { router as userRouter };

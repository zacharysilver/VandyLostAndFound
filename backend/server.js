import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import itemRouter from "./routes/item.router.js";
import { authRouter } from "./routes/auth.router.js";
import { userRouter } from "./routes/user.router.js";
import { authMiddleware } from "./middleware/authMiddleware.js";

// Load environment variables
dotenv.config();

// Check JWT_SECRET existence
console.log("JWT_SECRET Loaded:", process.env.JWT_SECRET ? "✅ Exists" : "❌ MISSING");

if (!process.env.JWT_SECRET) {
  console.error("❌ ERROR: Missing JWT_SECRET in environment variables.");
  process.exit(1);
}

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Connect to DB (only if not testing)
if (process.env.NODE_ENV !== 'test') {
  connectDB()
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => {
      console.error("❌ MongoDB Connection Error:", err);
      process.exit(1);
    });
}

// Routes
app.use("/api/items", itemRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/uploads", express.static("uploads"));

// Protected route example
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ msg: "Access granted to protected route!", user: req.user });
});

// Root route
app.get("/", (req, res) => {
  res.send("🔗 Welcome to VandyLostAndFound API");
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server (only if not testing)
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}

// Export app for testing
export default app;

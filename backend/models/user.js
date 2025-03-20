// File: models/user.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationCode: { type: String },
  verificationCodeExpiration: { type: Date },
  createdItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item", default: [] }],
  followedItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item", default: [] }],
  createdAt: { type: Date, default: Date.now },
});


const User = mongoose.model("User", userSchema);
export default User;

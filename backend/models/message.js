// File: /backend/models/message.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  recipient: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  item: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Item"
  },
  content: { 
    type: String, 
    required: true 
  },
  read: { 
    type: Boolean, 
    default: false 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Create compound index for conversation retrieval
messageSchema.index({ sender: 1, recipient: 1 });

const Message = mongoose.model("Message", messageSchema);
export default Message;
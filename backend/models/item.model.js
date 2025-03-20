// File: models/item.model.js
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dateFound: { type: Date, required: true },
    description: { type: String, required: true },
    image: { type: String }, // Image field
    category: { 
      type: String,
      enum: ['Electronics', 'Clothing', 'Accessories', 'Books', 'ID/Cards', 'Keys', 'Other'],
      default: 'Other'
    },
    itemType: {
      type: String,
      enum: ['lost', 'found'],
      default: 'found'
    },
    status: {
      type: String,
      enum: ['pending', 'claimed', 'returned'],
      default: 'pending'
    },
    location: {
      building: { type: String },
      room: { type: String },
      floor: { type: String },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number }
      }
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

// Create index for location-based queries
itemSchema.index({ 'location.coordinates': '2dsphere' });

const Item = mongoose.model("Item", itemSchema);

export default Item;
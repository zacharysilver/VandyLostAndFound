// File: models/item.model.js
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dateFound: { type: Date, required: true },
    description: { type: String, required: true },
    image: { type: String }, // ✅ Image field for Cloudinary uploads

    // ✅ Optional category for filtering
    category: { 
      type: String,
      enum: ['Electronics', 'Clothing', 'Accessories', 'Books', 'ID/Cards', 'Keys', 'Other'],
      default: 'Other'
    },

    // ✅ Item type: lost or found
    itemType: {
      type: String,
      enum: ['lost', 'found'],
      default: 'found'
    },

    // ✅ Status tracking
    status: {
      type: String,
      enum: ['pending', 'claimed', 'returned'],
      default: 'pending'
    },

    // ✅ Optional location fields (supports map markers)
    location: {
      building: { type: String },
      room: { type: String },
      floor: { type: String },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number }
      }
    },

    // ✅ Reference to submitting user (optional for claims, chat, etc.)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

// ✅ Index to enable geospatial queries for map views
itemSchema.index({ 'location.coordinates': '2dsphere' });

const Item = mongoose.model("Item", itemSchema);

export default Item;

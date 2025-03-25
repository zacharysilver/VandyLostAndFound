// cloudinaryConfig.js
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
import path from 'path';

// Load root-level .env
dotenv.config(); // Load from root automatically

// Debug Cloudinary config (optional for dev)
if (process.env.NODE_ENV !== 'production') {
  console.log("Cloudinary Config:", {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? "✅" : "❌",
    api_key: process.env.CLOUDINARY_API_KEY ? "✅" : "❌",
    api_secret: process.env.CLOUDINARY_API_SECRET ? "✅" : "❌"
  });
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage config
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'lost-and-found',
    allowedFormats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage });

export { upload, cloudinary };

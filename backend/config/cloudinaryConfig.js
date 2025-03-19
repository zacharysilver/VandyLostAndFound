// cloudinaryConfig.js
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

// Load env variables from the correct path
dotenv.config({ path: "../.env" });

// Log Cloudinary config status for debugging
console.log("Cloudinary Config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? "✅" : "❌",
  api_key: process.env.CLOUDINARY_API_KEY ? "✅" : "❌",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "✅" : "❌"
});

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'lost-and-found',
    allowedFormats: ['jpg', 'png', 'jpeg']
  },
});

// Create upload middleware
const upload = multer({ storage });

export { upload, cloudinary };
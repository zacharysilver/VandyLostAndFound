// cloudinaryConfig.js
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

// Log Cloudinary config status for debugging
console.log("Cloudinary Config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? "✅" : "❌",
  api_key: process.env.CLOUDINARY_API_KEY ? "✅" : "❌",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "✅" : "❌"
});



// 1. Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Create a Multer storage engine that uploads files to your Cloudinary account
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'lost-and-found', // or any folder name you prefer in Cloudinary
    allowedFormats: ['jpg', 'png', 'jpeg']
  },
});

export { upload, cloudinary };
// 3. The upload middleware
const upload = multer({ storage });

export { upload, cloudinary };

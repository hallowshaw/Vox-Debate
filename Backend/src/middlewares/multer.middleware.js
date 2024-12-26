import multer from "multer";
import fs from "fs";

// Set up storage configuration for multer
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    const uploadPath = "./public"; // Directly store in the 'public' folder

    // Check if the directory exists, if not, create it
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath); // Store files in 'public' directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // Unique filename
    cb(null, file.fieldname + "-" + uniqueSuffix); // Use the fieldname and unique suffix for filename
  },
});

// Initialize multer with the storage configuration
export const upload = multer({ storage: storage });

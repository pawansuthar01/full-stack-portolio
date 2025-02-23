import multer from "multer";
import Pkg from "cloudinary";
const { v2: cloudinary } = Pkg;
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Setup Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Uploads",
    allowed_formats: ["jpg", "jpeg", "png", "svg", "webp"],
  },
});

// Multer setup with file limits and filters
export const Upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedExts = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/svg+xml",
    ];
    if (!allowedExts.includes(file.mimetype)) {
      return cb(
        new Error(
          "Unsupported file type. Allowed formats: jpg, png, webp, mp4, svg, pdf"
        ),
        false
      );
    }
    cb(null, true);
  },
});

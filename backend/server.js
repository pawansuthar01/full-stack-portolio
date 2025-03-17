import { config } from "dotenv";
config();
import cloudinaryPkg from "cloudinary";
const { v2: cloudinary } = cloudinaryPkg;
import app from "./App.js";
const PORT = process.env.PORT;

export const Cloudinary = cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

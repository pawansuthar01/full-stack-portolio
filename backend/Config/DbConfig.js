import mongoose from "mongoose";
import { config } from "dotenv";
config();
mongoose.set("strictQuery", false);
export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    console.log(" DB connection SuccessFully", connection.host);
  } catch (error) {
    console.log("connection failed To DB error:", error);
    process.exit(1);
  }
};

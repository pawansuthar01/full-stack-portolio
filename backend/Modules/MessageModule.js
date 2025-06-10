import { Schema, model } from "mongoose";
const MessageModule = new Schema(
  {
    email: { type: String, required: true },
    fullName: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  {
    timestamps: true, 
  }
);
const Message = model("Message", MessageModule);
export default Message;

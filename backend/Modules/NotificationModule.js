import { model, Schema } from "mongoose";

const NotificationModule = new Schema(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
    DataUrl: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = model("Notification", NotificationModule);
export default Notification;

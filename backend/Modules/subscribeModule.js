import { model, Schema } from "mongoose";

const SubscribeModule = new Schema(
  {
    email: {
      type: String,
      unique: [true, "email is registered"],
      trim: true,

      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please fill in a valid email address",
      ],
    },
  },
  {
    timestamps: true,
  }
);
const Subscribe = model("Subscribe", SubscribeModule);
export default Subscribe;

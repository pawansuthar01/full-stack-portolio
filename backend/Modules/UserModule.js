import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  firebaseUID: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please fill in a valid email address",
    ],
  },
  fullName: { type: String, required: true, trim: true },
  avatar: { type: String },
  role: { type: String, default: "USER", enum: ["USER", "ADMIN"] },
  phoneNumber: {
    type: String,
    trim: true,
  },
  createdAt: { type: Date, default: Date.now },
  favoriteList: [
    {
      projectId: { type: Schema.Types.ObjectId, required: true },
    },
  ],
});

const User = model("UsersData", UserSchema);
export default User;

import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  firebaseUID: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  avatar: { type: String },
  role: { type: String, default: "USER", enum: ["USER", "ADMIN"] },

  createdAt: { type: Date, default: Date.now },
});

const User = model("UsersData", UserSchema);
export default User;

import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const AdminModule = new Schema(
  {
    Key_id: { type: String, default: "_Admin_ID_", unique: true },
    email: {
      type: String,
      unique: [true, "Email is already registered"],
      trim: true,
      required: [true, "Email is required"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is required"],
      minLength: [8, "Password must be at least 8 characters"],
    },
    forgotPasswordToken: { type: String },
    forgotPasswordExpiry: { type: Date },
  },
  {
    timestamps: true,
  }
);

AdminModule.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

AdminModule.methods.comparePassword = async function (PlainPassword) {
  return await bcrypt.compare(PlainPassword, this.password);
};

AdminModule.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.forgotPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.forgotPasswordExpiry = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const AdminData = model("AdminData", AdminModule);
export default AdminData;

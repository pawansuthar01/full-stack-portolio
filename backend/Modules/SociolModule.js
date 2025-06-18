import { model, Schema } from "mongoose";

const SociolModules = new Schema(
  {
    key_id: { type: String, default: "SociolLink_KEY", unique: true },

    Instagram: { type: String },
    LinkedIn: { type: String },

    GitHub: { type: String },
    X: { type: String },
    CV: { type: String },
  },
  {
    timestamps: true,
  }
);
const SocialLink = model("SocialLink", SociolModules);
export default SocialLink;

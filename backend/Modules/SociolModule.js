import { model, Schema } from "mongoose";

const SociolModules = new Schema(
  {
    key_id: { type: String, default: "SociolLink_KEY", unique: true },

    instagram: { type: String },
    linkedin: { type: String },
   
    git: { type: String },
    x: { type: String },
    cv: { type: String },
  },
  {
    timestamps: true,
  }
);
const SocialLink = model("SocialLink", SociolModules);
export default SocialLink;

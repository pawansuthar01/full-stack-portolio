import { model, Schema } from "mongoose";

const DetailsModules = new Schema(
  {
    fullName: {
      type: String,
    },
    key_id: { type: String, default: "Details_Key_id2", unique: true },

    inst: { type: String },
    linkedin: { type: String },
    facebook: { type: String },
    git: { type: String },
    x: { type: String },
    cv: { type: String },

    skill: {
      type: String,
      required: true,
    },
    project: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Details = model("Details", DetailsModules);
export default Details;

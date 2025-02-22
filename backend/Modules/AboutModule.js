import { model, Schema } from "mongoose";
const AboutSection = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    photo: { type: String, required: true },
    Key_id: { type: String, default: "INFO_ABOUT", unique: true },
  },
  { timestamps: true }
);
const About_section = model("About", AboutSection);
export default About_section;

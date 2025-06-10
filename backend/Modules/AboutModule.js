import { model, Schema } from "mongoose";
const AboutSection = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    BannerAboutImage: { type: String, required: true },
    AboutPageImage: { type: String, required: true },
    Key_id: { type: String, default: "INFO_ABOUT", unique: true },
    myJourney: [
      {
        date: { type: String, required: true },
        educationTitle: { type: String, required: true },
        educationDescription: { type: String, required: true },
      },
    ],
    funFact: [
      {
        icon: { type: String, required: true },
        factCount: { type: String, required: true },
        factDescription: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);
const About_section = model("About", AboutSection);
export default About_section;

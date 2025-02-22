import { model, Schema } from "mongoose";
const EducationModule = new Schema(
  {
    course: {
      type: String,
      required: true,
    },
    year: { type: String, required: true },

    institute: { type: String, required: true },

    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Education = model("Education", EducationModule);
export default Education;

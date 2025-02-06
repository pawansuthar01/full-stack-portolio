import { model, Schema } from "mongoose";
const EducationModule = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    DateOfComplete: { type: String, required: true },
    image: { type: String, required: true },
    NameOfBoard: { type: String, required: true },
    totalPercent: { type: String, required: true },
    description: { type: String, required: true },
    DateOfCreateCart: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);
const Education = model("Education", EducationModule);
export default Education;

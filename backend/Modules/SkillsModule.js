import { model, Schema } from "mongoose";

const SkillsModule = new Schema({
  title: { type: String, required: true },
  color: { type: String, required: true },
  icon: { type: String, required: true },
  skills: [
    {
      name: { type: String, required: true },
      level: { type: Number, required: true },
    },
  ],
});
const Skills = model("skills", SkillsModule);
export default Skills;

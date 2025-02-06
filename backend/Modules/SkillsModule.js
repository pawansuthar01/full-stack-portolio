import { model, Schema } from "mongoose";

const SkillsModule = new Schema({
  title: { type: String, required: true },
  skill: [
    {
      image: { type: String, required: true },
      name: { type: String, required: true },
    },
  ],
});
const Skills = model("skills", SkillsModule);
export default Skills;

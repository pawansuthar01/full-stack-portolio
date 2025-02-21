import { model, Schema } from "mongoose";
const ProjectSchema = new Schema({
  image: { type: String, required: true },
  tags: [
    {
      name: { type: String, required: true },
    },
  ],
  title: { type: String, required: true },
  description: { type: String, required: true },
  Date: { type: Date, default: Date.now },

  feedbackList: [
    {
      fullName: { type: String, required: true },

      rating: { type: String },
      comment: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});
const Project = model("Projects", ProjectSchema);
export default Project;

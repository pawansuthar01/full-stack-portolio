import { model, Schema } from "mongoose";
const ProjectSchema = new Schema({
  image: { type: String, required: true },
  tags: [String],
  title: { type: String, required: true },
  featured: { type: Boolean, default: false },
  description: { type: String, required: true },
  Date: { type: Date, default: Date.now },
  liveUrl: { type: String, required: true },
  githubUrl: { type: String, required: true },
  category: { type: String, required: true },
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

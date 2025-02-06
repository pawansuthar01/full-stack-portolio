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
  likeCount: { type: Number },
  favoriteCount: { type: Number },
  favorite: [
    {
      userId: { type: String, required: true },
      fullName: { type: String, required: true },
    },
  ],
  feedback: [
    {
      fullName: { type: String, required: true, ref: "UsersData" },
      avatar: { type: String, ref: "UsersData" },
      rating: { type: String, ref: "UsersData" },
      comment: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});
const Project = model("Projects", ProjectSchema);
export default Project;

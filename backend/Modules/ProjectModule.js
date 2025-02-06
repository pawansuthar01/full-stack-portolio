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
  likeCount: { type: Number, default: 0 },
  projectLikes: [
    {
      projectLike: {
        type: Boolean,
        default: false,
      },
      userId: {
        type: String,
        required: [true, "A like must include a id."],
      },
    },
  ],
  favoriteList: [
    {
      userId: { type: String, required: true },
      fullName: { type: String, required: true },
    },
  ],
  feedbackList: [
    {
      fullName: { type: String, required: true, ref: "UsersData" },
      avatar: { type: String, ref: "UsersData" },
      rating: { type: String },
      comment: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});
const Project = model("Projects", ProjectSchema);
export default Project;

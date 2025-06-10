import { Schema, model } from "mongoose";
const FeedbackModule = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String, required: true },
  avatar: { type: String, required: true },
  project: { type: String, required: true },
  rating: { type: String },
  testimonial: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Feedback = model("Feedback", FeedbackModule);
export default Feedback;

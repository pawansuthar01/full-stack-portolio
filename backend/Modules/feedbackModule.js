import { Schema, model } from "mongoose";
const FeedbackModule = new Schema({
  fullName: { type: String, required: true },
  rating: { type: String },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Feedback = model("Feedback", FeedbackModule);
export default Feedback;

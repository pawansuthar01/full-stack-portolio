import { model, Schema } from "mongoose";
const mainSection = new Schema(
  {
    title: { type: String, required: true },
    titles: [String],
    name: { type: String, required: true },

    description: { type: String, required: true },
    photo: { type: String, required: true },
    Key_id: { type: String, default: "INFO_MAIN", unique: true },
  },
  { timestamps: true }
);
const Main = model("main", mainSection);
export default Main;

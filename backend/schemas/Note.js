import mongoose, { Schema } from "mongoose";
const Notes = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
  },
});
const notes = mongoose.model("Notes", Notes);
export default notes;

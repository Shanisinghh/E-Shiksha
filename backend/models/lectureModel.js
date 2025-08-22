import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  videoUrl: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isPreviewFree: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export const Lecture = mongoose.model("Lecture", lectureSchema);



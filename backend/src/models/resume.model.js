import mongoose from "mongoose";


const resumeSchema = new mongoose.Schema({
  userId: { type: String, required: true },

  extractedData: { type: Object },
  careerData: { type: Array },
  atsAnalysis: { type: Object },

}, { timestamps: true });

export const Resume=mongoose.model("Resume",resumeSchema);
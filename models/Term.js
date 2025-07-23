import mongoose from "mongoose";

const TermSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // e.g. "Term 1", "First Term", etc.
    },
    year: {
      type: Number,
      required: true, // e.g. 2025
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isCurrent: {
      type: Boolean,
      default: false, // Use this to mark the active term
    },
    notes: {
      type: String, // Optional field for term-specific notes
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Term || mongoose.model("Term", TermSchema);

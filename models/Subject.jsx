import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    description: {
      type: String,
      default: "",
    },
    classLevels: {
      type: [String], // e.g., ["Form 1", "Form 2"]
      default: [],
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher", // Optional: only if you have a Teacher model
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Subject ||
  mongoose.model("Subject", SubjectSchema);

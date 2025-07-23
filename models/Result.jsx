import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    subjectName: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    grade: {
      type: String,
      default: "",
    },
    comment: {
      type: String,
      default: "",
    },
    term: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Result || mongoose.model("Result", ResultSchema);

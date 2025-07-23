import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    studentId: {
      type: String,
      required: true,
      unique: true,
    },
    admissionNumber: {
      type: String,
      unique: true,
      required: true,
    },
    classLevel: {
      type: String,
      required: true,
    },
    stream: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    address: {
      type: String,
    },
    guardianName: {
      type: String,
    },
    guardianPhone: {
      type: String,
    },
    enrolledSubjects: [String],
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Student ||
  mongoose.model("Student", studentSchema);

import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    employeeId: {
      type: String,
      unique: true,
      required: true,
    },
    department: {
      type: String, // e.g., "Sciences", "Languages"
      required: true,
    },
    subjects: [
      {
        type: String, // ← change this from ObjectId to String
      },
    ],
    assignedClasses: [
      {
        type: String, // e.g., "Form 1", "Grade 6"
      },
    ],
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Teacher ||
  mongoose.model("Teacher", teacherSchema);

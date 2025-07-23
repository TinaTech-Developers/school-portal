import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    staffCode: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    privileges: {
      type: [String], // Optional: ["manage-users", "view-reports"]
      default: ["all"],
    },
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Admin || mongoose.model("Admin", adminSchema);

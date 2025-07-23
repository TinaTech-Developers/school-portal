import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    audience: {
      type: String,
      enum: ["all", "students", "teachers", "parents"],
      default: "all",
    },
    // postedBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User", // Or "Admin" depending on your auth model
    //   required: true,
    // },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // temporary for development
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isImportant: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Announcement ||
  mongoose.model("Announcement", AnnouncementSchema);

import dbConnect from "@/config/database";
import Student from "@/models/Student";

export async function GET(request, context) {
  const { name } = context.params;

  await dbConnect();

  const students = await Student.find({
    enrolledSubjects: { $regex: new RegExp(`^${name}$`, "i") },
  }).populate("userId");

  return Response.json({ students });
}

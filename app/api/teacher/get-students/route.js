import dbConnect from "@/config/database";
import Student from "@/models/Student";

export async function GET() {
  await dbConnect();
  const students = await Student.find()
    .populate("userId")
    .sort({ classLevel: 1 });
  return new Response(JSON.stringify(students));
}

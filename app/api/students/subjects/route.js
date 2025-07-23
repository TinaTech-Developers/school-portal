import Subject from "@/models/Subject";
import Student from "@/models/Student";
import { getAuthSession } from "@/lib/getSession";
import dbConnect from "@/config/database";

export async function GET() {
  const session = await getAuthSession();
  if (!session || session.user.role !== "student") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 403,
    });
  }

  await dbConnect();

  const student = await Student.findOne({ userId: session.user.id });
  if (!student) {
    return new Response(
      JSON.stringify({ error: "Student profile not found" }),
      { status: 404 }
    );
  }

  const subjects = await Subject.find({ classLevel: student.classLevel });
  return new Response(JSON.stringify(subjects));
}

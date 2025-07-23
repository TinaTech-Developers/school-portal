import dbConnect from "@/config/database";
import Teacher from "@/models/Teacher";

export async function POST(req) {
  const { teacherId } = await req.json();
  await dbConnect();

  const teacher = await Teacher.findOne({ userId: teacherId });
  if (!teacher) {
    return new Response(JSON.stringify({ error: "Teacher not found" }), {
      status: 404,
    });
  }

  return new Response(
    JSON.stringify({ assignedClasses: teacher.assignedClasses })
  );
}

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

  const student = await Student.findOne({ userId: session.user.id }).populate(
    "userId"
  );
  if (!student) {
    return new Response(JSON.stringify({ error: "Student not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(student));
}

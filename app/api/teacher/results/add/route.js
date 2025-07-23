import dbConnect from "@/config/database";
import { getAuthSession } from "@/lib/getSession";
import Result from "@/models/Result";

export async function POST(req) {
  // route protection
  const session = await getAuthSession();
  if (!session || session.user.role !== "teacher") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 403,
    });
  }
  //   ===============

  const { studentId, subject, score, grade, term, className, teacherId } =
    await req.json();
  await dbConnect();

  const result = await Result.create({
    studentId,
    subject,
    score,
    grade,
    term,
    class: className,
    teacherId,
  });

  return new Response(JSON.stringify({ message: "Result added", result }), {
    status: 201,
  });
}

import dbConnect from "@/config/database";
import Result from "@/models/Result";

export async function POST(req) {
  const { teacherId } = await req.json();
  await dbConnect();

  const results = await Result.find({ teacherId }).populate("studentId");
  return new Response(JSON.stringify(results));
}

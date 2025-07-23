
import Result from "@/models/Result";
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

  const results = await Result.find({ studentId: session.user.id });
  return new Response(JSON.stringify(results));
}

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/config/database";
import Subject from "@/models/Subject";

export async function GET(req) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const teacherId = session?.user?.id;

  if (!teacherId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const subjects = await Subject.find({ teacherId }).lean();

  return new Response(JSON.stringify(subjects), { status: 200 });
}

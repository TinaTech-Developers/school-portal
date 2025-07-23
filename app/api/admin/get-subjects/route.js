import Subject from "@/models/Subject";
import dbConnect from "@/config/database";

export async function GET() {
  await dbConnect();
  const subjects = await Subject.find().sort({ classLevel: 1 });
  return new Response(JSON.stringify(subjects));
}

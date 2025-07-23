import dbConnect from "@/config/database";
import Subject from "@/models/Subject";

export async function POST(req) {
  const { name, classLevel } = await req.json();
  await dbConnect();

  const subject = await Subject.create({ name, classLevel });
  return new Response(JSON.stringify({ message: "Subject created", subject }), {
    status: 201,
  });
}

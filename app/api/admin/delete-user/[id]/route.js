import dbConnect from "@/config/database";
import Term from "@/models/Term";

export async function POST(req) {
  const { name, startDate, endDate } = await req.json();
  await dbConnect();

  const term = await Term.create({ name, startDate, endDate });
  return new Response(JSON.stringify({ message: "Term created", term }), {
    status: 201,
  });
}

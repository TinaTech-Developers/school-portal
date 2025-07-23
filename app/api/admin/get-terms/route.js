import dbConnect from "@/config/database";
import Term from "@/models/Term";

export async function GET() {
  await dbConnect();
  const terms = await Term.find().sort({ createdAt: -1 });
  return new Response(JSON.stringify(terms));
}

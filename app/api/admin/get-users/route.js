import dbConnect from "@/config/database";
import User from "@/models/User";

export async function GET() {
  await dbConnect();
  const users = await User.find().sort({ createdAt: -1 });
  return new Response(JSON.stringify(users));
}

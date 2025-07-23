import dbConnect from "@/config/database";
import User from "@/models/User";

export async function PATCH(req, { params }) {
  const updates = await req.json();
  await dbConnect();

  const user = await User.findByIdAndUpdate(params.id, updates, { new: true });
  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify({ message: "User updated", user }));
}

import dbConnect from "@/config/database";
import Result from "@/models/Result";

export async function PATCH(req, { params }) {
  const data = await req.json();
  await dbConnect();

  const updated = await Result.findByIdAndUpdate(params.id, data, {
    new: true,
  });
  if (!updated) {
    return new Response(JSON.stringify({ error: "Result not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify({ message: "Result updated", updated }));
}

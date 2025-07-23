import Result from "@/models/Result";
import dbConnect from "@/config/database";

export async function DELETE(req, { params }) {
  await dbConnect();

  const deleted = await Result.findByIdAndDelete(params.id);
  if (!deleted) {
    return new Response(JSON.stringify({ error: "Result not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify({ message: "Result deleted" }));
}

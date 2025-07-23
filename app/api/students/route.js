import dbConnect from "@/config/database";
import Student from "@/models/Student";
import User from "@/models/User";

export async function GET() {
  try {
    await dbConnect();

    const students = await Student.find().populate("userId", "name email");

    return new Response(JSON.stringify(students), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

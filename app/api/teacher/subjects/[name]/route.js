import dbConnect from "@/config/database";
import Student from "@/models/Student";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  const { name } = context.params;

  await dbConnect();

  try {
    // Fetch students enrolled in the subject (case-insensitive)
    const students = await Student.find({
      enrolledSubjects: { $regex: new RegExp(`^${name}$`, "i") },
    }).populate("userId"); // if you want full user info

    return NextResponse.json({ students });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: "Failed to fetch students",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}

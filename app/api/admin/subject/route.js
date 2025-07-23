import dbConnect from "@/config/database";
import Subject from "@/models/Subject";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();
    const subjects = await Subject.find()
      .populate("teacherId", "name email") // <- correctly matches your model
      .lean();

    return new NextResponse(JSON.stringify(subjects), { status: 200 });
  } catch (error) {
    console.error("Error fetching subjects:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const { name, code, description, classLevels, teacherId, status } =
      await req.json();

    const subject = await Subject.create({
      name,
      code,
      description,
      classLevels,
      teacherId,
      status,
    });

    return NextResponse.json(subject, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create subject", message: error.message },
      { status: 500 }
    );
  }
}

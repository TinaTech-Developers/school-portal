import dbConnect from "@/config/database";
import Teacher from "@/models/Teacher";
import { NextResponse } from "next/server";

// ✅ Get teacher by ID
export async function GET(req, { params }) {
  await dbConnect();
  try {
    const teacher = await Teacher.findById(params.id).populate("userId");
    if (!teacher)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(teacher);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ✅ Update teacher
export async function PUT(req, { params }) {
  await dbConnect();
  const updates = await req.json();

  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(params.id, updates, {
      new: true,
    });

    if (!updatedTeacher)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ teacher: updatedTeacher }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// ✅ Delete teacher
export async function DELETE(req, { params }) {
  await dbConnect();
  try {
    const deleted = await Teacher.findByIdAndDelete(params.id);
    if (!deleted)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ success: true, deleted }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

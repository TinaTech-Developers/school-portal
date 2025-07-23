import dbConnect from "@/config/database";
import Subject from "@/models/Subject";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  await dbConnect();
  const subject = await Subject.findById(params.id).populate(
    "assignedTeacher",
    "name email"
  );
  if (!subject)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(subject);
}

export async function PUT(req, { params }) {
  await dbConnect();
  const data = await req.json();
  const updated = await Subject.findByIdAndUpdate(params.id, data, {
    new: true,
  });
  return NextResponse.json(updated);
}

export async function DELETE(_, { params }) {
  await dbConnect();
  await Subject.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}

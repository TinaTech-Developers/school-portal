import { NextResponse } from "next/server";
import Announcement from "@/models/Announcement";
import dbConnect from "@/config/database";

export async function GET(_, { params }) {
  await dbConnect();
  try {
    const announcement = await Announcement.findById(params.id);
    if (!announcement) throw new Error("Announcement not found");
    return NextResponse.json(announcement);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 404 });
  }
}

export async function PATCH(req, { params }) {
  await dbConnect();
  try {
    const body = await req.json();
    const updated = await Announcement.findByIdAndUpdate(params.id, body, {
      new: true,
    });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(_, { params }) {
  await dbConnect();
  try {
    await Announcement.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";

import Announcement from "@/models/Announcement";
import dbConnect from "@/config/database";

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const announcement = await Announcement.create(body);
    return NextResponse.json(announcement, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function GET() {
  await dbConnect();
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    return NextResponse.json(announcements);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

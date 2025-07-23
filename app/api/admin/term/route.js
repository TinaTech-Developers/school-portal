import { NextResponse } from "next/server";
import dbConnect from "@/config/database";
import Term from "@/models/Term";

export async function GET() {
  await dbConnect();
  try {
    const terms = await Term.find().sort({ year: -1, startDate: 1 });
    return NextResponse.json(terms);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const newTerm = await Term.create(body);
    return NextResponse.json(newTerm, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

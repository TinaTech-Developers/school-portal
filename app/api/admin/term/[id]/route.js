import { NextResponse } from "next/server";
import dbConnect from "@/config/database";
import Term from "@/models/Term";

// GET a single term by ID
export async function GET(req, { params }) {
  await dbConnect();
  try {
    const term = await Term.findById(params.id);
    if (!term) {
      return NextResponse.json({ error: "Term not found" }, { status: 404 });
    }
    return NextResponse.json(term);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// UPDATE a term
export async function PUT(req, { params }) {
  await dbConnect();
  try {
    const updates = await req.json();
    const updatedTerm = await Term.findByIdAndUpdate(params.id, updates, {
      new: true,
    });
    return NextResponse.json(updatedTerm);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// DELETE a term
export async function DELETE(req, { params }) {
  await dbConnect();
  try {
    const deletedTerm = await Term.findByIdAndDelete(params.id);
    if (!deletedTerm) {
      return NextResponse.json({ error: "Term not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, deleted: deletedTerm });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

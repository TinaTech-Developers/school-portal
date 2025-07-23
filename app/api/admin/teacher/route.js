import User from "@/models/User";
import Teacher from "@/models/Teacher";
import { NextResponse } from "next/server";
import dbConnect from "@/config/database";

// Generate unique employee ID
function generateEmployeeId() {
  return `EMP-${Math.floor(1000 + Math.random() * 9000)}`;
}

export async function POST(req) {
  try {
    const {
      userId,
      department,
      phone,
      address,
      profilePicture,
      subjects,
      assignedClasses,
    } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if user already has a teacher profile
    const existingTeacher = await Teacher.findOne({ userId });
    if (existingTeacher) {
      return NextResponse.json(
        { error: "Teacher profile already exists for this user" },
        { status: 400 }
      );
    }

    // Generate and ensure unique employeeId
    let employeeId = generateEmployeeId();
    while (await Teacher.findOne({ employeeId })) {
      employeeId = generateEmployeeId(); // Regenerate if already taken
    }

    const teacher = await Teacher.create({
      userId,
      employeeId,
      department,
      phone,
      address,
      profilePicture,
      subjects,
      assignedClasses,
    });

    return NextResponse.json(
      { message: "✅ Teacher created successfully", teacher },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error creating teacher:", error); // log full error
    return NextResponse.json(
      { error: "Teacher creation failed", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();

    const teachers = await Teacher.find().populate("userId", "name email");

    return NextResponse.json(teachers, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

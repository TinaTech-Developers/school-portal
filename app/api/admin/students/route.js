import dbConnect from "@/config/database";
import Student from "@/models/Student";
import User from "@/models/User";
import bcrypt from "bcryptjs";

function generateStudentId() {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `STD${year}${random}`;
}

export async function GET() {
  try {
    await dbConnect();
    const students = await Student.find().populate("userId", "name email");
    return new Response(JSON.stringify({ students }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch students",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const {
      name,
      email,
      password,
      admissionNumber,
      classLevel,
      stream,
      dateOfBirth,
      gender,
      address,
      guardianName,
      guardianPhone,
      enrolledSubjects,
      profilePicture,
    } = await req.json();

    if (
      !name ||
      !email ||
      !password ||
      !admissionNumber ||
      !classLevel ||
      !dateOfBirth ||
      !gender
    ) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    await dbConnect();

    const emailExists = await User.findOne({ email });
    if (emailExists)
      return new Response(JSON.stringify({ error: "Email already in use" }), {
        status: 400,
      });

    const admExists = await Student.findOne({ admissionNumber });
    if (admExists)
      return new Response(
        JSON.stringify({ error: "Admission number already used" }),
        { status: 400 }
      );

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "student",
    });

    const student = await Student.create({
      userId: user._id,
      studentId: generateStudentId(),
      admissionNumber,
      classLevel,
      stream,
      dateOfBirth,
      gender,
      address,
      guardianName,
      guardianPhone,
      enrolledSubjects,
      profilePicture,
    });

    return new Response(
      JSON.stringify({ message: "Student registered", student }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Registration failed", details: error.message }),
      { status: 500 }
    );
  }
}

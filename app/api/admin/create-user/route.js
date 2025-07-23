import dbConnect from "@/config/database";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const body = await req.json();
  const { name, email, password, role } = body;

  if (!["student", "teacher", "admin"].includes(role)) {
    return new Response(JSON.stringify({ error: "Invalid role" }), {
      status: 400,
    });
  }

  await dbConnect();

  const userExists = await User.findOne({ email });
  if (userExists) {
    return new Response(JSON.stringify({ error: "Email already in use" }), {
      status: 400,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  return new Response(JSON.stringify({ message: "User created", user }), {
    status: 201,
  });
}

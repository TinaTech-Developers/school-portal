import User from "@/models/User";
import Result from "@/models/Result";
import dbConnect from "@/config/database";

export async function GET() {
  await dbConnect();

  const totalUsers = await User.countDocuments();
  const totalStudents = await User.countDocuments({ role: "student" });
  const totalTeachers = await User.countDocuments({ role: "teacher" });
  const totalAdmins = await User.countDocuments({ role: "admin" });
  const totalResults = await Result.countDocuments();

  return new Response(
    JSON.stringify({
      totalUsers,
      totalStudents,
      totalTeachers,
      totalAdmins,
      totalResults,
    })
  );
}

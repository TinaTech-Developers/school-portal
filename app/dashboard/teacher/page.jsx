import { getAuthSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import TeacherLayout from "./components/TeacherLayout";
import DashboardClient from "./components/DashboardClient";

export default async function AdminDashboardPage() {
  const session = await getAuthSession();

  if (!session || session.user.role !== "teacher") {
    redirect("/");
  }

  return (
    <TeacherLayout>
      <DashboardClient user={session.user} />
    </TeacherLayout>
  );
}

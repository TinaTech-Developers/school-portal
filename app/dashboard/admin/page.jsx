// app/dashboard/admin/page.jsx

import { getAuthSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import AdminLayout from "./components/AdminLayout";
import DashboardClient from "./components/DahboardClient";

export default async function AdminDashboardPage() {
  const session = await getAuthSession();

  if (!session || session.user.role !== "admin") {
    redirect("/login");
  }

  return (
    <AdminLayout>
      <DashboardClient user={session.user} />
    </AdminLayout>
  );
}

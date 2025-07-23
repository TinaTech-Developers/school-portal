import { getAuthSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  FaBookOpen,
  FaClipboardList,
  FaBullhorn,
  FaFolderOpen,
  FaComments,
  FaChartBar,
} from "react-icons/fa";
import StudentLayout from "./_components/StudentLayout";

export default async function StudentDashboard() {
  const session = await getAuthSession();

  if (!session || session.user.role !== "student") {
    return redirect("/");
  }

  return (
    <StudentLayout>
      <div className="min-h-screen flex bg-gray-100">
        <main className="flex-1 p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard
              title="My Results"
              value="14"
              color="green"
              icon={<FaChartBar />}
              link="/student/results"
            />
            <DashboardCard
              title="My Subjects"
              value="8"
              color="indigo"
              icon={<FaBookOpen />}
              link="/student/subjects"
            />
            <DashboardCard
              title="Assignments"
              value="5 Pending"
              color="purple"
              icon={<FaClipboardList />}
              link="/student/assignments"
            />
            <DashboardCard
              title="Learning Materials"
              value="12 Files"
              color="blue"
              icon={<FaFolderOpen />}
              link="/student/learning-materials"
            />
            <DashboardCard
              title="Announcements"
              value="3 New"
              color="yellow"
              icon={<FaBullhorn />}
              link="/student/announcements"
            />
            <DashboardCard
              title="Feedback & Reports"
              value="2 Items"
              color="red"
              icon={<FaComments />}
              link="/student/feedback"
            />
          </div>
        </main>
      </div>
    </StudentLayout>
  );
}

function DashboardCard({ title, value, color, icon, link }) {
  const colorMap = {
    green: "text-green-700",
    indigo: "text-indigo-700",
    purple: "text-purple-700",
    blue: "text-blue-700",
    yellow: "text-yellow-600",
    red: "text-red-700",
  };

  return (
    <Link href={link}>
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border hover:border-green-400 cursor-pointer">
        <div className="flex items-center gap-4">
          <div className={`text-2xl ${colorMap[color]}`}>{icon}</div>
          <div>
            <h2 className="text-sm text-gray-500 mb-1">{title}</h2>
            <p className={`text-xl font-bold ${colorMap[color]}`}>{value}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

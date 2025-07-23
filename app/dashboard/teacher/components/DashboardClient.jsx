"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiUserPlus, FiUploadCloud, FiClipboard, FiBell } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function DashboardClient() {
  const { data: session } = useSession();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      if (!session?.user?.id) return;

      setLoading(true);
      try {
        const res = await fetch("/api/teacher/subjects");
        if (!res.ok) throw new Error("Failed to fetch subjects");

        const data = await res.json();

        const enrichedSubjects = await Promise.all(
          data.map(async (subject) => {
            if (!subject.name) return { ...subject, studentCount: 0 };

            try {
              const encodedName = encodeURIComponent(subject.name);
              const res = await fetch(
                `/api/teacher/subjects/${encodedName}/students`
              );
              const result = await res.json();

              return { ...subject, studentCount: result.students?.length || 0 };
            } catch (err) {
              console.error(
                `Failed to fetch student count for ${subject.name}`,
                err
              );
              return { ...subject, studentCount: 0 };
            }
          })
        );

        setSubjects(enrichedSubjects);
      } catch (err) {
        console.error("Failed to fetch teacher subjects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [session?.user?.id]);

  return (
    <div className="space-y-8 md:mt-10">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="My Students"
          value={
            loading
              ? "Loading..."
              : subjects.reduce((acc, sub) => acc + sub.studentCount, 0)
          }
          icon={<FiUserPlus />}
          color="blue"
        />
        <StatCard
          title="Classes Assigned"
          value={loading ? "Loading..." : subjects.length}
          icon={<FiClipboard />}
          color="green"
        />
        <StatCard
          title="Results Uploaded"
          value="87"
          icon={<FiUploadCloud />}
          color="purple"
        />
        <StatCard
          title="Notifications"
          value="3"
          icon={<FiBell />}
          color="red"
        />
      </div>

      {/* My Subjects */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          My Subjects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {loading ? (
            <p className="text-gray-500">Loading subjects...</p>
          ) : (
            subjects.map((subject) => (
              <ClassCard
                key={subject._id}
                name={subject.classLevels?.join(", ") || "N/A"}
                students={subject.studentCount || 0}
                subject={subject.name}
                teacherId={subject.teacherId}
              />
            ))
          )}
        </div>
      </section>

      {/* Notices */}
      <section className="space-y-6 text-gray-700">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          Recent Notices
        </h2>
        <ul className="space-y-3">
          <li className="bg-white shadow p-3 rounded border-l-4 border-blue-600">
            📢 New school term begins on 22 July 2025.
          </li>
          <li className="bg-white shadow p-3 rounded border-l-4 border-yellow-500">
            ⚠️ Deadline to upload Term 2 results: 18 July.
          </li>
          <li className="bg-white shadow p-3 rounded border-l-4 border-green-500">
            ✅ Parent meeting scheduled for Friday.
          </li>
        </ul>
      </section>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  const colorMap = {
    blue: "text-blue-600 bg-blue-100",
    green: "text-green-600 bg-green-100",
    purple: "text-purple-600 bg-purple-100",
    red: "text-red-600 bg-red-100",
  };

  return (
    <motion.div
      className="bg-white p-5 rounded-xl shadow flex items-center gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={`p-3 rounded-full ${colorMap[color]}`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-xl font-bold text-gray-800">{value}</h3>
      </div>
    </motion.div>
  );
}

function ClassCard({ name, students, subject, teacherId }) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-600 hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <p className="text-sm text-gray-500">Subject: {subject}</p>
      <p className="text-sm text-gray-500">Students: {students}</p>
      <Link
        href={`/dashboard/teacher/${teacherId}`}
        className="text-blue-600 text-sm underline mt-2 inline-block"
      >
        View Profile
      </Link>
    </motion.div>
  );
}

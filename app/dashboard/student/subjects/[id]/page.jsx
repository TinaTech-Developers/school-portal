"use client";

import { useParams } from "next/navigation";
import { FaChalkboardTeacher, FaCheckCircle } from "react-icons/fa";
import { MdOutlineAssignment } from "react-icons/md";
import { motion } from "framer-motion";
import Link from "next/link";
import StudentLayout from "../../_components/StudentLayout";

const subjects = [
  {
    id: "math101",
    name: "Mathematics",
    teacher: "Mr. Moyo",
    icon: "📐",
    status: "Ongoing",
    description:
      "This course covers algebra, geometry, calculus, and statistics with a focus on real-world problem solving.",
    assignments: [
      { title: "Algebra Homework", due: "2025-07-25", status: "Completed" },
      { title: "Calculus Quiz", due: "2025-08-01", status: "Pending" },
    ],
  },
  {
    id: "eng201",
    name: "English Literature",
    teacher: "Ms. Dube",
    icon: "📚",
    status: "Ongoing",
    description:
      "Explore classic and modern literature with analysis of poetry, drama, and novels.",
    assignments: [
      { title: "Poetry Analysis", due: "2025-07-23", status: "Pending" },
      { title: "Drama Essay", due: "2025-08-04", status: "Completed" },
    ],
  },
  // Add other subjects here
];

export default function SubjectDetailsPage() {
  const params = useParams();
  const subject = subjects.find((s) => s.id === params.id);

  if (!subject) {
    return (
      <StudentLayout>
        <div className="p-6 text-center text-gray-500">Subject not found.</div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="min-h-screen bg-gray-100 p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto bg-white rounded-xl p-6 shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{subject.icon}</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {subject.name}
                </h1>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <FaChalkboardTeacher className="text-green-500" />
                  {subject.teacher}
                </p>
              </div>
            </div>

            <span
              className={`px-3 py-1 text-sm font-medium rounded-full ${
                subject.status === "Ongoing"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {subject.status}
            </span>
          </div>

          <p className="text-gray-700 mt-2 mb-6">{subject.description}</p>

          <div className="border-t pt-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <MdOutlineAssignment className="text-xl text-blue-500" />
              Assignments
            </h2>

            <div className="space-y-4">
              {subject.assignments.map((assignment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-800">
                      {assignment.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Due: {assignment.due}
                    </p>
                  </div>
                  <span
                    className={`text-sm px-3 py-1 rounded-full ${
                      assignment.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {assignment.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-6 text-right">
            <Link
              href="/dashboard/student/subjects"
              className="text-sm text-green-600 hover:underline"
            >
              ← Back to My Subjects
            </Link>
          </div>
        </motion.div>
      </div>
    </StudentLayout>
  );
}

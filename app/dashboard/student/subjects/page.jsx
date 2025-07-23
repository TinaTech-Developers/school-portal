"use client";

import { useState } from "react";
import { FaBookOpen, FaChalkboardTeacher } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { motion } from "framer-motion";
import Link from "next/link";
import StudentLayout from "../_components/StudentLayout";

const subjects = [
  {
    id: "math101",
    name: "Mathematics",
    teacher: "Mr. Moyo",
    icon: "📐",
    status: "Ongoing",
  },
  {
    id: "eng201",
    name: "English Literature",
    teacher: "Ms. Dube",
    icon: "📚",
    status: "Ongoing",
  },
  {
    id: "sci301",
    name: "Science",
    teacher: "Dr. Ndlovu",
    icon: "🧪",
    status: "Completed",
  },
  {
    id: "his101",
    name: "History",
    teacher: "Mrs. Chikafu",
    icon: "🏛️",
    status: "Ongoing",
  },
];

export default function page() {
  const [query, setQuery] = useState("");

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <StudentLayout>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                📘 My Subjects
              </h1>
              <p className="text-gray-500">
                Subjects you are currently enrolled in
              </p>
            </div>

            <div className="relative">
              <BiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search subjects..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubjects.map((subject, index) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">{subject.icon}</span>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {subject.name}
                    </h2>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <FaChalkboardTeacher /> {subject.teacher}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      subject.status === "Ongoing"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {subject.status}
                  </span>

                  <Link
                    href={`/dashboard/student/subjects/${subject.id}`}
                    className="text-sm text-green-600 hover:underline font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </motion.div>
            ))}

            {filteredSubjects.length === 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-500 col-span-full text-center py-8"
              >
                No subjects match your search.
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}

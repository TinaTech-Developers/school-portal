"use client";
import { useState } from "react";
import StudentLayout from "../_components/StudentLayout";
import { motion } from "framer-motion";
import { FaBullhorn, FaSearch } from "react-icons/fa";

const announcements = [
  {
    id: "1",
    title: "Exam Timetable Released",
    subject: "Mathematics",
    content:
      "The final term exam timetable is now available. Please check with your class teacher.",
    date: "2025-07-15",
    isNew: true,
  },
  {
    id: "2",
    title: "Science Project Due",
    subject: "Science",
    content: "Reminder: Your group science project is due next Monday.",
    date: "2025-07-12",
    isNew: false,
  },
  {
    id: "3",
    title: "Literature Essay Extended",
    subject: "English",
    content: "Deadline extended for the Hamlet essay. New due date: Friday.",
    date: "2025-07-10",
    isNew: false,
  },
];

const subjects = ["All", "Mathematics", "English", "Science"];

export default function StudentAnnouncementsPage() {
  const [query, setQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All");

  const filtered = announcements.filter(
    (a) =>
      (subjectFilter === "All" || a.subject === subjectFilter) &&
      a.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <StudentLayout>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <FaBullhorn className="text-green-500" /> Announcements
            </h1>
            <p className="text-gray-500">
              Stay updated with important school news
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="relative w-full sm:w-auto">
              <FaSearch className="absolute left-3 top-3 text-gray-600" />
              <input
                type="text"
                placeholder="Search announcements..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-400 rounded-lg text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-72"
              />
            </div>
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="px-4 py-2 border border-gray-400 text-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {subjects.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            {filtered.length === 0 ? (
              <p className="text-center text-gray-500 py-12">
                No announcements found.
              </p>
            ) : (
              filtered.map((ann) => (
                <motion.div
                  key={ann.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow hover:shadow-md p-5 transition"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {ann.title}
                      </h2>
                      <p className="text-sm text-gray-600">{ann.content}</p>
                      <p className="mt-2 text-xs text-gray-400">
                        Subject: {ann.subject} • {ann.date}
                      </p>
                    </div>
                    {ann.isNew && (
                      <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full ml-2">
                        NEW
                      </span>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}

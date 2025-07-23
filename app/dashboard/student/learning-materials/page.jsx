"use client";
import { useState } from "react";
import StudentLayout from "../_components/StudentLayout";
import { FaDownload, FaBook, FaSearch } from "react-icons/fa";
import Link from "next/link";

const materials = [
  {
    id: "1",
    title: "Algebra Basics Notes",
    subject: "Mathematics",
    type: "PDF",
    fileUrl: "/materials/algebra.pdf",
  },
  {
    id: "2",
    title: "Literature Summary - Hamlet",
    subject: "English",
    type: "PDF",
    fileUrl: "/materials/hamlet-summary.pdf",
  },
  {
    id: "3",
    title: "Periodic Table Chart",
    subject: "Science",
    type: "Image",
    fileUrl: "/materials/periodic-table.jpg",
  },
  {
    id: "4",
    title: "World War II Notes",
    subject: "History",
    type: "PDF",
    fileUrl: "/materials/ww2-notes.pdf",
  },
];

export default function LearningMaterialsPage() {
  const [query, setQuery] = useState("");
  const [filterSubject, setFilterSubject] = useState("All");

  const subjects = ["All", "Mathematics", "English", "Science", "History"];

  const filtered = materials.filter(
    (m) =>
      (filterSubject === "All" || m.subject === filterSubject) &&
      m.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <StudentLayout>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                📘 Learning Materials
              </h1>
              <p className="text-gray-500">Access notes, charts, and PDFs</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <div className="relative w-full sm:w-auto">
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search materials..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-64"
                />
              </div>
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {subjects.map((subj) => (
                  <option key={subj}>{subj}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((mat) => (
              <div
                key={mat.id}
                className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
              >
                <div className="flex items-center gap-4 mb-4">
                  <FaBook className="text-3xl text-green-500" />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {mat.title}
                    </h2>
                    <p className="text-sm text-gray-500">{mat.subject}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{mat.type}</span>
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/student/learning-materials/${mat.subject.toLowerCase()}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition"
                    >
                      View Materials
                    </Link>
                    <a
                      href={mat.fileUrl}
                      download
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition flex items-center gap-1"
                    >
                      <FaDownload /> Download
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <p className="col-span-full text-center text-gray-500 py-12">
                No learning materials found.
              </p>
            )}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}

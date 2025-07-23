"use client";

import { useState, useEffect } from "react";
import { FiBookOpen, FiUsers, FiArrowRight } from "react-icons/fi";
import TeacherLayout from "../components/TeacherLayout";
import { useRouter } from "next/navigation";

export default function MySubjects() {
  const [filterForm, setFilterForm] = useState("All");
  const [search, setSearch] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/teacher/subjects");
        if (!res.ok) throw new Error("Failed to fetch subjects");

        const data = await res.json();

        // Enrich each subject with student count
        const enriched = await Promise.all(
          data.map(async (subject) => {
            if (!subject.name) return { ...subject, students: 0 };

            try {
              const encodedName = encodeURIComponent(subject.name);
              const res = await fetch(
                `/api/teacher/subjects/${encodedName}/students`
              );
              const result = await res.json();

              return {
                ...subject,
                students: result.students?.length || 0,
                progress: Math.floor(Math.random() * 40) + 60,
                recent: ["New lesson uploaded", "Assignment due soon"],
              };
            } catch (err) {
              console.error(
                `Failed to fetch students for ${subject.name}`,
                err
              );
              return {
                ...subject,
                students: 0,
                progress: Math.floor(Math.random() * 40) + 60,
                recent: ["New lesson uploaded", "Assignment due soon"],
              };
            }
          })
        );

        setSubjects(enriched);
      } catch (err) {
        console.error("Error fetching subjects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const filteredSubjects = subjects
    .filter((subj) => filterForm === "All" || subj.form === filterForm)
    .filter((subj) => subj.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <TeacherLayout className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mt-10 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">My Subjects</h1>
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-400 px-3 py-2 text-gray-700 rounded w-56"
          />
          <select
            value={filterForm}
            onChange={(e) => setFilterForm(e.target.value)}
            className="border border-gray-400 px-3 py-2 text-gray-700 rounded"
          >
            <option value="All">All Forms</option>
            <option value="Form 1">Form 1</option>
            <option value="Form 2">Form 2</option>
            <option value="Form 3">Form 3</option>
            <option value="Form 4">Form 4</option>
          </select>
        </div>
      </div>

      <hr className="my-4 py-[0.5px] bg-gray-300" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-gray-500">Loading subjects...</p>
        ) : (
          filteredSubjects.map((subject) => (
            <div
              key={subject._id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FiBookOpen className="text-blue-600 text-2xl" />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {subject.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {subject.form || subject.classLevels?.[0] || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-gray-600 text-sm">
                  <FiUsers />
                  <span>{subject.students}</span>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-4 text-sm text-gray-600">
                Progress:
                <span className="ml-2 font-semibold text-green-600">
                  {subject.progress}%
                </span>
                <div className="w-full h-2 bg-gray-200 rounded mt-1">
                  <div
                    className="h-full bg-green-500 rounded"
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>
              </div>

              {/* Recent Activity */}
              <ul className="mt-3 text-xs text-gray-600 space-y-1">
                {subject.recent?.map((item, index) => (
                  <li key={index}>📌 {item}</li>
                ))}
              </ul>

              {/* Actions */}
              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                <button
                  onClick={() => router.push(`/dashboard/teacher/students`)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  View Students
                </button>
                <button className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                  Upload Results
                </button>
                <button
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                  onClick={() =>
                    router.push(
                      `/dashboard/teacher/subjects/${encodeURIComponent(
                        subject._id
                      )}`
                    )
                  }
                >
                  More <FiArrowRight className="inline-block ml-1" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </TeacherLayout>
  );
}

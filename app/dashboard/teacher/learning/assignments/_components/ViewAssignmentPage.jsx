"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ViewAssignmentsPage() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      const res = await fetch("/api/assignments");
      const data = await res.json();
      setAssignments(data);
    };
    fetchAssignments();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-purple-700 mb-4">
        My Assignments
      </h1>
      <div className="grid gap-4">
        {assignments.length === 0 ? (
          <p className="text-gray-500">No assignments uploaded yet.</p>
        ) : (
          assignments.map((a) => (
            <div
              key={a._id}
              className="border rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold">{a.title}</h2>
              <p className="text-sm text-gray-600">{a.description}</p>
              <p className="text-sm mt-2">Subject ID: {a.subjectId}</p>
              <p className="text-sm text-gray-500">Due: {a.dueDate}</p>
              <a
                href={a.fileUrl}
                className="text-purple-600 underline mt-2 block"
                target="_blank"
              >
                Download File
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

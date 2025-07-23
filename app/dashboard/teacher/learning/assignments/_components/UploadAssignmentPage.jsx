"use client";

import { useEffect, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import Link from "next/link";

export default function UploadAssignmentPage() {
  const [subjects, setSubjects] = useState([]);
  const [assignment, setAssignment] = useState({
    title: "",
    description: "",
    subjectId: "",
    dueDate: "",
    file: null,
  });

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await fetch("/api/subjects");
        const data = await res.json();
        setSubjects(data);
      } catch (err) {
        console.error("Failed to fetch subjects", err);
      }
    };
    fetchSubjects();
  }, []);

  const handleFileChange = (e) => {
    setAssignment({ ...assignment, file: e.target.files[0] });
  };

  const handleChange = (e) => {
    setAssignment({ ...assignment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(assignment).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const res = await fetch("/api/assignments", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("✅ Assignment uploaded!");
      setAssignment({
        title: "",
        description: "",
        subjectId: "",
        dueDate: "",
        file: null,
      });
    } else {
      alert("❌ Error uploading assignment");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-purple-700">
          Upload Assignment
        </h1>
        <Link
          href="/dashboard/teacher/learning/assignments/viewassignments"
          className="bg-purple-600 text-white px-4 py-2 rounded-md shadow hover:bg-purple-700 transition"
        >
          View Assignments
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 rounded-lg space-y-5"
      >
        <input
          type="text"
          name="title"
          placeholder="Assignment Title"
          value={assignment.title}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />

        <select
          name="subjectId"
          value={assignment.subjectId}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        >
          <option value="">Select Subject</option>
          {subjects.map((subj) => (
            <option key={subj.subjectId} value={subj.subjectId}>
              {subj.name} ({subj.subjectId})
            </option>
          ))}
        </select>

        <input
          type="date"
          name="dueDate"
          value={assignment.dueDate}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />

        <textarea
          name="description"
          value={assignment.description}
          onChange={handleChange}
          rows="4"
          className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Description or instructions..."
        />

        <label className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-purple-400 bg-purple-50 rounded-md cursor-pointer hover:bg-purple-100 transition">
          <FiUploadCloud className="text-xl text-purple-600" />
          <span className="text-purple-700">
            {assignment.file?.name || "Choose File (PDF, DOCX)"}
          </span>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            className="hidden"
          />
        </label>

        <div className="pt-4">
          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition"
          >
            Upload Assignment
          </button>
        </div>
      </form>
    </div>
  );
}

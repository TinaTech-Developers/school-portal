"use client";

import { useState, useEffect } from "react";
import {
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiUpload,
  FiDownload,
} from "react-icons/fi";
import AdminLayout from "../components/AdminLayout";

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);

  const filteredStudents = Array.isArray(students)
    ? students.filter((s) =>
        s.userId?.name?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/students", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error("Failed to fetch data");

        const jsonData = await response.json();
        console.log("Fetched Data:", jsonData);

        if (Array.isArray(jsonData)) {
          setStudents(jsonData);
        } else if (Array.isArray(jsonData.students)) {
          setStudents(jsonData.students);
        } else {
          console.error("Unexpected data format:", jsonData);
          setStudents([]);
        }
      } catch (error) {
        console.error("Fetch Error", error);
        alert("Failed to fetch students. Please try again later.");
      }
    };
    fetchData();
  }, []);

  return (
    <AdminLayout>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Manage Students</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            <FiPlus /> Add Student
          </button>
          <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            <FiUpload /> Import CSV
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
            <FiDownload /> Export
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 text-gray-700 mt-4 mb-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            className="w-full px-4 py-2 border rounded pl-10"
            placeholder="Search by name or class"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
        </div>

        <select className="px-4 py-2 border rounded">
          <option>All Classes</option>
          <option>Form 1</option>
          <option>Form 2</option>
          <option>Form 3</option>
          <option>Form 4</option>
        </select>

        <select className="px-4 py-2 border rounded">
          <option>Status: All</option>
          <option>Active</option>
          <option>Suspended</option>
        </select>
      </div>

      {filteredStudents?.length > 0 && (
        <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 rounded text-sm text-yellow-800">
          {selected.length} student(s) selected.{" "}
          <button className="underline ml-2">Bulk Promote</button>{" "}
          <button className="underline ml-2">Bulk Delete</button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border shadow rounded-lg">
          <thead className="bg-gray-600 text-left text-white text-sm">
            <tr>
              <th className="px-4 py-3 border-b">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    const allIds = filteredStudents.map((s) => s._id);
                    setSelected(e.target.checked ? allIds : []);
                  }}
                  checked={
                    selected.length > 0 &&
                    selected.length === filteredStudents.length
                  }
                />
              </th>
              <th className="px-4 py-3 border-b">ID</th>
              <th className="px-4 py-3 border-b">Name</th>
              <th className="px-4 py-3 border-b">Class</th>
              <th className="px-4 py-3 border-b">Gender</th>
              <th className="px-4 py-3 border-b">Status</th>
              <th className="px-4 py-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr
                key={student._id}
                className="hover:bg-gray-50 text-gray-700 text-sm"
              >
                <td className="px-4 py-3 border-b">
                  <input
                    type="checkbox"
                    checked={selected.includes(student._id)}
                    onChange={() => toggleSelect(student._id)}
                  />
                </td>
                <td className="px-4 py-3 border-b">{student.studentId}</td>
                <td className="px-4 py-3 border-b">{student.userId?.name}</td>
                <td className="px-4 py-3 border-b">{student.classLevel}</td>
                <td className="px-4 py-3 border-b">{student.gender}</td>
                <td className="px-4 py-3 border-b">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
                      student.status === "Active"
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                  >
                    {student.status || "Active"}
                  </span>
                </td>
                <td className="px-4 py-3  border-b flex gap-3 ">
                  <button className="text-blue-600 hover:underline text-sm flex  items-center gap-1">
                    <FiEdit2 /> Edit
                  </button>
                  <button className="text-red-600 hover:underline text-sm flex  items-center gap-1">
                    <FiTrash2 /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

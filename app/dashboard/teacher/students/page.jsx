"use client";

import { useState, useEffect } from "react";
import {
  FiDownload,
  FiCheckSquare,
  FiChevronUp,
  FiChevronDown,
} from "react-icons/fi";
import * as XLSX from "xlsx";
import TeacherLayout from "../components/TeacherLayout";

export default function TeacherStudentManagement() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortAsc, setSortAsc] = useState(true);
  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await fetch("/api/teacher/subjects");
        const data = await res.json();
        setSubjects(data);
      } catch (err) {
        console.error("Error fetching subjects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      if (!selectedClass) return;

      try {
        const encodedName = encodeURIComponent(selectedClass);
        const res = await fetch(`/api/teacher/subjects/${encodedName}`);
        const data = await res.json();
        setStudents(data.students || []);
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };

    fetchStudents();
  }, [selectedClass]);

  const toggleAttendance = (id) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleExport = () => {
    const data = filteredStudents.map((student) => ({
      Date: date,
      ID: student.studentId,
      Name: student.userId?.name,
      Class: student.classLevel,
      Present: attendance[student.studentId] ? "Yes" : "No",
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Register");
    XLSX.writeFile(workbook, `Register_${selectedClass}_${date}.xlsx`);
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const filteredStudents = students
    .filter((s) => s.userId?.name?.toLowerCase().includes(search.toLowerCase()))

    .sort((a, b) => {
      const valA =
        sortKey === "name"
          ? a.userId?.name?.toLowerCase?.() || ""
          : a[sortKey]?.toLowerCase?.() || "";
      const valB =
        sortKey === "name"
          ? b.userId?.name?.toLowerCase?.() || ""
          : b[sortKey]?.toLowerCase?.() || "";
      return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });

  return (
    <TeacherLayout className="space-y-8 p-6">
      <div className="flex justify-between items-center mt-10">
        <h1 className="text-2xl font-bold text-gray-800">Class Register</h1>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={!selectedClass}
        >
          <FiDownload /> Export to Excel
        </button>
      </div>

      {/* Class Selection */}
      <div className="flex flex-wrap gap-4 items-center mb-4">
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Select Class
          </label>
          <select
            value={selectedClass || ""}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border border-gray-400 text-gray-500 px-4 py-2 rounded w-60"
          >
            <option value="">-- Choose Class --</option>
            {subjects.map((subj) => (
              <option key={subj._id} value={subj.name}>
                {subj.name} ({subj.classLevels?.join(", ")})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Select Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-400 text-gray-500 px-4 py-2 rounded w-48"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Search Student
          </label>
          <input
            type="text"
            placeholder="Enter name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-400 text-gray-500 px-4 py-2 rounded w-64"
          />
        </div>
      </div>

      {/* Student Table */}
      {selectedClass ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded border">
            <thead className="bg-gray-700 text-white text-left text-sm">
              <tr>
                {["studentId", "name", "classLevel"].map((key) => (
                  <th key={key} onClick={() => handleSort(key)} className="...">
                    <div className="flex items-center gap-1">
                      {key === "studentId"
                        ? "ID"
                        : key === "classLevel"
                        ? "Class"
                        : "Name"}
                      {sortKey === key ? (
                        sortAsc ? (
                          <FiChevronUp />
                        ) : (
                          <FiChevronDown />
                        )
                      ) : (
                        <span className="text-gray-400">⇅</span>
                      )}
                    </div>
                  </th>
                ))}

                <th className="px-4 py-2 border-b">Present</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr
                  key={student._id}
                  className="hover:bg-gray-50 text-gray-700 text-sm"
                >
                  <td className="px-4 py-2 border-b">{student.studentId}</td>
                  <td className="px-4 py-2 border-b">{student.userId?.name}</td>
                  <td className="px-4 py-2 border-b">{student.classLevel}</td>

                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => toggleAttendance(student.studentId)}
                      className={`flex items-center gap-2 px-3 py-1 rounded text-sm font-medium ${
                        attendance[student.studentId]
                          ? "bg-green-600 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      <FiCheckSquare />
                      {attendance[student.studentId] ? "Present" : "Mark"}
                    </button>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-gray-400 py-4">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 mt-4">Please select a class to begin.</p>
      )}
    </TeacherLayout>
  );
}

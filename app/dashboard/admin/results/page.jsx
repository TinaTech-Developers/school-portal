"use client";

import { useState } from "react";
import { FiDownload } from "react-icons/fi";
import AdminLayout from "../components/AdminLayout";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Chart setup
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const mockResults = [
  {
    id: "R001",
    studentName: "Tariro Chikomo",
    class: "Form 2A",
    subject: "Mathematics",
    term: "Term 1",
    year: 2025,
    score: 85,
    grade: "A",
  },
  {
    id: "R002",
    studentName: "Tawanda Moyo",
    class: "Form 3B",
    subject: "English",
    term: "Term 1",
    year: 2025,
    score: 72,
    grade: "B",
  },
  {
    id: "R003",
    studentName: "Tariro Chikomo",
    class: "Form 2A",
    subject: "Science",
    term: "Term 1",
    year: 2025,
    score: 91,
    grade: "A+",
  },
];

// Utility: Calculate averages
const getAverageScore = () => {
  const total = mockResults.reduce((sum, r) => sum + r.score, 0);
  return Math.round(total / mockResults.length);
};

export default function AdminResultsDashboard() {
  const [filters, setFilters] = useState({
    search: "",
    class: "All",
    subject: "All",
  });

  const filteredResults = mockResults.filter((r) =>
    r.studentName.toLowerCase().includes(filters.search.toLowerCase())
  );

  const subjectScores = {};
  mockResults.forEach((r) => {
    subjectScores[r.subject] = subjectScores[r.subject]
      ? [...subjectScores[r.subject], r.score]
      : [r.score];
  });

  const chartData = {
    labels: Object.keys(subjectScores),
    datasets: [
      {
        label: "Average Score",
        data: Object.values(subjectScores).map(
          (scores) => scores.reduce((a, b) => a + b, 0) / scores.length
        ),
        backgroundColor: "#6366F1",
      },
    ],
  };

  const handleExport = () => {
    const headers = ["ID", "Student", "Class", "Subject", "Score", "Grade"];
    const rows = filteredResults.map((r) => [
      r.id,
      r.studentName,
      r.class,
      r.subject,
      r.score,
      r.grade,
    ]);

    const csv =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csv);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Results Overview</h1>
          <button
            onClick={handleExport}
            className="mt-3 md:mt-0 flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            <FiDownload />
            Export CSV
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            title="Average Score"
            value={`${getAverageScore()}%`}
            color="bg-blue-600"
          />
          <Card title="Total Students" value="2" color="bg-green-600" />
          <Card title="Subjects" value="3" color="bg-yellow-500" />
          <Card
            title="Top Performer"
            value="Tariro Chikomo"
            color="bg-purple-600"
          />
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Performance by Subject
          </h2>
          <Bar data={chartData} />
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 text-gray-700">
          <input
            type="text"
            placeholder="Search by student"
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
            className="px-4 py-2 border rounded w-full md:max-w-xs"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded shadow text-gray-700">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-600 text-xs uppercase text-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">ID</th>
                <th className="px-6 py-3 text-left">Student</th>
                <th className="px-6 py-3 text-left">Class</th>
                <th className="px-6 py-3 text-left">Subject</th>
                <th className="px-6 py-3 text-left">Score</th>
                <th className="px-6 py-3 text-left">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredResults.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No results found.
                  </td>
                </tr>
              ) : (
                filteredResults.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3">{r.id}</td>
                    <td className="px-6 py-3">{r.studentName}</td>
                    <td className="px-6 py-3">{r.class}</td>
                    <td className="px-6 py-3">{r.subject}</td>
                    <td className="px-6 py-3 font-semibold text-indigo-600">
                      {r.score}
                    </td>
                    <td className="px-6 py-3 font-semibold text-green-600">
                      {r.grade}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

// Card component
function Card({ title, value, color }) {
  return (
    <div className={`p-4 rounded-lg text-white shadow ${color}`}>
      <h4 className="text-sm font-medium">{title}</h4>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

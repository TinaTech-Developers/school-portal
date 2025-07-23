"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { FiEdit, FiPlus, FiX } from "react-icons/fi";
import TeacherLayout from "../../components/TeacherLayout";

const mockResults = [
  { id: "ST001", name: "Tariro Chikomo", score: 84 },
  { id: "ST002", name: "Tawanda Moyo", score: 73 },
  { id: "ST003", name: "Rutendo Nyasha", score: 92 },
  { id: "ST004", name: "Blessing Chipo", score: 40 },
];

export default function SubjectDetailPage() {
  const params = useParams(); // ✅ Fix: Get route params safely in client component
  const subjectId = params?.id;

  const [results, setResults] = useState(mockResults);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", score: "" });

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setFormData({ name: "", score: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResults((prev) => [
      ...prev,
      { id: `ST${prev.length + 1}`, ...formData },
    ]);
    closeModal();
  };

  const averageScore =
    results.reduce((acc, r) => acc + r.score, 0) / results.length || 0;
  const highestScore = Math.max(...results.map((r) => r.score));
  const lowestScore = Math.min(...results.map((r) => r.score));
  const passRate =
    (results.filter((r) => r.score >= 50).length / results.length) * 100;

  return (
    <TeacherLayout>
      <div className="p-6 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Subject: {subjectId}
          </h1>
          <button
            onClick={openModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FiPlus /> Add Result
          </button>
        </div>

        {/* Stat Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label="Average Score"
            value={`${averageScore.toFixed(1)}%`}
          />
          <StatCard label="Highest Score" value={`${highestScore}%`} />
          <StatCard label="Lowest Score" value={`${lowestScore}%`} />
          <StatCard
            label="Pass Rate"
            value={`${passRate.toFixed(0)}%`}
            color={passRate >= 50 ? "green" : "red"}
          />
        </div>

        {/* Results Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="px-4 py-2 border-b text-left">ID</th>
                <th className="px-4 py-2 border-b text-left">Student Name</th>
                <th className="px-4 py-2 border-b text-left">Score (%)</th>
                <th className="px-4 py-2 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {results.map((res) => (
                <tr
                  key={res.id}
                  className="hover:bg-gray-50 text-sm text-gray-700"
                >
                  <td className="px-4 py-2 border-b">{res.id}</td>
                  <td className="px-4 py-2 border-b">{res.name}</td>
                  <td className="px-4 py-2 border-b">{res.score}%</td>
                  <td className="px-4 py-2 border-b">
                    <button className="text-blue-600 hover:underline text-sm flex items-center gap-1">
                      <FiEdit /> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-4"
            >
              <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-lg font-semibold">Add Result</h2>
                <button
                  onClick={closeModal}
                  type="button"
                  className="text-gray-500 hover:text-red-600 text-xl"
                >
                  <FiX />
                </button>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Student Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-4 py-2 border rounded"
                  required
                />

                <label className="block text-sm font-medium text-gray-700">
                  Score (%)
                </label>
                <input
                  type="number"
                  value={formData.score}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      score: parseInt(e.target.value),
                    }))
                  }
                  className="w-full px-4 py-2 border rounded"
                  required
                  min={0}
                  max={100}
                />
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </TeacherLayout>
  );
}

// Stat Card Component
function StatCard({ label, value, color = "blue" }) {
  const colorMap = {
    blue: "text-blue-700",
    green: "text-green-700",
    red: "text-red-600",
  };

  return (
    <div className="bg-white p-4 rounded shadow flex flex-col gap-1">
      <span className="text-sm text-gray-500">{label}</span>
      <span className={`text-xl font-bold ${colorMap[color]}`}>{value}</span>
    </div>
  );
}

"use client";
import React, { useRef } from "react";
import StudentLayout from "../_components/StudentLayout";
import Image from "next/image";
import {
  FaStar,
  FaThumbsUp,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useReactToPrint } from "react-to-print";

const resultsData = [
  {
    subject: "Mathematics",
    mark: 87,
    grade: "A",
    comment: "Excellent work!",
  },
  {
    subject: "English",
    mark: 72,
    grade: "B",
    comment: "Good effort!",
  },
  {
    subject: "Science",
    mark: 59,
    grade: "C",
    comment: "Needs improvement",
  },
  {
    subject: "History",
    mark: 45,
    grade: "D",
    comment: "Try to study more",
  },
];

function getGradeColor(grade) {
  switch (grade) {
    case "A":
      return "text-green-600 font-semibold";
    case "B":
      return "text-blue-600 font-semibold";
    case "C":
      return "text-yellow-600 font-semibold";
    case "D":
    case "E":
    case "F":
      return "text-red-600 font-semibold";
    default:
      return "text-gray-600";
  }
}

function getPerformanceIcon(grade) {
  switch (grade) {
    case "A":
      return <FaStar className="text-green-500" title="Excellent" />;
    case "B":
      return <FaThumbsUp className="text-blue-500" title="Good" />;
    case "C":
      return <FaCheckCircle className="text-yellow-500" title="Average" />;
    case "D":
    case "E":
    case "F":
      return (
        <FaExclamationTriangle
          className="text-red-500"
          title="Needs Improvement"
        />
      );
    default:
      return null;
  }
}

export default function ViewResultsPage() {
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Student Results",
  });

  return (
    <StudentLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        {/* Header with Logo */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Image
              src="/TCHardy.jpg"
              alt="School Logo"
              width={48}
              height={48}
              className="rounded-full"
            />
            <h1 className="text-2xl font-bold text-gray-800">My Results</h1>
          </div>
          <button
            onClick={handlePrint}
            className="bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition"
          >
            Export to PDF
          </button>
        </div>

        {/* Results Table */}
        <div ref={printRef}>
          <div className="overflow-auto bg-white rounded-xl shadow-lg p-2 md:p-0">
            <table className="min-w-full table-auto text-left">
              <thead className="bg-green-100 text-green-700 uppercase text-sm">
                <tr>
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4">Mark (%)</th>
                  <th className="px-6 py-4">Grade</th>
                  <th className="px-6 py-4">Performance</th>
                  <th className="px-6 py-4">Teacher's Comment</th>
                </tr>
              </thead>
              <tbody>
                {resultsData.map((result, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-all"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {result.subject}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{result.mark}%</td>
                    <td className={`px-6 py-4 ${getGradeColor(result.grade)}`}>
                      {result.grade}
                    </td>
                    <td className="px-6 py-4">
                      {getPerformanceIcon(result.grade)}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {result.comment}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            * Please contact your teacher if you have questions about your
            results.
          </p>
        </div>
      </div>
    </StudentLayout>
  );
}

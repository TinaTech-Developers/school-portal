"use client";

import React, { useState } from "react";
import TeacherLayout from "../components/TeacherLayout";
import { FiUpload, FiPlus, FiTrash2, FiCheckCircle } from "react-icons/fi";

export default function UploadResultsPage() {
  const [results, setResults] = useState([
    { name: "", score: "", comment: "", studentId: generateStudentId(0) },
  ]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Generate auto student ID like STU001
  function generateStudentId(index) {
    return `STU${(index + 1).toString().padStart(3, "0")}`;
  }

  const handleInputChange = (index, field, value) => {
    const updated = [...results];
    updated[index][field] = value;
    setResults(updated);
  };

  const handleAddRow = () => {
    const newId = generateStudentId(results.length);
    setResults([
      ...results,
      { name: "", score: "", comment: "", studentId: newId },
    ]);
  };

  const handleRemoveRow = (index) => {
    const updated = results.filter((_, i) => i !== index);
    // Recalculate student IDs
    const reindexed = updated.map((r, i) => ({
      ...r,
      studentId: generateStudentId(i),
    }));
    setResults(reindexed);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const isValid = results.every(
      (r) => r.name && r.score !== "" && r.score >= 0 && r.score <= 100
    );

    if (!isValid) {
      setUploadError(
        "Please fill all fields correctly. Score must be between 0 and 100."
      );
      return;
    }

    // OPTIONAL: Send to MongoDB backend via POST here

    console.log("Uploading results:", results);

    setUploadSuccess(true);
    setUploadError("");
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  return (
    <TeacherLayout>
      <div className="p-6 space-y-6 text-gray-800">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Upload Student Results
          </h1>
        </div>

        {uploadSuccess && (
          <div className="bg-green-100 text-green-800 p-4 rounded-md flex items-center gap-2">
            <FiCheckCircle className="text-xl" />
            Results uploaded successfully!
          </div>
        )}

        {uploadError && (
          <div className="bg-red-100 text-red-800 p-4 rounded-md">
            {uploadError}
          </div>
        )}

        <form onSubmit={handleUpload} className="space-y-6">
          <div className="space-y-4">
            {results.map((result, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center border-b pb-4"
              >
                <div>
                  <label className="text-sm text-gray-500">Student ID</label>
                  <input
                    type="text"
                    value={result.studentId}
                    disabled
                    className="px-4 py-2 border rounded w-full bg-gray-100"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500">Name</label>
                  <input
                    type="text"
                    value={result.name}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                    placeholder="Student Name"
                    className="px-4 py-2 border rounded w-full"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500">Score (%)</label>
                  <input
                    type="number"
                    value={result.score}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "score",
                        parseInt(e.target.value)
                      )
                    }
                    placeholder="Score"
                    className="px-4 py-2 border rounded w-full"
                    min={0}
                    max={100}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500">Comment</label>
                  <input
                    type="text"
                    value={result.comment}
                    onChange={(e) =>
                      handleInputChange(index, "comment", e.target.value)
                    }
                    placeholder="Optional comment"
                    className="px-4 py-2 border rounded w-full"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => handleRemoveRow(index)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-2"
                  >
                    <FiTrash2 /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={handleAddRow}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded flex items-center gap-2"
            >
              <FiPlus /> Add Student
            </button>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded flex items-center gap-2"
            >
              <FiUpload /> Upload Results
            </button>
          </div>
        </form>
      </div>
    </TeacherLayout>
  );
}

"use client";
import { useState } from "react";
import StudentLayout from "../_components/StudentLayout";
import { motion } from "framer-motion";
import { FaFilter, FaTimes } from "react-icons/fa";
import { BiUpload } from "react-icons/bi";

const assignmentsData = [
  {
    id: "a1",
    title: "Math Homework 1",
    subject: "Mathematics",
    dueDate: "2025-07-25",
    status: "Ongoing",
    description: "Solve all exercises from page 12 to 18 in the textbook.",
    fileUrl: "/files/expense.docx",
  },
  {
    id: "a2",
    title: "Essay on Shakespeare",
    subject: "English Literature",
    dueDate: "2025-07-20",
    status: "Submitted",
    description: "Write an essay analyzing Hamlet's internal conflict.",
    fileUrl: "/files/hamlet-essay-guidelines.pdf",
  },
  {
    id: "a3",
    title: "Periodic Table Worksheet",
    subject: "Science",
    dueDate: "2025-07-15",
    status: "Overdue",
    description: "Complete the worksheet on atomic structures.",
    fileUrl: "/files/chemistry-worksheet.pdf",
  },
];

export default function AssignmentsPage() {
  const [filterStatus, setFilterStatus] = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const [file, setFile] = useState(null);
  const [comment, setComment] = useState("");

  const filteredAssignments = assignmentsData.filter((a) => {
    return (
      (filterStatus === "" || a.status === filterStatus) &&
      (filterSubject === "" || a.subject === filterSubject)
    );
  });

  const getTimeLeft = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diff = due - now;

    if (diff <= 0) return "⏰ Overdue";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `🕒 ${days} day(s) left`;
  };

  const openModal = (assignment) => {
    setSelectedAssignment(assignment);
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle upload logic here
    console.log("Submitting:", {
      assignmentId: selectedAssignment?.id,
      file,
      comment,
    });
    setModalOpen(false);
    setFile(null);
    setComment("");
  };

  return (
    <StudentLayout>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                📚 Assignments
              </h1>
              <p className="text-gray-500">
                Track, submit and manage your assignments
              </p>
            </div>

            <div className="flex gap-3 items-center">
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="p-2 border rounded-md"
              >
                <option value="">All Subjects</option>
                {[...new Set(assignmentsData.map((a) => a.subject))].map(
                  (sub) => (
                    <option key={sub}>{sub}</option>
                  )
                )}
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="p-2 border rounded-md"
              >
                <option value="">All Statuses</option>
                <option>Ongoing</option>
                <option>Submitted</option>
                <option>Overdue</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700">
            {filteredAssignments.map((a) => (
              <motion.div
                key={a.id}
                className="bg-white rounded-lg p-5 shadow hover:shadow-md transition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-semibold">{a.title}</h2>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      a.status === "Ongoing"
                        ? "bg-yellow-100 text-yellow-800"
                        : a.status === "Submitted"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {a.status}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-1 font-semibold">
                  📘 {a.subject}
                </p>
                <p className="text-sm text-gray-600 mb-2">{a.description}</p>

                <a
                  href={a.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mb-2 text-blue-600 text-sm hover:underline"
                >
                  📄 View/Download Assignment
                </a>

                <p className="text-sm">{getTimeLeft(a.dueDate)}</p>

                {a.status === "Ongoing" && (
                  <button
                    onClick={() => openModal(a)}
                    className="mt-3 w-full bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition"
                  >
                    📤 Submit Assignment
                  </button>
                )}
              </motion.div>
            ))}
          </div>

          {filteredAssignments.length === 0 && (
            <p className="text-gray-500 text-center mt-12">
              No assignments found.
            </p>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative"
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setModalOpen(false)}
            >
              <FaTimes />
            </button>
            <h3 className="text-xl font-semibold mb-4">
              📤 Submit: {selectedAssignment?.title}
            </h3>

            <form onSubmit={handleSubmit}>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Upload File
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.png"
                required
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full border p-2 rounded mb-4"
              />

              <label className="block mb-2 text-sm font-medium text-gray-700">
                Comment
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border p-2 rounded mb-4"
                placeholder="Add any notes or comments..."
              ></textarea>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                <BiUpload className="inline mr-1" /> Submit Assignment
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </StudentLayout>
  );
}

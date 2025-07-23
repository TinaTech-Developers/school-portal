"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import StudentLayout from "../_components/StudentLayout";
import { FaFlag, FaCheckCircle, FaClock } from "react-icons/fa";

const reportsData = [
  {
    id: 1,
    subject: "Mathematics",
    message: "I didn’t understand today's classwork on algebra.",
    status: "Pending",
    reply: "",
    date: "2025-07-10",
  },
  {
    id: 2,
    subject: "Science",
    message: "Can I get more resources on photosynthesis?",
    status: "Replied",
    reply: "Yes, please check the learning materials section.",
    date: "2025-07-08",
  },
];

export default function StudentReportsPage() {
  return (
    <StudentLayout>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <FaFlag className="text-blue-500" /> Reports & Feedback
            </h1>
            <p className="text-gray-500">
              View responses and feedback from your teachers
            </p>
          </div>

          <div className="space-y-4">
            {reportsData.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Subject: {item.subject}
                    </h2>
                    <p className="text-sm mt-1 text-gray-600">
                      <strong>Message:</strong> {item.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Date: {item.date}
                    </p>

                    {item.reply && (
                      <p className="text-sm mt-2 text-green-700 bg-green-50 p-2 rounded">
                        <strong>Teacher Reply:</strong> {item.reply}
                      </p>
                    )}
                  </div>

                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      item.status === "Replied"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {item.status === "Replied" ? (
                      <FaCheckCircle className="inline mr-1" />
                    ) : (
                      <FaClock className="inline mr-1" />
                    )}
                    {item.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}

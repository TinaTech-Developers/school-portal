"use client";
import { useEffect, useState } from "react";
import TeacherLayout from "../../components/TeacherLayout";

export default function FeedbackReportsPage() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      const res = await fetch("/api/feedback");
      const data = await res.json();
      setFeedbacks(data);
    };
    fetchFeedback();
  }, []);

  return (
    <TeacherLayout>
      <div className="max-w-4xl mx-auto p-6 text-gray-700">
        <h1 className="text-2xl font-bold text-purple-700 mb-6">
          📄 Feedback & Reports
        </h1>

        {feedbacks.length === 0 ? (
          <p className="text-gray-500">No feedback or reports submitted yet.</p>
        ) : (
          <div className="space-y-4">
            {feedbacks.map((f) => (
              <div key={f.id} className="bg-white border rounded shadow p-4">
                <h3 className="text-lg font-semibold text-purple-800">
                  {f.subject}
                </h3>
                <p className="text-gray-700">{f.message}</p>
                <div className="text-sm text-gray-500 mt-2">
                  Submitted by {f.senderName} on{" "}
                  {new Date(f.date).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </TeacherLayout>
  );
}

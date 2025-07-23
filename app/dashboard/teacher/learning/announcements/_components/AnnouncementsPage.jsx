"use client";
import { useState, useEffect } from "react";

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [form, setForm] = useState({ title: "", message: "" });

  const fetchAnnouncements = async () => {
    const res = await fetch("/api/announcements");
    const data = await res.json();
    setAnnouncements(data);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/announcements", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });
    setForm({ title: "", message: "" });
    fetchAnnouncements();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-700">
      <h1 className="text-2xl font-bold text-purple-700 mb-6">
        📢 Announcements
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-5 rounded shadow mb-8"
      >
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          placeholder="Message"
          rows="4"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Post Announcement
        </button>
      </form>

      <div className="space-y-4">
        {announcements.map((a) => (
          <div key={a.id} className="bg-purple-50 p-4 rounded shadow">
            <h3 className="font-bold text-purple-800">{a.title}</h3>
            <p>{a.message}</p>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(a.date).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

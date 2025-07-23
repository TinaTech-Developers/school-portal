"use client";
import { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

export default function UploadNotesPage() {
  const [notes, setNotes] = useState({
    title: "",
    subject: "",
    subjectId: "",
    description: "",
    file: null,
  });

  const handleChange = (e) => {
    setNotes({ ...notes, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setNotes({ ...notes, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to MongoDB or backend
    console.log("Uploading notes:", notes);
    alert("Notes uploaded successfully!");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-purple-700 mb-4">
        Upload Learning Material
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-6 border"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes Title
          </label>
          <input
            type="text"
            name="title"
            value={notes.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <select
            name="subject"
            value={notes.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select Subject</option>
            <option value="mathematics">Mathematics</option>
            <option value="science">Science</option>
            <option value="english">English</option>
            <option value="ict">ICT</option>
            {/* Replace with dynamic subjects if needed */}
          </select>
        </div>

        {/* Subject ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject ID
          </label>
          <input
            type="text"
            name="subjectId"
            value={notes.subjectId}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
            placeholder="e.g. MATH101"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={notes.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
            placeholder="Brief notes summary or instructions"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Notes File
          </label>
          <label className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-purple-400 text-purple-700 bg-purple-50 rounded-md cursor-pointer hover:bg-purple-100 transition">
            <FiUploadCloud className="text-xl" />
            <span>
              {notes.file ? notes.file.name : "Choose file (PDF, DOCX, PPT)"}
            </span>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.ppt,.pptx"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition"
          >
            Upload Notes
          </button>
        </div>
      </form>
    </div>
  );
}

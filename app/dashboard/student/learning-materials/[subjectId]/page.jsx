"use client";
import { useParams } from "next/navigation";
import { FaDownload } from "react-icons/fa";
import StudentLayout from "../../_components/StudentLayout";

const materialsBySubject = {
  mathematics: {
    name: "Mathematics",
    materials: [
      {
        title: "Algebra Basics Notes",
        url: "/materials/algebra.pdf",
        type: "PDF",
        uploaded: "2025-07-10",
      },
    ],
  },
  english: {
    name: "English",
    materials: [
      {
        title: "Literature Summary - Hamlet",
        url: "/materials/hamlet-summary.pdf",
        type: "PDF",
        uploaded: "2025-07-11",
      },
    ],
  },
  science: {
    name: "Science",
    materials: [
      {
        title: "Periodic Table Chart",
        url: "/materials/periodic-table.jpg",
        type: "Image",
        uploaded: "2025-07-11",
      },
    ],
  },
  history: {
    name: "History",
    materials: [
      {
        title: "World War II Notes",
        url: "/materials/ww2-notes.pdf",
        type: "PDF",
        uploaded: "2025-07-12",
      },
    ],
  },
};

export default function SubjectMaterialsPage() {
  const { subjectId } = useParams();
  const subjectData = materialsBySubject[subjectId];

  if (!subjectData) {
    return (
      <StudentLayout>
        <div className="p-6 text-center text-red-500 font-semibold">
          Subject not found.
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            📘 {subjectData.name} - Learning Materials
          </h1>

          <div className="space-y-4">
            {subjectData.materials.map((file, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-4 shadow flex items-center justify-between hover:shadow-md transition"
              >
                <div>
                  <h2 className="font-medium text-gray-800">{file.title}</h2>
                  <p className="text-sm text-gray-500">
                    Type: {file.type} • Uploaded: {file.uploaded}
                  </p>
                </div>
                <div className="flex gap-4">
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline text-sm"
                  >
                    View
                  </a>
                  <a
                    href={file.url}
                    download
                    className="text-sm bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-green-700 transition"
                  >
                    <FaDownload />
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}

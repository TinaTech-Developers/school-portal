"use client";

import { useState, useEffect } from "react";
import {
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiUpload,
  FiDownload,
  FiX,
} from "react-icons/fi";
import AdminLayout from "../components/AdminLayout";

export default function ManageTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);

  // Modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingTeacher, setDeletingTeacher] = useState(null);

  // For dropdown expand/collapse (optional)
  const [openSubjectsDropdown, setOpenSubjectsDropdown] = useState({});
  const [openClassesDropdown, setOpenClassesDropdown] = useState({});

  const filteredTeachers = Array.isArray(teachers)
    ? teachers.filter((t) =>
        t.userId?.name?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/admin/teacher", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error("Failed to fetch teachers");

        const data = await res.json();

        if (Array.isArray(data)) {
          setTeachers(data);
        } else if (Array.isArray(data.teachers)) {
          setTeachers(data.teachers);
        } else {
          setTeachers([]);
        }
      } catch (err) {
        alert("Failed to fetch teachers. Please try again later.");
      }
    };

    fetchData();
  }, []);

  // Open edit modal
  function openEditModal(teacher) {
    setEditingTeacher(teacher);
    setIsEditModalOpen(true);
  }

  // Close edit modal
  function closeEditModal() {
    setEditingTeacher(null);
    setIsEditModalOpen(false);
  }

  // Open delete modal
  function openDeleteModal(teacher) {
    setDeletingTeacher(teacher);
    setIsDeleteModalOpen(true);
  }

  // Close delete modal
  function closeDeleteModal() {
    setDeletingTeacher(null);
    setIsDeleteModalOpen(false);
  }

  // Handle edit form submit
  async function handleEditSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const updatedTeacher = {
      name: form.name.value,
      subjects: form.subjects.value.split(",").map((s) => s.trim()),
      assignedClasses: form.classes.value.split(",").map((c) => c.trim()),
      status: form.status.value,
    };

    try {
      const res = await fetch(`/api/admin/teacher/${editingTeacher._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTeacher),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to update teacher.");
      }

      // Update the teacher in the local state
      setTeachers((prev) =>
        prev.map((t) => (t._id === editingTeacher._id ? { ...t, ...data } : t))
      );

      closeEditModal();
    } catch (error) {
      console.error("Edit failed:", error.message);
      alert("Update failed. Please try again.");
    }
  }

  async function handleDelete() {
    if (!deletingTeacher) return;

    try {
      const res = await fetch(`/api/admin/teacher/${deletingTeacher._id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      setTeachers((prev) => prev.filter((t) => t._id !== deletingTeacher._id));
      setSelected((prev) => prev.filter((id) => id !== deletingTeacher._id));
      closeDeleteModal();
    } catch (error) {
      alert("Delete failed. Please try again.");
    }
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Manage Teachers</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            <FiPlus /> Add Teacher
          </button>
          <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            <FiUpload /> Import CSV
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
            <FiDownload /> Export
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 text-gray-700 mt-4 mb-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            className="w-full px-4 py-2 border rounded pl-10"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
        </div>

        <select className="px-4 py-2 border rounded">
          <option>All Subjects</option>
          <option>Math</option>
          <option>Science</option>
          <option>English</option>
        </select>

        <select className="px-4 py-2 border rounded">
          <option>Status: All</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {filteredTeachers.length > 0 && (
        <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 rounded text-sm text-yellow-800">
          {selected.length} teacher(s) selected.{" "}
          <button className="underline ml-2">Bulk Activate</button>{" "}
          <button className="underline ml-2">Bulk Delete</button>
        </div>
      )}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white border shadow rounded-lg">
          <thead className="bg-gray-600 text-left text-white text-sm">
            <tr>
              <th className="px-4 py-3 border-b">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    const allIds = filteredTeachers.map((t) => t._id);
                    setSelected(e.target.checked ? allIds : []);
                  }}
                  checked={
                    selected.length > 0 &&
                    selected.length === filteredTeachers.length
                  }
                />
              </th>
              <th className="px-4 py-3 border-b">ID</th>
              <th className="px-4 py-3 border-b">Name</th>
              <th className="px-4 py-3 border-b">Subjects</th>
              <th className="px-4 py-3 border-b">Classes</th>
              <th className="px-4 py-3 border-b">Status</th>
              <th className="px-4 py-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeachers.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No teachers found.
                </td>
              </tr>
            )}
            {filteredTeachers.map((teacher) => (
              <tr
                key={teacher._id}
                className="hover:bg-gray-50 text-gray-700 text-sm"
              >
                <td className="px-4 py-3 border-b">
                  <input
                    type="checkbox"
                    checked={selected.includes(teacher._id)}
                    onChange={() => toggleSelect(teacher._id)}
                  />
                </td>
                <td className="px-4 py-3 border-b">{teacher.employeeId}</td>
                <td className="px-4 py-3 border-b">{teacher.userId?.name}</td>
                <td className="px-4 py-3 border-b">
                  {/* Subjects dropdown */}
                  <div className="relative inline-block text-left">
                    <button
                      onClick={() =>
                        setOpenSubjectsDropdown((prev) => ({
                          ...prev,
                          [teacher._id]: !prev[teacher._id],
                        }))
                      }
                      className="border rounded px-2 py-1 text-sm bg-gray-100 hover:bg-gray-200"
                    >
                      {teacher.subjects?.length} subject
                      {teacher.subjects?.length !== 1 ? "s" : ""}
                    </button>
                    {openSubjectsDropdown[teacher._id] && (
                      <ul className="absolute mt-1 bg-white border rounded shadow max-h-48 overflow-auto z-10 w-40">
                        {teacher.subjects?.map((subj, i) => (
                          <li
                            key={i}
                            className="px-3 py-1 hover:bg-gray-100 cursor-default"
                          >
                            {subj}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 border-b">
                  {/* Classes dropdown */}
                  <div className="relative inline-block text-left">
                    <button
                      onClick={() =>
                        setOpenClassesDropdown((prev) => ({
                          ...prev,
                          [teacher._id]: !prev[teacher._id],
                        }))
                      }
                      className="border rounded px-2 py-1 text-sm bg-gray-100 hover:bg-gray-200"
                    >
                      {teacher.assignedClasses?.length} class
                      {teacher.assignedClasses?.length !== 1 ? "es" : ""}
                    </button>
                    {openClassesDropdown[teacher._id] && (
                      <ul className="absolute mt-1 bg-white border rounded shadow max-h-48 overflow-auto z-10 w-40">
                        {teacher.assignedClasses?.map((cls, i) => (
                          <li
                            key={i}
                            className="px-3 py-1 hover:bg-gray-100 cursor-default"
                          >
                            {cls}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 border-b">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
                      teacher.status === "Active"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {teacher.status || "Active"}
                  </span>
                </td>
                <td className="px-4 py-3 pb-4 border-b flex gap-3">
                  <button
                    onClick={() => openEditModal(teacher)}
                    className="text-blue-600 hover:underline text-sm flex items-center gap-2 "
                  >
                    <FiEdit2 /> Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(teacher)}
                    className="text-red-600 hover:underline text-sm flex items-center gap-2 "
                  >
                    <FiTrash2 /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && editingTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-gray-700">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
            <button
              onClick={closeEditModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              aria-label="Close edit modal"
            >
              <FiX size={24} />
            </button>
            <h2 className="text-xl font-bold mb-4">Edit Teacher</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  name="name"
                  type="text"
                  defaultValue={editingTeacher.userId?.name || ""}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Subjects</label>
                <input
                  name="subjects"
                  type="text"
                  defaultValue={editingTeacher.subjects?.join(", ") || ""}
                  placeholder="Comma separated"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Classes</label>
                <input
                  name="classes"
                  type="text"
                  defaultValue={
                    editingTeacher.assignedClasses?.join(", ") || ""
                  }
                  placeholder="Comma separated"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Status</label>
                <select
                  name="status"
                  defaultValue={editingTeacher.status || "Active"}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && deletingTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-5 flex items-center justify-center z-50 text-gray-700">
          <div className="bg-white rounded-lg w-full max-w-sm p-6 relative">
            <button
              onClick={closeDeleteModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              aria-label="Close delete modal"
            >
              <FiX size={24} />
            </button>
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>
              Are you sure you want to delete{" "}
              <strong>{deletingTeacher.userId?.name}</strong>?
            </p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

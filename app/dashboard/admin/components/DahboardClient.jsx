"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

export default function DashboardClient({ user }) {
  const [activeModal, setActiveModal] = useState("");

  const openModal = (type) => setActiveModal(type);
  const closeModal = () => setActiveModal("");

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Students"
          apiEndpoint={"/api/admin/students"}
          color="blue"
        />
        <DashboardCard
          title="Total Teachers"
          apiEndpoint={"/api/admin/teacher"}
          color="purple"
        />
        <DashboardCard
          title="Pending Approvals"
          apiEndpoint={"/api/admin/students"}
          color="red"
        />
        <DashboardCard
          title="Total Results"
          apiEndpoint={"/api/admin/students"}
          color="green"
        />
      </div>

      {/* Pass Rate Stats */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          Pass Rate Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <PassRate title="Form 4" percent={85} />
          <PassRate title="Form 3" percent={72} />
          <PassRate title="Form 2" percent={93} />
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          <ActionButton label="Create User" onClick={() => openModal("user")} />
          <ActionButton
            label="Add Student"
            onClick={() => openModal("student")}
          />
          <ActionButton
            label="Add Teacher"
            onClick={() => openModal("teacher")}
          />
          <ActionButton label="Create Term" onClick={() => openModal("term")} />
          <ActionButton
            label="Upload Results"
            onClick={() => openModal("results")}
          />
          <ActionButton
            label="Announcements"
            onClick={() => openModal("announcements")}
          />
          <ActionButton
            label="Add Subject"
            onClick={() => openModal("subject")}
          />
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          Recent Activity
        </h2>
        <div className="bg-white rounded-lg shadow p-4 space-y-2">
          <ActivityItem text="📌 10 new students registered (Form 2)" />
          <ActivityItem text="📤 Mr. Phiri uploaded results for Form 4A" />
          <ActivityItem text="👤 New teacher added: Jane Mutasa (Maths)" />
        </div>
      </section>

      {/* Alerts */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          System Alerts
        </h2>
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded">
          ⚠️ Term 2 ends in 3 days. Ensure all results are uploaded.
        </div>
      </section>

      {/* Modals */}
      {activeModal && <OverlayModal type={activeModal} onClose={closeModal} />}
    </div>
  );
}

// Pass Rate Circular Chart
function PassRate({ title, percent }) {
  const radius = 60;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <motion.div
      className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <motion.circle
          stroke="#3b82f6"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2 }}
        />
      </svg>
      <div className="text-center mt-3">
        <p className="text-xl font-bold text-blue-600">{percent}%</p>
        <p className="text-sm text-gray-500">{title} Pass Rate</p>
      </div>
    </motion.div>
  );
}

function OverlayModal({ type, onClose }) {
  const titles = {
    user: "Create New User",
    student: "Create A New Student",
    teacher: "Create A New Teacher",
    term: "Create Term",
    results: "Upload Results",
    announcements: " Create Announcement",
    subject: "Add Subject",
  };

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
      <motion.div
        className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 space-y-4 max-h-[80vh] overflow-y-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-semibold text-gray-900">
            {titles[type]}
          </h2>
          <button
            onClick={onClose}
            className="hover:text-red-600 text-2xl leading-none text-red-600"
          >
            &times;
          </button>
        </div>
        {type === "user" && <UserForm onClose={onClose} />}

        {type === "student" && <StudentForm onClose={onClose} />}

        {type === "teacher" && <TeacherForm onClose={onClose} />}

        {type === "term" && <TermForm onClose={onClose} />}

        {type === "results" && <ResultsForm onClose={onClose} />}

        {type === "announcements" && <AnnouncementsForm onClose={onClose} />}

        {type === "subject" && <SubjectForm onClose={onClose} />}
      </motion.div>
    </div>
  );
}

function UserForm({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, multiple } = e.target;

    if (multiple) {
      const values = Array.from(e.target.selectedOptions, (opt) => opt.value);
      setForm((prev) => ({ ...prev, [name]: values }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to register teacher");

      setMessage("✅ Teacher created successfully!");
      onClose?.();
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 space-y-4 bg-white rounded shadow-md max-w-md mx-auto text-gray-800"
    >
      {/* <h2 className="text-xl font-semibold">Create New User</h2> */}

      {message && <div className="text-sm text-red-500">{message}</div>}
      <input
        name="name"
        type="text"
        value={form.name}
        onChange={handleChange}
        placeholder="fullname"
        className="w-full p-2 border rounded"
      />

      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="eg. example@gmail.com"
        className="w-full p-2 border rounded"
      />

      <input
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="*********"
        className="w-full p-2 border rounded"
      />
      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="teacher">Teacher</option>
        <option value="student">Student</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        {loading ? "Submitting..." : "Create User"}
      </button>
    </form>
  );
}

function TeacherForm({ onClose }) {
  const [form, setForm] = useState({
    userId: "",
    department: "",
    subjects: [],
    assignedClasses: [],
    phone: "",
    address: "",
    profilePicture: "",
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/get-users");
      const data = await res.json();
      const teacherUsers = data.filter((user) => user.role === "teacher");
      setUsers(teacherUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, multiple } = e.target;

    if (multiple) {
      const values = Array.from(e.target.selectedOptions, (opt) => opt.value);
      setForm((prev) => ({ ...prev, [name]: values }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to register teacher");

      setMessage("✅ Teacher created successfully!");
      onClose?.();
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 space-y-4 bg-white rounded shadow-md max-w-md mx-auto text-gray-800"
    >
      {/* <h2 className="text-xl font-semibold">Register New Teacher</h2> */}

      {message && <div className="text-sm text-red-500">{message}</div>}

      {/* User selection */}
      <select
        name="userId"
        value={form.userId}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      >
        <option value="">Select linked user</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name || user.email}
          </option>
        ))}
      </select>

      {/* Department */}
      <input
        name="department"
        value={form.department}
        onChange={handleChange}
        placeholder="Department"
        className="w-full p-2 border rounded"
      />

      {/* Subjects */}
      <select
        name="subjects"
        value={form.subjects}
        onChange={handleChange}
        multiple
        className="w-full p-2 border rounded"
      >
        <option value="Mathematics">Mathematics</option>
        <option value="English">English</option>
        <option value="Biology">Biology</option>
        <option value="Chemistry">Chemistry</option>
        <option value="Geography">Geography</option>
      </select>

      {/* Assigned Classes */}
      <select
        name="assignedClasses"
        value={form.assignedClasses}
        onChange={handleChange}
        multiple
        className="w-full p-2 border rounded"
      >
        <option value="Form 1">Form 1</option>
        <option value="Form 2">Form 2</option>
        <option value="Form 3">Form 3</option>
        <option value="Form 4">Form 4</option>
        <option value="A Level">A Level</option>
      </select>

      {/* Phone */}
      <input
        name="phone"
        type="tel"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone number"
        className="w-full p-2 border rounded"
      />

      {/* Address */}
      <input
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Address"
        className="w-full p-2 border rounded"
      />

      {/* Profile Picture URL */}
      <input
        name="profilePicture"
        value={form.profilePicture}
        onChange={handleChange}
        placeholder="Profile picture URL"
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        {loading ? "Submitting..." : "Register Teacher"}
      </button>
    </form>
  );
}

function TermForm({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    year: new Date().getFullYear(),
    startDate: "",
    endDate: "",
    isCurrent: false,
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/term", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create term");

      setMessage("✅ Term created successfully.");
      setForm({
        name: "",
        year: new Date().getFullYear(),
        startDate: "",
        endDate: "",
        isCurrent: false,
        notes: "",
      });
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-gray-800">
      <input
        name="name"
        placeholder="Term Name (e.g., Term 1)"
        value={form.name}
        onChange={handleChange}
        required
        className="border p-2 rounded w-full"
      />
      <input
        name="year"
        type="number"
        placeholder="e.g. 2025"
        value={form.year}
        onChange={handleChange}
        required
        className="border p-2 rounded w-full"
      />
      <input
        name="startDate"
        type="date"
        value={form.startDate}
        onChange={handleChange}
        required
        className="border p-2 rounded w-full"
      />
      <input
        name="endDate"
        type="date"
        value={form.endDate}
        onChange={handleChange}
        required
        className="border p-2 rounded w-full"
      />
      <textarea
        name="notes"
        placeholder="Optional notes about the term"
        value={form.notes}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="isCurrent"
          checked={form.isCurrent}
          onChange={handleChange}
        />
        <span>Mark as current term</span>
      </label>
      {message && <p className="text-sm text-gray-600">{message}</p>}
      <div className="text-right space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {loading ? "Creating..." : "Create Term"}
        </button>
      </div>
    </form>
  );
}

function ResultsForm({ onClose }) {
  return (
    <div>
      {/* You can build this form as needed */}
      <p className="text-gray-600">Upload results functionality coming soon.</p>
      <div className="text-right">
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function AnnouncementsForm({ onClose }) {
  const { data: session } = useSession();
  const [message, setMessage] = useState("");
  const [loading, setLoadin] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    audience: "all",
    startDate: "",
    endDate: "",
    isImportant: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAnnouncement = {
      ...formData,
      postedBy: session?.user?.id, // using logged-in user ID
    };

    try {
      const res = await fetch("/api/admin/announcement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAnnouncement),
      });

      const data = await res.json();
      setMessage("✅ Announcement created successfully.");
      console.log("✅ Announcement saved:", data);
      onClose();
    } catch (err) {
      // setMessage
      console.error("❌ Failed to post announcement:", err);
    }
  };

  return (
    <>
      <h1 className="text-xl font-semibold text-gray-800">
        Create an Announcement
      </h1>
      <form onSubmit={handleSubmit} className="text-gray-800">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="border p-2 mb-2 w-full"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          rows="4"
          className="w-full border p-2 rounded"
          required
        ></textarea>

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 my-2">
          <label className="block">
            Audience:
            <select
              name="audience"
              value={formData.audience}
              onChange={handleChange}
              className="ml-2 border p-1 rounded"
            >
              <option value="all">All</option>
              <option value="students">Students</option>
              <option value="teachers">Teachers</option>
              <option value="parents">Parents</option>
            </select>
          </label>

          <label className="flex items-center gap-2 mt-2 sm:mt-0">
            <input
              type="checkbox"
              name="isImportant"
              checked={formData.isImportant}
              onChange={handleChange}
            />
            <span>Mark as important</span>
          </label>
        </div>

        <div className="flex gap-4">
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="w-1/2 border p-2 rounded"
          />
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            className="w-1/2 border p-2 rounded"
          />
        </div>

        {message && (
          <p className="text-sm font-medium text-blue-600">{message}</p>
        )}

        <div className="flex justify-between items-center pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Create Announcement"}
          </button>
        </div>
      </form>
    </>
  );
}

// function AnnouncementsForm({ onClose }) {
//   const { data: session } = useSession();
//   const [formData, setFormData] = useState({
//     title: "",
//     message: "",
//     audience: "all",
//     startDate: "",
//     endDate: "",
//     isImportant: false,
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newAnnouncement = {
//       ...formData,
//       postedBy: session?.user?.id, // ✅ use logged-in user ID
//     };

//     try {
//       const res = await fetch("/api/admin/announcements", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newAnnouncement),
//       });
//       const data = await res.json();
//       console.log("✅ Announcement saved:", data);
//       onClose();
//     } catch (err) {
//       console.error("❌ Failed:", err);
//     }
//   };

//   return (

//   );
// }

function StudentForm({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    admissionNumber: "",
    classLevel: "",
    stream: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    guardianName: "",
    guardianPhone: "",
    enrolledSubjects: "",
    profilePicture: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          enrolledSubjects: form.enrolledSubjects
            ? form.enrolledSubjects.split(",").map((s) => s.trim())
            : [],
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create student");

      setMessage("✅ Student registered successfully.");
      setForm({
        name: "",
        email: "",
        password: "",
        admissionNumber: "",
        classLevel: "",
        stream: "",
        dateOfBirth: "",
        gender: "",
        address: "",
        guardianName: "",
        guardianPhone: "",
        enrolledSubjects: "",
        profilePicture: "",
      });
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-h-[70vh] overflow-y-auto text-gray-800"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          name="admissionNumber"
          placeholder="Admission Number"
          value={form.admissionNumber}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          name="classLevel"
          placeholder="Class Level (e.g., Form 1)"
          value={form.classLevel}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          name="stream"
          placeholder="Stream (Optional)"
          value={form.stream}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="dateOfBirth"
          type="date"
          value={form.dateOfBirth}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="guardianName"
          placeholder="Guardian Name"
          value={form.guardianName}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="guardianPhone"
          placeholder="Guardian Phone"
          value={form.guardianPhone}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="profilePicture"
          placeholder="Profile Picture URL (optional)"
          value={form.profilePicture}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="enrolledSubjects"
          placeholder="Enrolled Subjects (comma separated)"
          value={form.enrolledSubjects}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>

      {message && <p className="text-sm text-gray-600">{message}</p>}

      <div className="text-right space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? "Registering..." : "Register Student"}
        </button>
      </div>
    </form>
  );
}

function SubjectForm({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    code: "",
    description: "",
    classLevels: "", // Changed from [] to a string
    teacherId: "",
    status: "Active",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const res = await fetch("/api/admin/get-users");
        const data = await res.json();
        const teacherUsers = data.filter((user) => user.role === "teacher");
        setTeachers(teacherUsers);
      } catch (err) {
        console.error("Failed to fetch teachers", err);
      }
    }
    fetchTeachers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/subject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create subject");

      setMessage("✅ Subject created successfully.");
      setForm({
        name: "",
        code: "",
        description: "",
        classLevels: "", // reset as string
        teacherId: "",
        status: "Active",
      });
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-gray-800">
      <input
        name="name"
        placeholder="Subject Name"
        value={form.name}
        onChange={handleChange}
        required
        className="border p-2 rounded w-full"
      />
      <input
        name="code"
        placeholder="Subject Code (e.g. MATH101)"
        value={form.code}
        onChange={handleChange}
        required
        className="border p-2 rounded w-full"
      />
      <textarea
        name="description"
        placeholder="Description (optional)"
        value={form.description}
        onChange={handleChange}
        className="border p-2 rounded w-full"
        rows={3}
      />
      <select
        name="classLevels"
        value={form.classLevels}
        onChange={handleChange}
        required
        className="border p-2 rounded w-full"
      >
        <option value="">Select Class Level</option>
        <option value="Form 1">Form 1</option>
        <option value="Form 2">Form 2</option>
        <option value="Form 3">Form 3</option>
        <option value="Form 4">Form 4</option>
        <option value="A-Level">A-Level</option>
      </select>
      <select
        name="teacherId"
        value={form.teacherId}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      >
        <option value="">Assign a Teacher (optional)</option>
        {teachers.map((teacher) => (
          <option key={teacher._id} value={teacher._id}>
            {teacher.name} ({teacher.email})
          </option>
        ))}
      </select>

      {message && <p className="text-sm text-gray-600">{message}</p>}

      <div className="text-right space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          {loading ? "Creating..." : "Create Subject"}
        </button>
      </div>
    </form>
  );
}

function DashboardCard({ title, apiEndpoint, color }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();

        // Count logic - assumes array response
        if (Array.isArray(data.students)) {
          setCount(data.students.length);
        } else if (Array.isArray(data.teachers)) {
          setCount(data.teachers.length);
        } else {
          setCount(data.length || 0);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setCount(0);
      }
    };

    fetchCount();
  }, [apiEndpoint]);

  const colorMap = {
    blue: "text-blue-700",
    purple: "text-purple-700",
    red: "text-red-600",
    green: "text-green-600",
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-sm font-medium text-gray-500 mb-1">{title}</h2>
      <p className={`text-2xl font-bold ${colorMap[color] || "text-gray-700"}`}>
        {count}
      </p>
    </motion.div>
  );
}

// Reusable button
function ActionButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
    >
      {label}
    </button>
  );
}

// Recent activity item
function ActivityItem({ text }) {
  return <p className="text-sm text-gray-600">{text}</p>;
}

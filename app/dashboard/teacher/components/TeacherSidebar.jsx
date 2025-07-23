"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronDown, FiChevronUp, FiBookOpen } from "react-icons/fi";

const links = [
  { name: "Dashboard", href: "/dashboard/teacher" },
  { name: "Manage Students", href: "/dashboard/teacher/students" },
  { name: "My Subjects", href: "/dashboard/teacher/subjects" },
  { name: "Enter Results", href: "/dashboard/teacher/results" },
  // { name: "Announcements", href: "/dashboard/teacher/announcements" },
  { name: "Settings", href: "/dashboard/teacher/settings" },
];

const materialsDropdown = [
  { name: "Notes", href: "/dashboard/teacher/learning/notes" },
  { name: "Assignments", href: "/dashboard/teacher/learning/assignments" },
  { name: "Announcements", href: "/dashboard/teacher/learning/announcements" },
  { name: "Feedback", href: "/dashboard/teacher/learning/feedback" },
  { name: "Slides", href: "/dashboard/teacher/learning/slides" },
];

export default function TeacherSidebar() {
  const pathname = usePathname();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <aside className="w-56 bg-white hidden md:flex flex-col justify-between shadow-lg border-r h-screen">
      <div>
        <div className="p-6 border-b">
          <h2 className="text-xl font-extrabold text-purple-700 tracking-tight">
            Teacher Panel
          </h2>
          <p className="text-sm text-gray-500">TinaSoft Nexus</p>
        </div>

        <nav className="p-6 space-y-3 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-2 py-2 rounded transition duration-200 ${
                pathname === link.href
                  ? "bg-purple-100 text-purple-700 font-semibold"
                  : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Dropdown */}
          <div className="mt-2">
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between w-full px-2 py-2 rounded transition duration-200 text-gray-700 hover:text-purple-600 hover:bg-purple-50"
            >
              <span className="flex items-center gap-2 font-medium">
                <FiBookOpen className="text-lg" />
                Learning Materials
              </span>
              {isDropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isDropdownOpen ? "max-h-40 mt-2" : "max-h-0"
              }`}
            >
              <div className="pl-6 space-y-2">
                {materialsDropdown.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block text-gray-600 hover:text-purple-600 transition ${
                      pathname === item.href
                        ? "text-purple-700 font-semibold"
                        : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div className="p-6 border-t">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

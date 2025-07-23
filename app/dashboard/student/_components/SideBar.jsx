"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get current route

  const navLinks = [
    ["Dashboard", "/dashboard/student"],
    ["View Results", "/dashboard/student/results"],
    ["My Subjects", "/dashboard/student/subjects"],
    ["Assignments", "/dashboard/student/assignments"],
    ["Learning Materials", "/dashboard/student/learning-materials"],
    ["Announcements", "/dashboard/student/announcements"],
    ["Feedback & Reports", "/dashboard/student/feedback"],
    ["School News ", "/dashboard/student/news"],
    ["Profile", "/dashboard/student/profile"],
  ];

  return (
    <>
      {/* Mobile toggle */}
      <div className="md:hidden px-4 py-2 bg-white shadow flex justify-between items-center">
        <h2 className="text-lg font-bold text-green-700">Student Portal</h2>
        <button onClick={() => setIsOpen(!isOpen)}>
          <FaBars className="text-xl text-green-600" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-56 bg-white shadow-lg transform md:translate-x-0 transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:block`}
      >
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-green-700">Student Portal</h2>
          <p className="text-sm text-gray-500">Welcome to TinaSoft Nexus</p>
        </div>

        <nav className="p-6 space-y-4">
          {navLinks.map(([label, link]) => {
            const isActive = pathname === link;
            return (
              <Link href={link} key={label}>
                <span
                  className={`block font-medium cursor-pointer transition duration-200 rounded px-2 py-1 ${
                    isActive
                      ? "text-white bg-green-600"
                      : "text-gray-700 hover:text-green-600 focus:text-green-600"
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export default SideBar;

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Dashboard", href: "/dashboard/admin" },
  { name: "Manage Students", href: "/dashboard/admin/students" },
  { name: "Manage Teachers", href: "/dashboard/admin/teachers" },
  { name: "View Results", href: "/dashboard/admin/results" },
  { name: "Settings", href: "/dashboard/admin/settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white  hidden md:block">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-blue-700">Admin Panel</h2>
        <p className="text-sm text-gray-500">TinaSoft Nexus</p>
      </div>

      <nav className="p-6 space-y-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block font-medium ${
              pathname === link.href
                ? "text-blue-700 font-semibold"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

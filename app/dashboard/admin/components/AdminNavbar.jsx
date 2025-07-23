"use client";
import { signOut, useSession } from "next-auth/react";

export default function AdminNavbar() {
  const { data: session } = useSession();

  return (
    <header className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">Admin Dashboard</h1>

      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">{session?.user?.email}</span>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

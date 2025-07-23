"use client";
import { signOut, useSession } from "next-auth/react";

export default function TeacherNavbar() {
  const { data: session } = useSession();

  return (
    <header className="w-full bg-white border py-1 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold text-purple-600">Admin Dashboard</h1>

      <div className="flex items-center space-x-4">
        <div className="mb-3">
          <h1 className="text-xl font-extrabold text-gray-800">
            Welcome, Teacher 👨‍🏫
          </h1>
          <p className="text-gray-500 mt-1">
            You are logged in as{" "}
            <span className="text-purple-600 font-semibold">
              {session?.user?.name}
            </span>
          </p>

          <span className="text-gray-500 text-xs">
            📅 {new Date().toDateString()}
          </span>
        </div>
      </div>
    </header>
  );
}

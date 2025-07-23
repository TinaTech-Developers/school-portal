"use client";
import { useSession } from "next-auth/react";
import React from "react";

function NavBar() {
  const { data: session } = useSession();

  return (
    <div className="px-4 py-4 bg-white shadow-b-md  w-full hidden md:block">
      <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800">
        Hello, Student 🎓
      </h1>
      <p className="text-gray-500 mt-1 text-sm md:text-base">
        You are logged in as{" "}
        <span className="text-green-600 font-semibold">
          {session?.user.email}
        </span>
      </p>
    </div>
  );
}

export default NavBar;

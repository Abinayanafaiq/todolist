"use client";

import react, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-500 bg-white/20 backdrop-blur-sm border-b border-white/30 shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-white drop-shadow-lg">
            ToDoApp
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          {/* Dekstop Menu Link */}
          <div className="hidden md:flex gap-6 items-center">
            <Link
              href={"/"}
              className="text-white hover:text-gray-200 transition"
            >
              Home muncul kalo gede
            </Link>
            <Link
              href={"/add-task"}
              className="text-white hover:text-gray-200 transition"
            >
              Add Task
            </Link>
            <Link
              href={"/my-task"}
              className="text-white hover:text-gray-200 transition"
            >
              My Task
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Links */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 bg-white/10 backdrop-blur-md">
          <Link
            href={"/"}
            className="text-white py-2 hover:bg-white/20 rounded transition"
          >
            Home
          </Link>
          <Link
            href={"/add-task"}
            className="text-white py-2 hover:bg-white/20 rounded transition"
          >
            Add Task
          </Link>
          <Link
            href={"/my-task"}
            className="text-white hover:bg-white/20 py-2 rounded transition"
          >
            My Task
          </Link>
        </div>
      )}
    </nav>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-100 shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-bold text-black">ToDoApp</div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          {/* Menu Links -Dekstop */}
          <div className="hidden md:flex gap-6 items-center text-black">
            <Link href={"/"} className="hover:underline text-black">
              Home
            </Link>
            <Link href={"my-task"} className="hover:underline text-black">
              My Task
            </Link>
            <Link href={"/add-task"} className="hover:underline text-black">
              Add Task
            </Link>
          </div>
        </div>
      </div>

      {/* Menu Links - Mobile */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 text-black">
          <Link href={"/"} onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href={"/my-task"} onClick={() => setIsOpen(false)}>
            My Task
          </Link>
          <Link href={"/add-task"} onClick={() => setIsOpen(false)}>
            Add Task
          </Link>
        </div>
      )}
    </nav>
  );
}

"use client";

import { useState } from "react";

export default function TodoForm() {
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ress = await fetch("/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ judul, deskripsi }),
    });

    if (ress.ok) {
      setJudul("");
      setDeskripsi("");
      alert("tugas sudah selesai");
    } else {
      alert("Gagal menambahkan tugas");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-semibold">Judul Tugas: </label>
        <input
          required
          type="text"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          className="border px-3 py-1 rounded w-full"
        />
      </div>
      <div>
        <label className="block font-semibold">Deskripsi Tugas: </label>
        <textarea
          required
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          className="border px-3 py-1 rounded w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Tambahkan Tugas
      </button>
    </form>
  );
}

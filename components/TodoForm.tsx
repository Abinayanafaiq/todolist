"use client";

import { useState } from "react";

export default function TodoForm() {
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ress = await fetch("/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ judul, deskripsi }),
    });

    setLoading(false);

    if (ress.ok) {
      setJudul("");
      setDeskripsi("");
      alert("tugas sudah selesai");
    } else {
      alert("Gagal menambahkan tugas");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded shadow-md"
    >
      <h2 className="text-xl font-bold text-gray-800">Tambah Tugas Baru</h2>
      <div>
        <label className="block font-medium text-gray-700 mb-1">
          Judul Tugas:{" "}
        </label>
        <input
          required
          type="text"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Contoh: Belajar NextJS"
        />
      </div>
      <div>
        <label className="block font-semibold">Deskripsi Tugas: </label>
        <textarea
          required
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Contoh Buat Form tambah todo dan simpan ke mongoDB"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 rounded text-white font-semibold ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Mengirim.." : "Tambahkan Tugas"}
      </button>
    </form>
  );
}

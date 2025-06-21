"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

type Todo = {
  _id: string;
  judul: string;
  deskripsi: string;
  createdAt: string;
};

export default function MyTask() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchTodos = async () => {
    setLoading(true);
    const res = await fetch("/api/todo");
    const data = await res.json();
    setTodos(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Yakin ingin menghapus task ini");
    if (!confirmed) return;

    setDeletingId(id);

    const res = await fetch(`/api/todo?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } else {
      alert("Gagal menghapus tugas");
    }

    setDeletingId(null);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">📋 My Task</h2>
      {loading ? (
        <p className="text-gray-500">Memuat daftar Tugas</p>
      ) : todos.length === 0 ? (
        <p className="text-gray-400 italic">
          Belum ada tugas yang di tambahkan
        </p>
      ) : (
        <ul className="space-y-4">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="bg-white p-4 rounded-xl shadow-md flex justify-between items-start"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {todo.judul}
                </h3>
                <p className="text-gray-700 mt-1">{todo.deskripsi}</p>
                <p className="text-sm text-gray-400 mt-2">
                  Dibuat: {new Date(todo.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(todo._id)}
                className="text-red-500 hover:text-red-700 transition"
                disabled={deletingId === todo._id}
                title="Hapus Tugas"
              >
                {deletingId === todo._id ? (
                  "Menghapus..."
                ) : (
                  <Trash2 size={20} />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

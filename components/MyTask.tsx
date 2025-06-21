"use client";

import { useEffect, useState } from "react";

type Todo = {
  _id: string;
  judul: string;
  deskripsi: string;
  createdAt: string;
};

export default function MyTask() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Yakin ingin menghapus task ini");
    if (!confirmed) return;

    const res = await fetch(`/api/todo?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } else {
      alert("Gagal menghapus tugas");
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch("/api/todo");
      const data = await res.json();
      setTodos(data);
    };

    fetchTodos();
  }, []);

  if (!todos) {
    return (
      <>
        <p>Loading.....</p>
      </>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">My Task</h2>
      {todos.length === 0 ? (
        <p>Belum ada tugas</p>
      ) : (
        <ul className="space-y-4">
          {todos.map((todo) => (
            <li key={todo._id} className="border p-4 rounded shadow">
              <div>
                <h3 className="text-lg font-semibold">{todo.judul}</h3>
                <p className="text-gray-700">{todo.deskripsi}</p>
                <p className="text-sm text-gray-400 mt-1">
                  Dibuat pada : {new Date(todo.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(todo._id)}
                className="ml-4 text-red-600 hover:underline"
              >
                Hapus
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

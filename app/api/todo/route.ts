import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectToDatabase from "@/lib/mongodb";

// bikin skema nya guys
const TodoSchema = new mongoose.Schema(
  {
    judul: String,
    deskripsi: String,
  },
  {
    timestamps: true,
  }
);

// ini supaya model ga ke-register dua kali
const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "id tidak ditemukan" }, { status: 400 });
  }

  try {
    await Todo.findByIdAndDelete(id);
    return NextResponse.json({ succes: true });
  } catch (error) {
    return NextResponse.json({ succces: false, error }, { status: 500 });
  }
}

export async function GET() {
  await connectToDatabase();
  const todos = await Todo.find().sort({ createdAt: -1 });
  return NextResponse.json(todos);
}

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const body = await req.json();
  try {
    const newTodo = new Todo({
      judul: body.judul,
      deskripsi: body.deskripsi,
    });

    await newTodo.save();
    return NextResponse.json({ succes: true });
  } catch (error) {
    return NextResponse.json({ succes: false, error }, { status: 500 });
  }
}

import mongoose from "mongoose";

let cached = global.mongoose || { conn: null, promise: null };

async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    if (!process.env.MONGODB_URI) {
      throw new Error("Mongo db uri ga ada bang");
    }
  }
  cached.promise = mongoose
    .connect(process.env.MONGODB_URI!)
    .then((mongoose) => mongoose);
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;

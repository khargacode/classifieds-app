import mongoose from "mongoose";

let isConnected = false;

export default async function dbConnect() {
  if (isConnected) return;

  if (!process.env.MONGODB_URI) {
    throw new Error("Missing MONGODB_URI");
  }

  await mongoose.connect(process.env.MONGODB_URI);
  isConnected = true;

  console.log("MongoDB Connected");
}

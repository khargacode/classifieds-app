import { connectDB } from "./db";
import Ad from "@/models/Ad";

export async function getAdById(id: string) {
  await connectDB();

  const ad = await Ad.findById(id);
  if (!ad) return null;

  return JSON.parse(JSON.stringify(ad));
}

export async function getAllAds() {
  await connectDB();
  const ads = await Ad.find().sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(ads));
}

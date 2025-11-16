import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Ad from "@/models/Ad";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  const { id } = await context.params; // 👈 IMPORTANT (params is async)

  const ad = await Ad.findById(id);
  if (!ad) return NextResponse.json({ error: "Ad not found" }, { status: 404 });

  return NextResponse.json(ad);
}

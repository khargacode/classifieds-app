import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Ad from "@/models/Ad";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const ad = await Ad.findById(params.id);
  return NextResponse.json(ad);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const body = await req.json();
  const updated = await Ad.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  await Ad.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}

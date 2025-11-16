import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Chat from "@/models/Chat";

export async function GET(req: Request) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const ad = searchParams.get("ad");
  const user = searchParams.get("user");

  const chat = await Chat.findOne({
    ad,
    participants: { $in: [user] },
  });

  return NextResponse.json(chat || {});
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();

  let chat = await Chat.findOne({
    ad: body.ad,
    participants: { $all: [body.sender, body.receiver] },
  });

  if (!chat) {
    chat = await Chat.create({
      ad: body.ad,
      participants: [body.sender, body.receiver],
      messages: [],
    });
  }

  chat.messages.push({
    sender: body.sender,
    message: body.message,
    timestamp: new Date(),
  });

  await chat.save();

  return NextResponse.json(chat);
}

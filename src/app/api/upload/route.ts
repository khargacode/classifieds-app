import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  const body = await req.formData();
  const file = body.get("file") as File;

  const buffer = Buffer.from(await file.arrayBuffer());

  const upload = await cloudinary.uploader.upload_stream({
    folder: "classifieds",
  });

  return new Promise((resolve) => {
    upload.end(buffer);
    upload.on("finish", () => {
      resolve(NextResponse.json(upload.response));
    });
  });
}

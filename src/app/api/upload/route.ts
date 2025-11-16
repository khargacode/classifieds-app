import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(
  request: NextRequest,
  context: { params: Promise<{}> }
) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "classifieds" }, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        })
        .end(buffer);
    });

    return NextResponse.json(uploadResponse);
  } catch (error) {
    return NextResponse.json(
      { error: "Upload failed", details: error },
      { status: 500 }
    );
  }
}

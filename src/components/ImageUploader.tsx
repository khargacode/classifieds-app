"use client";

import { useState } from "react";

interface Props {
  onUpload: (url: string) => void;
}

export default function ImageUploader({ onUpload }: Props) {
  const [uploading, setUploading] = useState(false);

  async function handleFile(e: any) {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append("file", file);

    setUploading(true);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    setUploading(false);

    onUpload(data.secure_url); // cloudinary returns secure_url
  }

  return (
    <div>
      <input type="file" onChange={handleFile} />

      {uploading && <p className="text-sm text-gray-500">Uploading…</p>}
    </div>
  );
}

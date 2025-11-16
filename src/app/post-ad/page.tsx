"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import ImageUploader from "@/components/ImageUploader";

export default function PostAdPage() {
  const { data: session } = useSession();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  if (!session) {
    return (
      <div className="p-5">
        <h1 className="text-xl font-semibold">Login required</h1>
        <button
          onClick={() => signIn()}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-3"
        >
          Login
        </button>
      </div>
    );
  }

  async function submitAd() {
    setLoading(true);

    const res = await fetch("/api/ads", {
      method: "POST",
      body: JSON.stringify({
        title,
        price,
        location,
        category,
        description,
        images,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (data._id) {
      window.location.href = `/ads/${data._id}`;
    }
  }

  return (
    <div className="max-w-xl mx-auto p-5 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Post an Ad</h1>

      <input
        className="border p-2 rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="border p-2 rounded"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        className="border p-2 rounded"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <input
        className="border p-2 rounded"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <textarea
        className="border p-2 rounded"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <ImageUploader
        onUpload={(url) => setImages((prev) => [...prev, url])}
      />

      {images.length > 0 && (
        <div className="flex gap-2 mt-2">
          {images.map((img, i) => (
            <img key={i} src={img} className="w-20 h-20 rounded object-cover" />
          ))}
        </div>
      )}

      <button
        onClick={submitAd}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Posting…" : "Post Ad"}
      </button>
    </div>
  );
}

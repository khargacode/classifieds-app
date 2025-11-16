"use client";
import Link from "next/link";

interface AdCardProps {
  ad: {
    _id: string;
    title: string;
    price: number;
    images: string[];
    location: string;
  };
}

export default function AdCard({ ad }: AdCardProps) {
  return (
    <Link
      href={`/ads/${ad._id}`}
      className="border rounded-lg p-3 flex flex-col gap-2 shadow-sm hover:shadow-md transition"
    >
      <img
        src={ad.images?.[0] || "/placeholder.jpg"}
        alt={ad.title}
        className="w-full h-40 object-cover rounded-md"
      />

      <h2 className="font-semibold text-lg">{ad.title}</h2>
      <p className="text-green-600 text-xl font-bold">₹{ad.price}</p>
      <p className="text-sm text-gray-500">{ad.location}</p>
    </Link>
  );
}

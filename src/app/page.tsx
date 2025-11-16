"use client";

import useSWR from "swr";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function HomePage() {
  const { data, error } = useSWR("/api/ads", fetcher);

  if (error) return <p>Failed to load ads</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Latest Listings</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.ads.map((ad: any) => (
          <Link
            key={ad._id}
            href={`/ads/${ad._id}`}
            className="border rounded-lg p-3 shadow-sm"
          >
            <img
              src={ad.images?.[0] || "/placeholder.png"}
              className="w-full h-32 object-cover rounded"
            />
            <h3 className="font-medium mt-2">{ad.title}</h3>
            <p className="text-green-600 font-semibold mt-1">₹{ad.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

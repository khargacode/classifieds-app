import { getAdById } from "@/lib/ads";
import Image from "next/image";

export default async function AdDetailPage({ params }: any) {
  const ad = await getAdById(params.id);

  if (!ad) return <p>Ad not found</p>;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-3">{ad.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <img
          src={ad.images?.[0] || "/placeholder.png"}
          className="rounded-lg w-full"
        />

        <div>
          <p className="text-2xl text-green-600 font-bold mb-3">₹{ad.price}</p>

          <p className="mb-3">{ad.description}</p>

          <p className="text-sm text-gray-500 mb-2">
            Category: {ad.category}
          </p>

          <p className="text-sm text-gray-500">
            Location: {ad.location}
          </p>
        </div>
      </div>
    </div>
  );
}

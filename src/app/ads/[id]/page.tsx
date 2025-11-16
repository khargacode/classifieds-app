import ChatBox from "@/components/ChatBox";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

async function getAd(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ads/${id}`);
  return res.json();
}

export default async function AdDetails({ params }: any) {
  const session = await getServerSession(authOptions);
  const ad = await getAd(params.id);

  return (
    <div className="max-w-3xl mx-auto p-5">

      <img
        src={ad.images?.[0] || "/placeholder.jpg"}
        className="w-full h-80 object-cover rounded"
      />

      <h1 className="text-3xl font-bold mt-4">{ad.title}</h1>
      <p className="text-2xl text-green-600">₹{ad.price}</p>

      <p className="text-gray-500 mt-2">{ad.location}</p>

      <p className="mt-4">{ad.description}</p>

      <hr className="my-5" />

      {session && (
        <ChatBox
          adId={ad._id}
          userId={session.user.id}
          otherUserId={ad.user}
        />
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AdCard from "@/components/AdCard";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [ads, setAds] = useState([]);

  useEffect(() => {
    if (!session) return;

    async function load() {
      const res = await fetch("/api/ads");
      const all = await res.json();

      const mine = all.filter((ad: any) => ad.user === session.user.id);
      setAds(mine);
    }
    load();
  }, [session]);

  if (!session) {
    return <p className="p-5">Please login to view dashboard</p>;
  }

  return (
    <div className="p-5 grid grid-cols-2 md:grid-cols-3 gap-4">
      {ads.map((ad: any) => (
        <AdCard key={ad._id} ad={ad} />
      ))}
    </div>
  );
}

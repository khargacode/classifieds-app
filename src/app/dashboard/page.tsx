"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AdCard from "@/components/AdCard";

const MyDashboardPage = () => {
  const { data: session, status } = useSession();
  const [ads, setAds] = useState([]);

  useEffect(() => {
    async function load() {
      // Wait for next-auth to finish loading
      if (status === "loading") return;

      // If user is NOT authenticated, stop here
      if (!session?.user?.id) {
        console.log("User not authenticated, skipping ad filter.");
        return;
      }

      const res = await fetch("/api/ads");
      const all = await res.json();

      // Safe access here — TS knows session.user.id exists
      const mine = all.filter((ad: any) => ad.user === session.user.id);
      setAds(mine);
    }

    load();
  }, [session, status]);

  // Show loading only while auth is being checked
  if (status === "loading") {
    return <p className="p-5">Loading...</p>;
  }

  // If user is not logged in
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
};

export default MyDashboardPage;

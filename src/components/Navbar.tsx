"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b py-3 bg-white">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          Classifieds
        </Link>

        <div className="flex gap-4">
          <Link href="/ads">Browse</Link>
          <Link href="/post-ad">Post Ad</Link>
          <Link href="/dashboard">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
}

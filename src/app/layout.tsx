import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Classifieds",
  description: "Buy & Sell Items Locally"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}

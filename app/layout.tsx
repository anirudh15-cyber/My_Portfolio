import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
export const metadata: Metadata = {
  title: "Anirudh Narang — Portfolio",
  description: "Welcome to my Portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}
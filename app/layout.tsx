import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anirudh Narang — Portfolio",
  description: "AI/ML Engineer portfolio of Anirudh Narang",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

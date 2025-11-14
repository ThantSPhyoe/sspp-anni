import type { Metadata } from "next";
import { Satisfy } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const satisfy = Satisfy({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-satisfy",
});

export const metadata: Metadata = {
  title: "! Year And 3 Months Anniversary Celebration",
  description: "A special celebration for my beloved on our anniversary.",
  icons: {
    icon: "/cover/ours-shadow.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${satisfy.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

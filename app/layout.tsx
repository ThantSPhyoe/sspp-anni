import type { Metadata } from "next";
import { Satisfy } from "next/font/google";
import "./globals.css";

const satisfy = Satisfy({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-satisfy",
});

export const metadata: Metadata = {
  title: "12th Anniversary Celebration",
  description: "A special celebration for my beloved on our 12th anniversary.",
  icons: {
    icon: "/cover/logo.jpg",
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
      </body>
    </html>
  );
}

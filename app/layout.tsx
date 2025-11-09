import type { Metadata } from "next";
import { Satisfy } from "next/font/google";
import "./globals.css";

const satisfy = Satisfy({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-satisfy",
});

export const metadata: Metadata = {
  title: "Happy birthday, Beautiful!",
  description: "A lovely birthday greeting page",
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

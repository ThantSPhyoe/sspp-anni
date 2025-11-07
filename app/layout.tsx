import type { Metadata } from "next";
import { Geist, Geist_Mono, Satisfy } from "next/font/google";
import "./globals.css";

const satisfy = Satisfy({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-satisfy",
})

export const metadata: Metadata = {
  title: "Happy birhthday, Beautiful!",
  description: "A lovely birthday greeting page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${satisfy.variable} ${satisfy.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

"use client";

import { motion } from "framer-motion";

export default function BeautifulMemories() {
  const images = [
    "https://www.pinterest.com/pin/999588079802216071/",
    "https://www.pinterest.com/pin/999588079802216071/",
    "https://www.pinterest.com/pin/999588079802216071/",
    "https://www.pinterest.com/pin/999588079802216071/",
    "https://www.pinterest.com/pin/999588079802216071/",
    "https://www.pinterest.com/pin/999588079802216071/",
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-pink-100 to-pink-200 flex flex-col items-center justify-center py-16 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-pink-400 text-2xl"
            initial={{ opacity: 0, y: 100, x: Math.random() * window.innerWidth }}
            animate={{ opacity: [0.5, 1, 0], y: -100 }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            ❤️
          </motion.span>
        ))}
      </div>
      <motion.h2
        className="font-satisfy text-5xl md:text-6xl text-pink-800 mb-12 relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Our <span className="text-pink-600">Beautiful</span> Memories
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 z-10">
        {images.map((src, i) => (
          <motion.div
            key={i}
            className="rounded-2xl overflow-hidden shadow-lg bg-white"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <img
              src={src}
              alt={`Memory ${i + 1}`}
              className="w-full h-64 object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

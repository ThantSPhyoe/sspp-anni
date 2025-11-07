"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export default function BeautifulMemories() {
  const images = [
    "https://www.pinterest.com/pin/999588079802216071/",
    "https://www.pinterest.com/pin/999588079802216071/",
    "https://www.pinterest.com/pin/999588079802216071/",
    "https://www.pinterest.com/pin/999588079802216071/",
    "https://www.pinterest.com/pin/999588079802216071/",
    "https://www.pinterest.com/pin/999588079802216071/",
  ];

  const [sizes, setSizes] = useState({ w: 0, h: 0 });

  useEffect(() => {
    function update() {
      setSizes({ w: window.innerWidth, h: window.innerHeight });
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const floatHearts = useMemo(() => {
    const width = sizes.w || 800;
    return Array.from({ length: 10 }).map((_, i) => ({
      id: `mem-heart-${i}`,
      x: Math.random() * width,
      duration: 4 + Math.random() * 3,
      delay: i * 0.5 + Math.random() * 0.2,
    }));
  }, [sizes.w]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-pink-100 to-pink-200 flex flex-col items-center justify-center py-16 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {floatHearts.map((h) => (
          <motion.span
            key={h.id}
            className="absolute text-pink-400 text-2xl"
            initial={{ opacity: 0, y: 100, x: h.x }}
            animate={{ opacity: [0.5, 1, 0], y: -100 }}
            transition={{
              duration: h.duration,
              repeat: Infinity,
              delay: h.delay,
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

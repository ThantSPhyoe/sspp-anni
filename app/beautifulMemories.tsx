"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import data from "./information/data.json";
import PopUpModal from "./model/popModal";

export default function BeautifulMemories() {
  const [sizes, setSizes] = useState({ w: 0, h: 0 });
  const [floatHearts, setFloatHearts] = useState<floatHearts[]>([]);
  const [selectedMemory, setSelectedMemory] = useState<Memo | null>(null);

  useEffect(() => {
    function update() {
      setSizes({ w: window.innerWidth, h: window.innerHeight });
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  
  useEffect(() => {
    const width = sizes.w || 800;
    const newFloatHeart =  Array.from({ length: 10 }).map((_, i) => ({
      id: `mem-heart-${i}`,
      x: Math.random() * width,
      duration: 4 + Math.random() * 3,
      delay: i * 0.5 + Math.random() * 0.2,
    }));
    setFloatHearts(newFloatHeart);
  },[sizes.w]);

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
        className="font-satisfy text-3xl md:text-3xl sm:text-3xl text-pink-800 mb-40 relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Our <span className="text-pink-600">Beautiful</span> Memories
      </motion.h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6 px-4 z-10">
        {data.memories.map((memo) => (
          <motion.div
            key={memo.id}
            className="rounded-2xl overflow-hidden shadow-lg bg-white cursor-pointer hover:shadow-pink-300 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: memo.id * 0.1 }}
            onClick={() =>
              setSelectedMemory({
                id: memo.id,
                images: memo.image_path,
                name: memo.name,
                caption: memo.caption,
                auth: memo.auth,
                password: memo.password || "",
              })
            }
          >
            <img
              src={memo.cover_path}
              alt={`Memory ${memo.id + 1}`}
              className="w-full h-64 object-cover hover:grayscale-0 transition-all duration-500"
            />
            <div className="p-3">
              <h3 className="font-satisfy text-lg font-semibold text-pink-600">
                {memo.name}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
      <PopUpModal selectedMemory={selectedMemory} setSelectedMemory={setSelectedMemory} />
    </div>
  );
}

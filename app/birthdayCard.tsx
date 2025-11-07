// ...existing code...
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export default function BirthdayCard() {
  const [popHearts, setPopHearts] = useState(false);
  const [sizes, setSizes] = useState({ w: 0, h: 0 });

  // set viewport sizes on mount and on resize (only runs in browser)
  useEffect(() => {
    function update() {
      setSizes({ w: window.innerWidth, h: window.innerHeight });
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // create deterministic randomized data only after we know the width/height
  const floatHearts = useMemo(() => {
    const width = sizes.w || 800;
    return Array.from({ length: 12 }).map((_, i) => ({
      id: `float-${i}`,
      x: Math.random() * width,
      delay: i * 0.5 + Math.random() * 0.3,
      duration: 4 + Math.random() * 3,
    }));
  }, [sizes.w]);

  const popHeartsData = useMemo(() => {
    const width = sizes.w || 800;
    const height = sizes.h || 600;
    return Array.from({ length: 100 }).map((_, i) => ({
      id: `balloon-${i}`,
      xOffset: (Math.random() - 0.5) * width,
      duration: 4 + Math.random() * 2,
      scaleStart: 0.95,
      delay: Math.random() * 0.5,
      endY: -height - 200,
    }));
  }, [sizes.w, sizes.h]);

  const handleCelebrate = () => {
    setPopHearts(true);
    setTimeout(() => setPopHearts(false), 6000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-pink-300 to-pink-400 text-center relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {floatHearts.map((h) => (
          <motion.span
            key={h.id}
            className="absolute text-pink-400 text-2xl"
            initial={{ opacity: 0, y: 100, x: h.x }}
            animate={{ opacity: [0.6, 1, 0], y: -100 }}
            transition={{ duration: h.duration, repeat: Infinity, delay: h.delay }}
          >
            ❤️
          </motion.span>
        ))}
      </div>

      {popHearts &&
        popHeartsData.map((p) => (
          <motion.div
            key={p.id}
            className="absolute bottom-0 left-1/2"
            initial={{
              opacity: 0,
              scale: p.scaleStart,
              x: p.xOffset,
              y: 0,
            }}
            animate={{
              opacity: [1, 1, 0],
              scale: [1, 1.1, 0.9],
              y: p.endY,
              x: p.xOffset + (Math.random() - 0.5) * 200,
            }}
            transition={{ duration: p.duration, ease: "easeOut", delay: p.delay }}
          >
            <div className="w-24 h-24 heart-shape overflow-hidden shadow-lg border-2 border-pink-300 bg-white">
              <Image
                src="/wifi2.jpg"
                alt="heart photo"
                width={150}
                height={200}
                className="object-cover w-full h-full"
              />
            </div>
          </motion.div>
        ))}

      <motion.h1
        className="text-4xl md:text-5xl font-satisfy text-pink-800 mb-3 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Happy Birthday, Beautiful!
      </motion.h1>

      <motion.p
        className="text-lg text-pink-900 mb-8 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        Today is all about celebrating you and the joy you bring to my life.
      </motion.p>
      <motion.button
        onClick={handleCelebrate}
        className="px-6 py-3 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:shadow-pink-300 transition-transform duration-300 z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Start the Celebration 🎉
      </motion.button>

      <style jsx>{`
        .heart-shape {
          clip-path: path(
            "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          );
        }
      `}</style>
    </div>
  );
}
// ...existing code...
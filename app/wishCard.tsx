"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FloatHeart {
  id: string;
  x: number;
  duration: number;
  delay: number;
}

interface PopHeart {
  id: string;
  xOffset: number;
  xDrift: number;
  duration: number;
  scaleStart: number;
  delay: number;
  endY: number;
}

export default function BirthdayCard() {
  const [floatHearts, setFloatHearts] = useState<FloatHeart[]>([]);
  const [popHeartsData, setPopHeartsData] = useState<PopHeart[]>([]);
  const [sizes, setSizes] = useState({ w: 0, h: 0 });

  useEffect(() => {
    function update() {
      setSizes({ w: window.innerWidth, h: window.innerHeight });
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (sizes.w === 0) return;
    const width = sizes.w;
    const newHearts = Array.from({ length: 10 }).map((_, i) => ({
      id: `float-heart-${i}`,
      x: Math.random() * width,
      duration: 4 + Math.random() * 3,
      delay: i * 0.5 + Math.random() * 0.2,
    }));
    setFloatHearts(newHearts);
  }, [sizes.w]);

  const handleCelebrate = () => {
    const width = sizes.w || 800;
    const height = sizes.h || 600;

    const newBatch = Array.from({ length: 40 }).map((_, i) => {
      const xOffset = (Math.random() - 0.5) * width;
      const xDrift = (Math.random() - 0.5) * 200;
      return {
        id: `balloon-${Date.now()}-${i}`,
        xOffset,
        xDrift,
        duration: 4 + Math.random() * 2,
        scaleStart: 0.95,
        delay: Math.random() * 0.5,
        endY: -height - 200,
      };
    });

    setPopHeartsData((prev) => [...prev, ...newBatch]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-pink-300 to-pink-400 py-16 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {floatHearts.map((h) => (
          <motion.span
            key={h.id}
            className="absolute text-pink-400 text-2xl"
            initial={{ opacity: 0, y: 100, x: h.x }}
            animate={{ opacity: [0.5, 1, 0], y: -100 }}
            transition={{ duration: h.duration, repeat: Infinity, delay: h.delay }}
          >
            ❤️
          </motion.span>
        ))}
      </div>
      
      {popHeartsData.map((p) => (
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
            x: p.xOffset + p.xDrift,
          }}
          transition={{ duration: p.duration, ease: "easeOut", delay: p.delay }}
          onAnimationComplete={() =>
            setPopHeartsData((prev) => prev.filter((b) => b.id !== p.id))
          }
        >
          🎈
        </motion.div>
      ))}

      <motion.h1
        className="text-4xl md:text-5xl font-satisfy text-pink-800 mb-3 z-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Happy 12th Anniversary, My Baby!
      </motion.h1>

      <motion.p
        className="text-lg text-pink-900 mb-8 z-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        Today is all about celebrating you and the joy you bring to my life.
      </motion.p>

      <motion.button
        onClick={handleCelebrate}
        className="px-6 py-3 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:shadow-pink-300 transition-transform duration-300 z-10 text-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Start the Celebration 🎉
      </motion.button>
    </div>
  );
}

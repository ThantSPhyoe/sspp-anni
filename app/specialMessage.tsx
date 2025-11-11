"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SpecialMessage() {

  const [sizes, setSizes] = useState({ w: 0, h: 0 });
  const [floatHearts, setFloatHearts] = useState<floatHearts[]>([]);

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
    const newFloatHeart = Array.from({ length: 10 }).map((_, i) => ({
      id: `mem-heart-${i}`,
      x: Math.random() * width,
      duration: 4 + Math.random() * 3,
      delay: i * 0.5 + Math.random() * 0.2,
    }));
    setFloatHearts(newFloatHeart);
  }, [sizes.w]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-400 via-pink-400 to-pink-500 p-8 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {floatHearts.map((h) => (
          <motion.span
            key={h.id}
            className="absolute text-pink-300 text-2xl"
            initial={{ opacity: 0, y: 100, x: h.x }}
            animate={{ opacity: [0.5, 1, 0], y: -100 }}
            transition={{
              duration: h.duration,
              repeat: Infinity,
              delay: h.delay,
            }}
          >
            💖
          </motion.span>
        ))}
      </div>
      <motion.div
        className="bg-white/10 backdrop-blur-md text-white max-w-2xl p-10 rounded-3xl shadow-2xl border border-white/20 z-10 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="font-satisfy text-4xl md:text-5xl mb-6">
          A Special Message for You
        </h2>

        <p className="text-base md:text-lg leading-relaxed mb-6 text-white/90">
          On this special day, I want you to know how grateful I am to have you
          in my life. Your laughter fills my days with joy, your love gives me
          strength, and your presence makes everything better. You are not just
          my girlfriend, you are my best friend, my partner in crime, and the
          love of my life.
        </p>

        <p className="text-base md:text-lg leading-relaxed text-white/90">
          Today, we celebrate you – your kindness, beauty, amazing spirit, and
          everything that makes you unique. I hope this new year of your life
          brings you endless happiness, incredible adventures, and all your
          dreams come true.
        </p>

        <p className="font-satisfy text-yellow-300 mt-6 text-xl">
          Happy Birthday, my love! Here’s to more years of laughter, love, and
          beautiful memories together. 💕
        </p>
      </motion.div>
    </div>
  );
}

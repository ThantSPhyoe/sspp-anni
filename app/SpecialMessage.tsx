"use client";

import { motion } from "framer-motion";

export default function SpecialMessage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-400 via-pink-400 to-pink-500 text-center p-8 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-pink-300 text-2xl"
            initial={{ opacity: 0, y: 100, x: Math.random() * window.innerWidth }}
            animate={{ opacity: [0.5, 1, 0], y: -100 }}
            transition={{
              duration: 5 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            💖
          </motion.span>
        ))}
      </div>
      <motion.div
        className="bg-white/10 backdrop-blur-md text-white max-w-2xl p-10 rounded-3xl shadow-2xl border border-white/20 z-10"
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

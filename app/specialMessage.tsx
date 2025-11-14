"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SendKindMessage from "./sendMessage";
import { Sen } from "next/font/google";
import SuccessMessage from "./model/successMessage";

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

        <p className="text-base md:text-lg leading-relaxed mb-6 text-white/90 text-left">
          On this special day, I want you to know how grateful I am to have you
          in my life. Your laughter fills my days with joy, your love gives me
          strength, and your presence makes everything better. You are everything
          that i keep hardwork for. I hope we can  continue to open up to each other more in the coming days.
          Whatever challenges we may face, know that I will always be by your side.
          Being apart from you is hard for me,
          and I’m sorry for not always trusting you because of my jealousy.
          I hope you can understand me and my feelings.
        </p>

        <p className="text-base md:text-lg leading-relaxed text-white/90 text-left">
          Just like Billie Eillish said,
          "Noting left to lose without my baby,"
          and like Keishi said,
          "I got a soft spot for you,"

          my love, it's the same with you- everything about you matters. It's not that I'm asking for anything,
          but your little activity messages give me comfort, and it would be nice if you keep sending them in the future.
          If I don’t get there as fast as I hope, will your wait for me?
        </p>

        <p className="text-base md:text-lg leading-relaxed text-white/90 text-left mt-3">
          Thank you for being my rock, my confidant, and my greatest love. Here’s
          to many more months and years of happiness together. I love you more
          than words can express.
        </p>

        <p className="font-satisfy text-yellow-300 mt-6 text-xl">
          Happy 1 year & 3 months, my baby! Here’s to more years of laughter, love, and
          beautiful memories together. Miss You My Baby 💕
        </p>
      </motion.div>
      <SendKindMessage />
    </div>
  );
}

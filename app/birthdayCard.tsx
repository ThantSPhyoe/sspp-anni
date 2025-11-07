"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function BirthdayCard() {
  const [popHearts, setPopHearts] = useState(false);

  const handleCelebrate = () => {
    setPopHearts(true);
    setTimeout(() => setPopHearts(false), 6000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-pink-300 to-pink-400 text-center relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.span
            key={`float-${i}`}
            className="absolute text-pink-400 text-2xl"
            initial={{
              opacity: 0,
              y: 100,
              x: Math.random() * window.innerWidth,
            }}
            animate={{
              opacity: [0.6, 1, 0],
              y: -100,
            }}
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

      {popHearts &&
        Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={`balloon-${i}`}
            className="absolute bottom-0 left-1/2"
            initial={{
              opacity: 0,
              scale: 0.95,
              x: Math.random() * window.innerWidth - window.innerWidth / 2,
              y: 0,
            }}
            animate={{
              opacity: [1, 1, 0],
              scale: [1, 1.1, 0.9],
              y: -window.innerHeight - 200,
              x: (Math.random() - 0.5) * 200,
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              ease: "easeOut",
            }}
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

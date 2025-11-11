"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import photos from "./information/moving.json";

interface Photo {
  photos: string[];
}

export default function ChangePhoto() {
  const [sizes, setSizes] = useState({ w: 0, h: 0 });
  const [floatHearts, setFloatHearts] = useState<floatHearts[]>([]);
  const [index, setIndex] = useState(0);
  var data: Photo = photos;

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

  const handleClick = () => {
    setIndex((prev) => (prev + 1) % data.photos.length);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-pink-100 to-pink-200 flex flex-col items-center justify-center py-16 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {floatHearts.map((h) => (
          <motion.span
            key={h.id}
            className="absolute text-pink-400 text-3xl"
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
        className="font-satisfy text-3xl md:text-3xl sm:text-3xl text-pink-800 mb-12 relative z-10 text-center p-2"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Every click reveals a piece of my <span className="text-pink-600">heart 💖</span>
      </motion.h2>
      <motion.div
        className="relative w-90 h-90 cursor-pointer p-2"
        animate={{
          rotateY: [0, 180, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        onClick={handleClick}
      >
        <Image
          src={data.photos[index]}
          alt="heart photo"
          fill
          loading="eager"
          sizes="(max-width: 600px) 100vw, 180px"
          className="w-[90%] h-[90%] md:w-[180px] md:h-[180px] sm:w-[200px] sm:h-[200px] overflow-hidden shadow-lg border-2 border-pink-300 bg-white justify-center object-cover border-radius: 20px"
        />

      </motion.div>
    </div>
  );
}

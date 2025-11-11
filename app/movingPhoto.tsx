"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import styles from "./styles.module.css";
import images from "./information/moving.json";

export default function ChangePhoto() {
  const [sizes, setSizes] = useState({ w: 0, h: 0 });
  const [floatHearts, setFloatHearts] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const rotationY = useMotionValue(0);

  const handleClick = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

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
        My heart keeps turning for <span className="text-pink-600">you 💞</span>
      </motion.h2>

      <motion.div
        className={styles.ring}
        style={{ rotateY: rotationY }}
        drag="x"
        dragConstraints={{ left: -1000, right: 1000 }}
        dragElastic={0.3}
        onDrag={(e, info) => {
          rotationY.set(rotationY.get() + info.delta.x);
        }}
      >
        {images.photos.map((src, index) => {
          const isSelected = selectedIndex === index;
          return (
            <div
              key={index}
              className={styles.item}
              style={{
                "--i": index,
                transform: isSelected
                  ? `rotateY(calc(${index} * 45deg)) translateZ(var(--translateZ-selected)) translateY(-30px)`
                  : `rotateY(calc(${index} * 45deg)) translateZ(var(--translateZ))`,
              } as React.CSSProperties}
              onClick={() => handleClick(index)}
            >
              <motion.img
                src={src}
                alt={`moving ${index}`}
                className="border-4 border-pink-400 rounded-xl p-1 shadow-lg object-cover"
              />
            </div>
          );
        })}
      </motion.div>

      {selectedIndex !== null && (
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img
            src={images.photos[selectedIndex]}
            alt={`Selected ${selectedIndex}`}
            className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-2xl border-4 border-pink-500 p-2 shadow-2xl object-cover bg-white"
          />
        </motion.div>
      )}
    </div>
  );
}

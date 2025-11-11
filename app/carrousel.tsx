"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import { motion } from "framer-motion";
import images from "./information/moving.json";

export default function Carrousel() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    if (selectedIndex === index) {
      setSelectedIndex(null);
    } else {
      setSelectedIndex(index);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.ring}
        style={{
          animationPlayState: selectedIndex !== null ? "paused" : "running",
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
              <motion.img src={src} alt={`moving ${index}`} />
            </div>

          );
        })}
      </div>
    </div>
  );
}

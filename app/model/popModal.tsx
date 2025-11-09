"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef } from "react";

interface Memo {
  id: number;
  images: string[];
  name: string;
  caption: string;
}

interface ModalProps {
  selectedMemory: Memo | null;
  setSelectedMemory: (value: Memo | null) => void;
}

export default function PopUpModal({ selectedMemory, setSelectedMemory }: ModalProps) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);

  if (!selectedMemory) return null;

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % selectedMemory.images.length);
  };

  const handlePrev = () => {
    setCurrent((prev) =>
      prev === 0 ? selectedMemory.images.length - 1 : prev - 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 50) handlePrev();
    if (diff < -50) handleNext();
    touchStartX.current = null;
  };

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setSelectedMemory(null);
    }
  };

  const gradients = [
    "linear-gradient(to bottom right, #fbcfe8, #fef3c7)",
    "linear-gradient(to bottom right, #dbeafe, #fbcfe8)",
    "linear-gradient(to bottom right, #fde68a, #fbcfe8)",
    "linear-gradient(to bottom right, #fce7f3, #fbcfe8)"
  ];

  return (
    <AnimatePresence mode="wait">
      {selectedMemory && (
        <motion.div
          key="popup"
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackgroundClick}
          >
          <motion.div
            className="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-3xl w-full relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setSelectedMemory(null)}
              className="absolute top-3 right-4 text-pink-600 text-2xl font-bold hover:text-pink-800 z-20"
            >
              ×
            </button>

            <div className="p-4">
              <h3 className="text-center text-2xl font-satisfy text-pink-600 mb-4">
                {selectedMemory.caption}
              </h3>

              <div
                className="relative w-full h-80 overflow-hidden rounded-xl select-none"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {selectedMemory.images.map((src, index) => (
                  <motion.img
                    key={index}
                    src={src}
                    alt={`Memory ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-contain bg-pink-600 flex justify-center items-center transition-transform duration-700 ease-in-out ${
                      index === current
                        ? "translate-x-0"
                        : index < current
                        ? "-translate-x-full"
                        : "translate-x-full"
                    } group-hover:scale-105`}
                    initial={false}
                    animate={{
                      background: gradients[current % gradients.length],
                    }}
                  />
                ))}
                <button
                  onClick={handlePrev}
                  className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white/60 hover:bg-white text-pink-700 rounded-full p-2 shadow"
                >
                  ‹
                </button>
                <button
                  onClick={handleNext}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white/60 hover:bg-white text-pink-700 rounded-full p-2 shadow"
                >
                  ›
                </button>

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
                  {selectedMemory.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`w-3 h-3 rounded-full ${
                        current === i ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ChangePhoto() {
    const [sizes, setSizes] = useState({ w: 0, h: 0 });
    const [index, setIndex] = useState(0);

    const photos = [
        "/file.svg",
        "/globe.svg",
        "/vercel.svg",
    ];

    useEffect(() => {
        function update() {
            setSizes({ w: window.innerWidth, h: window.innerHeight });
        }
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const floatHearts = useMemo(() => {
        const width = sizes.w || 800;
        return Array.from({ length: 10 }).map((_, i) => ({
            id: `mem-heart-${i}`,
            x: Math.random() * width,
            duration: 4 + Math.random() * 3,
            delay: i * 0.5 + Math.random() * 0.2,
        }));
    }, [sizes.w]);

    const handleClick = () => {
        setIndex((prev) => (prev + 1) % photos.length);
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
                className="font-satisfy text-4xl text-pink-800 mb-12 relative z-10 text-center"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                Every click reveals a piece of my <span className="text-pink-600">heart 💖</span>
            </motion.h2>
            <motion.div
                className="relative w-96 h-96 cursor-pointer"
                animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "mirror",
                }}
                onClick={handleClick}
            >
                <div className="relative w-[500px] h-[500px]">
                    <svg width="0" height="0">
                        <defs>
                            <clipPath id="heartClip" clipPathUnits="objectBoundingBox">
                                <path d="M0.48,0.9 C0.2,0.7 0,0.5 0,0.3 C0,0.13 0.13,0 0.3,0 C0.4,0 0.48,0.06 0.5,0.15 C0.52,0.06 0.6,0 0.7,0 C0.87,0 1,0.13 1,0.3 C1,0.5 0.8,0.7 0.52,0.9 C0.5,0.91 0.48,0.9 0.48,0.9 Z" />
                            </clipPath>
                        </defs>
                    </svg>

                    <Image
                        src={photos[index]}
                        alt="heart photo"
                        fill
                        className="w-full h-full overflow-hidden shadow-lg border-2 border-pink-300 bg-white"
                        style={{ clipPath: "url(#heartClip)" }}
                    />
                </div>

            </motion.div>
        </div>
    );
}

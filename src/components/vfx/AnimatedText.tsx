"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  type?: "words" | "chars";
  gradientWords?: string[];
}

export function AnimatedText({
  text,
  className = "",
  delay = 0,
  type = "words",
  gradientWords = [],
}: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: type === "words" ? 0.08 : 0.03,
        delayChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: 24,
      rotateX: 45,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={`inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 ${className}`}
    >
      {words.map((word, idx) => {
        const isGradient = gradientWords.some((gw) => word.toLowerCase().includes(gw.toLowerCase()));

        return (
          <motion.span
            key={idx}
            variants={childVariants}
            className={`inline-block ${
              isGradient
                ? "bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent font-black"
                : ""
            }`}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.div>
  );
}

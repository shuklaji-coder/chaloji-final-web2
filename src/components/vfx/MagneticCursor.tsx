"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function MagneticCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useSpring(0, { damping: 25, stiffness: 250 });
  const cursorY = useSpring(0, { damping: 25, stiffness: 250 });
  
  const glowX = useSpring(0, { damping: 40, stiffness: 120 });
  const glowY = useSpring(0, { damping: 40, stiffness: 120 });

  useEffect(() => {
    // Only enable custom cursor on desktop
    if (window.innerWidth < 1024) return;
    
    document.body.classList.add("custom-cursor-active");

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      glowX.set(e.clientX);
      glowY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("a, button, [data-cursor-expand], input, select, textarea");
      
      if (interactiveEl) {
        setIsHovered(true);
        const customText = interactiveEl.getAttribute("data-cursor-text");
        if (customText) {
          setHoverText(customText);
        } else {
          setHoverText("");
        }
      } else {
        setIsHovered(false);
        setHoverText("");
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, glowX, glowY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Ambient Light Glow following cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-25"
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(16,185,129,0.3) 0%, rgba(6,182,212,0.2) 50%, transparent 70%)",
        }}
      />

      {/* Primary Magnetic Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-emerald-400 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovered ? 12 : 8,
          height: isHovered ? 12 : 8,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Expanding Spring Physics Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center rounded-full border border-emerald-400/60 bg-emerald-500/10 backdrop-blur-[2px]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 64 : 32,
          height: isHovered ? 64 : 32,
          scale: isHovered ? 1.1 : 1,
          borderColor: isHovered ? "rgba(16, 185, 129, 0.9)" : "rgba(16, 185, 129, 0.4)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 22 }}
      >
        {hoverText && (
          <span className="text-[9px] font-bold tracking-widest uppercase text-emerald-300 animate-pulse">
            {hoverText}
          </span>
        )}
      </motion.div>
    </>
  );
}

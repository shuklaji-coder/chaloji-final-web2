"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltAmount?: number; // degree of tilt
  scaleOnHover?: number;
  enableSpotlight?: boolean;
}

export function TiltCard({
  children,
  className = "",
  tiltAmount = 10,
  scaleOnHover = 1.02,
  enableSpotlight = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mousePxX = useMotionValue(-1000);
  const mousePxY = useMotionValue(-1000);

  // Smooth springs for fluid mouse movement
  const mouseXSpring = useSpring(x, { stiffness: 280, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 280, damping: 22 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [tiltAmount, -tiltAmount]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-tiltAmount, tiltAmount]);

  // Spotlight gradient background
  const spotlightBg = useMotionTemplate`radial-gradient(550px circle at ${mousePxX}px ${mousePxY}px, rgba(223, 201, 147, 0.14), transparent 75%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
    mousePxX.set(mouseX);
    mousePxY.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    mousePxX.set(-1000);
    mousePxY.set(-1000);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: scaleOnHover }}
      transition={{ type: "spring", stiffness: 350, damping: 24 }}
      className={`relative perspective-1000 ${className}`}
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      {enableSpotlight && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          style={{ background: spotlightBg }}
        />
      )}

      <div style={{ transform: "translateZ(18px)" }} className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}

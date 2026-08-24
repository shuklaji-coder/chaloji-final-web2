"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth - 0.5) * 100);
      mouseY.set((e.clientY / innerHeight - 0.5) * 100);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // 3D Canvas Particle Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle setup — mobile par halka rakhein (performance)
    const isSmallScreen = window.innerWidth < 768;
    const particleCount = isSmallScreen
      ? Math.min(Math.floor(window.innerWidth / 32), 24)
      : Math.min(Math.floor(window.innerWidth / 15), 60);
    const glowBlur = isSmallScreen ? 0 : 10;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 2 + 0.5,
      radius: Math.random() * 1.8 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      color:
        Math.random() > 0.6
          ? "rgba(16, 185, 129, "
          : Math.random() > 0.3
          ? "rgba(6, 182, 212, "
          : "rgba(249, 115, 22, ",
      alpha: Math.random() * 0.6 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx * p.z;
        p.y += p.vy * p.z;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * p.z, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowBlur = glowBlur;
        ctx.shadowColor = p.color + "0.8)";
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#08090C]">
      {/* Animated Mesh Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      {/* Shifting Dynamic Aurora Lights */}
      <motion.div
        className="aurora-blob absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full blur-[140px] opacity-30"
        style={{
          x: springX,
          y: springY,
          background: "radial-gradient(circle, rgba(16,185,129,0.4) 0%, rgba(6,182,212,0.15) 50%, transparent 80%)",
        }}
      />
      <motion.div
        className="aurora-blob absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full blur-[140px] opacity-25"
        style={{
          x: springX,
          y: springY,
          background: "radial-gradient(circle, rgba(249,115,22,0.3) 0%, rgba(139,92,246,0.15) 50%, transparent 80%)",
        }}
      />

      {/* Floating 3D Canvas Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />
    </div>
  );
}

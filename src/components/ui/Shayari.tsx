"use client";

import React from "react";

export function Shayari({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={`flex items-center justify-center gap-2 text-sm sm:text-base italic font-medium text-emerald-100/75 tracking-wide ${className}`}
    >
      <span aria-hidden className="not-italic font-black text-lg leading-none bg-gradient-to-br from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
        ❝
      </span>
      <span>{children}</span>
      <span aria-hidden className="not-italic font-black text-lg leading-none bg-gradient-to-br from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
        ❞
      </span>
    </p>
  );
}

"use client";

import React from "react";

export function Shayari({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={`flex items-center justify-center gap-2 text-sm sm:text-base italic font-medium text-[#F7EBD2]/90 tracking-wide ${className}`}
    >
      <span aria-hidden className="not-italic font-black text-lg leading-none bg-gradient-to-br from-[#DFC993] to-[#10B981] bg-clip-text text-transparent">
        ❝
      </span>
      <span>{children}</span>
      <span aria-hidden className="not-italic font-black text-lg leading-none bg-gradient-to-br from-[#10B981] to-[#DFC993] bg-clip-text text-transparent">
        ❞
      </span>
    </p>
  );
}

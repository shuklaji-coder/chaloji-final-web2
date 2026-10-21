"use client";

import dynamic from "next/dynamic";
import React from "react";
import { LocationPoint, NearbyDriver, RideCategory } from "@/types/ride";

interface MapWrapperProps {
  pickup: LocationPoint;
  drop?: LocationPoint | null;
  drivers?: NearbyDriver[];
  activeDriverLocation?: { lat: number; lng: number } | null;
  activeCategory?: RideCategory;
  onPickupChange?: (loc: LocationPoint) => void;
  className?: string;
}

const DynamicLivingMap = dynamic(
  () => import("./LivingMap").then((mod) => mod.LivingMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-[#0B1320] flex flex-col items-center justify-center space-y-4">
        <div className="relative flex items-center justify-center w-16 h-16">
          <span className="absolute w-14 h-14 rounded-full bg-[#10B981]/20 animate-ping"></span>
          <span className="absolute w-10 h-10 rounded-full bg-[#DFC993]/30 animate-pulse"></span>
          <div className="w-8 h-8 rounded-full bg-[#041611] border-2 border-[#DFC993] flex items-center justify-center text-sm shadow-xl">
            🚖
          </div>
        </div>
        <p className="text-xs font-mono font-bold text-[#DFC993] tracking-widest uppercase animate-pulse">
          INITIALIZING CHALOJI VECTOR MAP...
        </p>
      </div>
    ),
  }
);

export function MapWrapper(props: MapWrapperProps) {
  return <DynamicLivingMap {...props} />;
}

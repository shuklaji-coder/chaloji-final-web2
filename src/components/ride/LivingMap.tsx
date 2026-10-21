"use client";

import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Navigation, Crosshair, Bike, Car, Compass, Zap } from "lucide-react";
import { LocationPoint, NearbyDriver, RideCategory } from "@/types/ride";

interface LivingMapProps {
  pickup: LocationPoint;
  drop?: LocationPoint | null;
  drivers?: NearbyDriver[];
  activeDriverLocation?: { lat: number; lng: number } | null;
  activeCategory?: RideCategory;
  onPickupChange?: (loc: LocationPoint) => void;
  className?: string;
}

export function LivingMap({
  pickup,
  drop,
  drivers = [],
  activeDriverLocation,
  activeCategory = "cab",
  onPickupChange,
  className = "w-full h-full",
}: LivingMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const pickupMarkerRef = useRef<L.Marker | null>(null);
  const dropMarkerRef = useRef<L.Marker | null>(null);
  const routePolylineRef = useRef<L.Polyline | null>(null);
  const driverMarkersRef = useRef<Map<string, L.Marker>>(new Map());
  const activeDriverMarkerRef = useRef<L.Marker | null>(null);

  const [etaBike, setEtaBike] = useState(2);
  const [etaAuto, setEtaAuto] = useState(3);
  const [etaCab, setEtaCab] = useState(4);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [pickup.lat, pickup.lng],
      zoom: 15,
      zoomControl: false,
      attributionControl: false,
    });

    // Luxury CartoDB Dark Matter tiles
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png",
      {
        subdomains: "abcd",
        maxZoom: 19,
      }
    ).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update Pickup Marker
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (pickupMarkerRef.current) {
      pickupMarkerRef.current.setLatLng([pickup.lat, pickup.lng]);
    } else {
      const pickupIcon = L.divIcon({
        className: "custom-pickup-pin",
        html: `
          <div class="relative flex items-center justify-center w-12 h-12">
            <span class="absolute w-10 h-10 rounded-full bg-[#10B981] opacity-40 animate-ping"></span>
            <span class="absolute w-7 h-7 rounded-full bg-[#DFC993] opacity-60 animate-pulse"></span>
            <div class="relative w-5 h-5 rounded-full bg-[#10B981] border-2 border-white shadow-lg flex items-center justify-center">
              <div class="w-2 h-2 rounded-full bg-[#041611]"></div>
            </div>
          </div>
        `,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
      });

      pickupMarkerRef.current = L.marker([pickup.lat, pickup.lng], {
        icon: pickupIcon,
      }).addTo(map);
    }
  }, [pickup]);

  // Update Drop Marker & Route Polyline
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (drop) {
      if (dropMarkerRef.current) {
        dropMarkerRef.current.setLatLng([drop.lat, drop.lng]);
      } else {
        const dropIcon = L.divIcon({
          className: "custom-drop-pin",
          html: `
            <div class="relative flex items-center justify-center w-10 h-10">
              <div class="w-6 h-6 rounded-full bg-gradient-to-br from-[#DFC993] to-[#B58E4A] border-2 border-white shadow-xl flex items-center justify-center text-[10px] font-black text-[#041611]">
                🏁
              </div>
            </div>
          `,
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        });

        dropMarkerRef.current = L.marker([drop.lat, drop.lng], {
          icon: dropIcon,
        }).addTo(map);
      }

      // Draw Curved Route Polyline
      const latlngs: L.LatLngExpression[] = [
        [pickup.lat, pickup.lng],
        // Midpoint slight bend for realistic Indian road look
        [
          (pickup.lat + drop.lat) / 2 + 0.002,
          (pickup.lng + drop.lng) / 2 - 0.002,
        ],
        [drop.lat, drop.lng],
      ];

      if (routePolylineRef.current) {
        routePolylineRef.current.setLatLngs(latlngs);
      } else {
        routePolylineRef.current = L.polyline(latlngs, {
          color: "#10B981",
          weight: 5,
          opacity: 0.85,
          dashArray: "1, 10",
          dashSpeed: 20,
        } as any).addTo(map);
      }

      // Fit bounds to show entire route
      const bounds = L.latLngBounds([
        [pickup.lat, pickup.lng],
        [drop.lat, drop.lng],
      ]);
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 16 });
    } else {
      if (dropMarkerRef.current) {
        dropMarkerRef.current.remove();
        dropMarkerRef.current = null;
      }
      if (routePolylineRef.current) {
        routePolylineRef.current.remove();
        routePolylineRef.current = null;
      }
    }
  }, [pickup, drop]);

  // Update Nearby Driver Markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove old markers not in list
    const currentIds = new Set(drivers.map((d) => d.id));
    driverMarkersRef.current.forEach((marker, id) => {
      if (!currentIds.has(id)) {
        marker.remove();
        driverMarkersRef.current.delete(id);
      }
    });

    // Render or move drivers
    drivers.forEach((driver) => {
      const getEmoji = (cat: RideCategory) => {
        if (cat === "bike") return "🏍️";
        if (cat === "auto") return "🛺";
        if (cat === "suv") return "🚙";
        return "🚗";
      };

      if (driverMarkersRef.current.has(driver.id)) {
        const marker = driverMarkersRef.current.get(driver.id)!;
        marker.setLatLng([driver.lat, driver.lng]);
      } else {
        const driverIcon = L.divIcon({
          className: "custom-driver-pin",
          html: `
            <div class="relative w-8 h-8 rounded-full bg-[#041611]/90 border border-[#DFC993]/50 shadow-md flex items-center justify-center transform hover:scale-110 transition-transform text-sm" style="transform: rotate(${driver.heading}deg);">
              <span>${getEmoji(driver.category)}</span>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        const marker = L.marker([driver.lat, driver.lng], {
          icon: driverIcon,
        }).addTo(map);

        driverMarkersRef.current.set(driver.id, marker);
      }
    });
  }, [drivers]);

  // Update Active Assigned Driver Live GPS marker
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (activeDriverLocation) {
      if (activeDriverMarkerRef.current) {
        activeDriverMarkerRef.current.setLatLng([
          activeDriverLocation.lat,
          activeDriverLocation.lng,
        ]);
      } else {
        const icon = L.divIcon({
          className: "active-assigned-captain",
          html: `
            <div class="relative flex items-center justify-center w-12 h-12">
              <span class="absolute inset-0 rounded-full bg-[#DFC993]/40 animate-ping"></span>
              <div class="relative w-9 h-9 rounded-full bg-[#041611] border-2 border-[#DFC993] shadow-2xl flex items-center justify-center text-lg">
                🚗
              </div>
            </div>
          `,
          iconSize: [48, 48],
          iconAnchor: [24, 24],
        });

        activeDriverMarkerRef.current = L.marker(
          [activeDriverLocation.lat, activeDriverLocation.lng],
          { icon }
        ).addTo(map);
      }
    } else {
      if (activeDriverMarkerRef.current) {
        activeDriverMarkerRef.current.remove();
        activeDriverMarkerRef.current = null;
      }
    }
  }, [activeDriverLocation]);

  const handleRecenter = () => {
    if (mapRef.current) {
      mapRef.current.flyTo([pickup.lat, pickup.lng], 16, {
        duration: 1.2,
      });
    }
  };

  const handleLocateMe = () => {
    if (navigator.geolocation && mapRef.current) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          if (onPickupChange) {
            onPickupChange({
              lat,
              lng,
              address: "Current Detected Location",
              title: "My Current Location",
            });
          }
          mapRef.current?.flyTo([lat, lng], 16, { duration: 1.2 });
        },
        () => {
          handleRecenter();
        }
      );
    } else {
      handleRecenter();
    }
  };

  return (
    <div className={`relative ${className} bg-[#0B1320] overflow-hidden`}>
      {/* Map Leaflet Canvas Container */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Floating "FASTEST NEARBY" Real-Time ETA Pill */}
      <div className="absolute top-4 left-4 z-[400] pointer-events-auto">
        <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#041611]/90 backdrop-blur-md border border-[#DFC993]/40 shadow-xl shadow-black/60">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#DFC993]">
            FASTEST NEARBY:
          </span>
          <div className="flex items-center space-x-2.5 text-xs font-mono font-bold text-white">
            <span className="flex items-center space-x-1">
              <span>🏍️</span>
              <span className="text-emerald-400">{etaBike}m</span>
            </span>
            <span className="text-gray-500">•</span>
            <span className="flex items-center space-x-1">
              <span>🛺</span>
              <span className="text-[#DFC993]">{etaAuto}m</span>
            </span>
            <span className="text-gray-500">•</span>
            <span className="flex items-center space-x-1">
              <span>🚗</span>
              <span className="text-white">{etaCab}m</span>
            </span>
          </div>
        </div>
      </div>

      {/* Map Action Floating Buttons (Recenter & GPS Locate) */}
      <div className="absolute bottom-6 right-4 z-[400] flex flex-col space-y-2.5 pointer-events-auto">
        <button
          onClick={handleLocateMe}
          aria-label="Locate me"
          title="Current GPS Location"
          className="w-11 h-11 rounded-2xl bg-[#041611]/90 backdrop-blur-md border border-[#DFC993]/35 text-[#DFC993] hover:text-white hover:border-[#10B981] shadow-2xl flex items-center justify-center transition-all duration-200 active:scale-95"
        >
          <Crosshair className="w-5 h-5" />
        </button>

        <button
          onClick={handleRecenter}
          aria-label="Recenter to pickup"
          title="Recenter Pickup"
          className="w-11 h-11 rounded-2xl bg-[#041611]/90 backdrop-blur-md border border-[#DFC993]/35 text-[#DFC993] hover:text-white hover:border-[#10B981] shadow-2xl flex items-center justify-center transition-all duration-200 active:scale-95"
        >
          <Compass className="w-5 h-5" />
        </button>
      </div>

      {/* Decorative Gradient Map Borders */}
      <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#041611]/80 to-transparent pointer-events-none z-[399]" />
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#041611]/80 to-transparent pointer-events-none z-[399]" />
    </div>
  );
}

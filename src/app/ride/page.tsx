"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapWrapper } from "@/components/ride/MapWrapper";
import { RideCockpit } from "@/components/ride/RideCockpit";
import { DestinationSearchModal } from "@/components/ride/DestinationSearchModal";
import { RideSelectionSheet } from "@/components/ride/RideSelectionSheet";
import { ChaloCaptainLoader } from "@/components/ride/ChaloCaptainLoader";
import { ActiveRideTracking } from "@/components/ride/ActiveRideTracking";
import { RideCompletedInvoice } from "@/components/ride/RideCompletedInvoice";
import { EventBookingModal } from "@/components/layout/EventBookingModal";
import {
  Ride,
  RideCategory,
  LocationPoint,
  NearbyDriver,
  RideStatus,
} from "@/types/ride";
import {
  createRide,
  subscribeToRide,
  updateRideStatus,
  generateMockNearbyDrivers,
} from "@/lib/rideService";

type AppScreenState =
  | "IDLE"
  | "SELECTING_RIDE"
  | "SEARCHING_CAPTAIN"
  | "RIDE_ACTIVE"
  | "RIDE_COMPLETED";

const DEFAULT_PICKUP: LocationPoint = {
  lat: 25.4484,
  lng: 81.8336,
  address: "Civil Lines, Prayagraj, Uttar Pradesh 211001",
  title: "Civil Lines Prayagraj",
};

export default function RidePage() {
  const [screenState, setScreenState] = useState<AppScreenState>("IDLE");
  const [pickup, setPickup] = useState<LocationPoint>(DEFAULT_PICKUP);
  const [drop, setDrop] = useState<LocationPoint | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<RideCategory>("cab");
  const [nearbyDrivers, setNearbyDrivers] = useState<NearbyDriver[]>([]);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [eventPackage, setEventPackage] = useState<"baraat" | "airport" | "outstation">("baraat");
  const [activeRide, setActiveRide] = useState<Ride | null>(null);

  // Initialize nearby drivers around pickup
  useEffect(() => {
    setNearbyDrivers(generateMockNearbyDrivers(pickup.lat, pickup.lng));

    // Slight movement loop for realism
    const interval = setInterval(() => {
      setNearbyDrivers((prev) =>
        prev.map((d) => ({
          ...d,
          lat: d.lat + (Math.random() - 0.5) * 0.0004,
          lng: d.lng + (Math.random() - 0.5) * 0.0004,
          heading: (d.heading + Math.floor((Math.random() - 0.5) * 20) + 360) % 360,
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [pickup.lat, pickup.lng]);

  // Try to detect user location on mount
  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPickup({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            address: "Your Current Location",
            title: "My Location",
          });
        },
        () => {
          // keep default
        }
      );
    }
  }, []);

  // Real-time Firestore subscription when an active ride exists
  useEffect(() => {
    if (!activeRide?.id) return;

    const unsub = subscribeToRide(activeRide.id, (updatedRide) => {
      setActiveRide(updatedRide);

      if (updatedRide.status === "accepted" || updatedRide.status === "arriving" || updatedRide.status === "arrived" || updatedRide.status === "ongoing") {
        setScreenState("RIDE_ACTIVE");
      } else if (updatedRide.status === "completed") {
        setScreenState("RIDE_COMPLETED");
      } else if (updatedRide.status === "cancelled") {
        setScreenState("IDLE");
        setActiveRide(null);
      }
    });

    return () => unsub();
  }, [activeRide?.id]);

  // Handlers
  const handleSelectDrop = (selectedDrop: LocationPoint) => {
    setDrop(selectedDrop);
    setSearchModalOpen(false);
    setScreenState("SELECTING_RIDE");
  };

  const handleBookRide = async (
    category: RideCategory,
    paymentMethod: "cash" | "upi" | "wallet",
    fare: number,
    discount: number
  ) => {
    if (!drop) return;

    setScreenState("SEARCHING_CAPTAIN");

    const rideData: Omit<Ride, "id" | "createdAt"> = {
      userId: "user-" + Math.random().toString(36).substring(2, 7),
      userName: "ChaloJi Rider",
      userPhone: "+91 98765 43210",
      category,
      pickup,
      drop,
      distanceKm: 6.2,
      durationMins: 18,
      fare,
      discount,
      paymentMethod,
      status: "requested",
      otp: Math.floor(1000 + Math.random() * 9000).toString(),
    };

    const rideId = await createRide(rideData);
    setActiveRide({
      ...rideData,
      id: rideId,
      createdAt: new Date().toISOString(),
    });
  };

  const handleCancelSearching = async (reason: string) => {
    if (activeRide) {
      await updateRideStatus(activeRide.id, "cancelled");
    }
    setScreenState("IDLE");
    setActiveRide(null);
  };

  const handleUpdateStatus = async (status: RideStatus) => {
    if (activeRide) {
      await updateRideStatus(activeRide.id, status);
    }
  };

  const handleFinishRide = () => {
    setScreenState("IDLE");
    setActiveRide(null);
    setDrop(null);
  };

  const handleOpenSpecialService = (type: string) => {
    if (type === "baraat") {
      setEventPackage("baraat");
      setEventModalOpen(true);
    } else if (type === "outstation") {
      setEventPackage("outstation");
      setEventModalOpen(true);
    } else {
      // Driver on demand or saath - open search
      setSelectedCategory("cab");
      setSearchModalOpen(true);
    }
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#0B1320] text-white flex flex-col lg:flex-row">
      
      {/* Search Modal */}
      <DestinationSearchModal
        open={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        pickup={pickup}
        onSelectDrop={handleSelectDrop}
        onSelectPickup={(newPickup) => setPickup(newPickup)}
      />

      {/* Special Event / Baraat / Outstation Modal */}
      <EventBookingModal
        open={eventModalOpen}
        onClose={() => setEventModalOpen(false)}
        defaultPackage={eventPackage}
      />

      {/* DESKTOP SPLIT COCKPIT (LEFT 44%): CONSOLE & SERVICES */}
      <div className="hidden lg:flex w-[44%] h-full shrink-0 border-r border-[#DFC993]/25 z-20 overflow-hidden flex-col shadow-2xl">
        {screenState === "IDLE" && (
          <RideCockpit
            onOpenSearch={() => setSearchModalOpen(true)}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            onQuickDestination={handleSelectDrop}
            onOpenSpecialService={handleOpenSpecialService}
            currentAddress={pickup.title || pickup.address}
          />
        )}

        {screenState === "SELECTING_RIDE" && drop && (
          <div className="h-full flex flex-col justify-end">
            <RideSelectionSheet
              pickup={pickup}
              drop={drop}
              onBookRide={handleBookRide}
              onCancel={() => setScreenState("IDLE")}
            />
          </div>
        )}

        {screenState === "SEARCHING_CAPTAIN" && (
          <div className="h-full flex flex-col justify-center">
            <ChaloCaptainLoader
              category={selectedCategory}
              onCancelRequest={handleCancelSearching}
            />
          </div>
        )}

        {screenState === "RIDE_ACTIVE" && activeRide && (
          <div className="h-full flex flex-col justify-end">
            <ActiveRideTracking
              ride={activeRide}
              onUpdateStatus={handleUpdateStatus}
              onCancelRide={() => handleCancelSearching("User cancelled")}
            />
          </div>
        )}

        {screenState === "RIDE_COMPLETED" && activeRide && (
          <div className="h-full flex flex-col justify-center">
            <RideCompletedInvoice
              ride={activeRide}
              onFinish={handleFinishRide}
            />
          </div>
        )}
      </div>

      {/* DESKTOP RIGHT (56%) & MOBILE FULLSCREEN: INTERACTIVE LIVING VECTOR MAP */}
      <div className="relative flex-1 h-full w-full overflow-hidden">
        <MapWrapper
          pickup={pickup}
          drop={drop}
          drivers={nearbyDrivers}
          activeDriverLocation={
            activeRide?.driverDetails
              ? {
                  lat: activeRide.driverDetails.lat,
                  lng: activeRide.driverDetails.lng,
                }
              : null
          }
          activeCategory={selectedCategory}
          onPickupChange={(newP) => setPickup(newP)}
          className="w-full h-full"
        />

        {/* MOBILE BOTTOM SHEET OVERLAY (<1024px) */}
        <div className="lg:hidden absolute inset-x-0 bottom-0 z-[500] max-h-[85dvh] flex flex-col justify-end pointer-events-auto">
          {screenState === "IDLE" && (
            <div className="max-h-[70dvh] rounded-t-3xl overflow-y-auto bg-[#0B1320] border-t border-[#DFC993]/35 shadow-2xl">
              <RideCockpit
                onOpenSearch={() => setSearchModalOpen(true)}
                onSelectCategory={(cat) => setSelectedCategory(cat)}
                onQuickDestination={handleSelectDrop}
                onOpenSpecialService={handleOpenSpecialService}
                currentAddress={pickup.title || pickup.address}
              />
            </div>
          )}

          {screenState === "SELECTING_RIDE" && drop && (
            <RideSelectionSheet
              pickup={pickup}
              drop={drop}
              onBookRide={handleBookRide}
              onCancel={() => setScreenState("IDLE")}
            />
          )}

          {screenState === "SEARCHING_CAPTAIN" && (
            <ChaloCaptainLoader
              category={selectedCategory}
              onCancelRequest={handleCancelSearching}
            />
          )}

          {screenState === "RIDE_ACTIVE" && activeRide && (
            <ActiveRideTracking
              ride={activeRide}
              onUpdateStatus={handleUpdateStatus}
              onCancelRide={() => handleCancelSearching("User cancelled")}
            />
          )}

          {screenState === "RIDE_COMPLETED" && activeRide && (
            <RideCompletedInvoice
              ride={activeRide}
              onFinish={handleFinishRide}
            />
          )}
        </div>
      </div>

    </main>
  );
}

import { db, auth } from "./firebase";

export interface BookingPayload {
  riderName: string;
  riderPhone: string;
  pickup: string;
  drop: string;
  date?: string;
  time?: string;
  tripType: string;
  rideType: string;
  estimatedFare?: number;
}

export function normalizeVehicleType(type?: string): string {
  const t = (type || "").toLowerCase().trim();
  if (t.includes("bike") || t.includes("express")) return "bike";
  if (t.includes("auto")) return "auto";
  if (t.includes("suv") || t.includes("jeep") || t.includes("baarat")) return "jeep";
  return "car"; // cab, sedan
}

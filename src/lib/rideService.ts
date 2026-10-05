import { db } from "./firebase";
import {
  collection,
  addDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

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

export interface RideStatus {
  id: string;
  status: "SEARCHING" | "ACCEPTED" | "ARRIVING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  driverName?: string;
  driverPhone?: string;
  driverPhoto?: string;
  vehicleNumber?: string;
  vehicleModel?: string;
  etaMins?: number;
  pickupAddress: string;
  dropAddress: string;
  createdAt?: any;
}

/**
 * Creates a real-time ride request in Firestore 'rides' collection
 * Driver App listens to rides with status === 'SEARCHING' and rings siren!
 */
export async function createDirectRideRequest(payload: BookingPayload): Promise<string> {
  const rideData = {
    riderName: payload.riderName || "Web Passenger",
    riderPhone: payload.riderPhone || "Not specified",
    pickupLocation: {
      address: payload.pickup,
    },
    dropLocation: {
      address: payload.drop,
    },
    pickupAddress: payload.pickup,
    dropAddress: payload.drop,
    date: payload.date || "ASAP",
    time: payload.time || "ASAP",
    tripType: payload.tripType,
    vehicleType: payload.rideType,
    status: "SEARCHING",
    source: "WEB_DIRECT",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, "rides"), rideData);
  return docRef.id;
}

/**
 * Real-time listener for ride status updates when driver accepts
 */
export function subscribeToRide(
  rideId: string,
  onUpdate: (ride: RideStatus) => void,
  onError?: (err: Error) => void
) {
  const rideRef = doc(db, "rides", rideId);

  return onSnapshot(
    rideRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        onUpdate({
          id: snapshot.id,
          status: data.status || "SEARCHING",
          driverName: data.driverName || data.driver?.name || "Verified Partner Driver",
          driverPhone: data.driverPhone || data.driver?.phone || "8087747774",
          driverPhoto: data.driverPhoto || data.driver?.photo,
          vehicleNumber: data.vehicleNumber || data.driver?.vehicleNumber || "UP70 AB 1234",
          vehicleModel: data.vehicleModel || data.driver?.vehicleModel || data.vehicleType || "Cab",
          etaMins: data.etaMins || 4,
          pickupAddress: data.pickupAddress || data.pickupLocation?.address || "",
          dropAddress: data.dropAddress || data.dropLocation?.address || "",
          createdAt: data.createdAt,
        });
      }
    },
    (error) => {
      if (onError) onError(error);
    }
  );
}

/**
 * Cancel ride request
 */
export async function cancelWebRide(rideId: string) {
  const rideRef = doc(db, "rides", rideId);
  await updateDoc(rideRef, {
    status: "CANCELLED",
    updatedAt: serverTimestamp(),
  });
}

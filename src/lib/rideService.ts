import { db, auth, functions, functionsAsia, signInAnonymously, httpsCallable } from "./firebase";
import {
  collection,
  addDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  Timestamp,
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

export function normalizeVehicleType(type?: string): string {
  const t = (type || "").toLowerCase().trim();
  if (t.includes("bike") || t.includes("express")) return "bike";
  if (t.includes("auto")) return "auto";
  if (t.includes("suv") || t.includes("jeep") || t.includes("baarat")) return "jeep";
  return "car"; // cab, sedan
}

/**
 * Creates a real-time ride request in Firestore 'rides' collection
 * Driver App listens to rides with status === 'requested' and vehicleType === ('bike'|'auto'|'car'|'jeep')!
 */
export async function createDirectRideRequest(payload: BookingPayload): Promise<string> {
  const normalizedVehicle = normalizeVehicleType(payload.rideType);

  // Ensure anonymous auth session if user is not signed in
  if (!auth.currentUser) {
    try {
      await signInAnonymously(auth);
    } catch (authErr) {
      console.warn("Anonymous auth failed, proceeding as guest:", authErr);
    }
  }

  const bookingPayload = {
    clientRequestId: `web-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    riderName: payload.riderName || "Web Passenger",
    riderPhone: payload.riderPhone,
    pickup: { address: payload.pickup, latitude: 25.3176, longitude: 82.9739 },
    drop: { address: payload.drop, latitude: 25.3216, longitude: 82.9876 },
    pickupAddress: payload.pickup,
    dropAddress: payload.drop,
    vehicleType: normalizedVehicle,
    date: payload.date || "ASAP",
    time: payload.time || "ASAP",
    tripType: payload.tripType,
    source: "WEB_DIRECT",
  };

  // 1. Try Firebase Callable Function (default region)
  try {
    const createRideCallable = httpsCallable<any, any>(functions, "createRide");
    const result = await createRideCallable(bookingPayload);
    if (result.data && result.data.rideId) {
      console.log("[WEB_BOOKING] Cloud function (us-central1) created ride:", result.data.rideId);
      return result.data.rideId;
    }
  } catch (fnError) {
    console.warn("Cloud function (default region) failed, trying asia-south1:", fnError);
  }

  // 2. Try Firebase Callable Function (asia-south1 region)
  try {
    const createRideAsiaCallable = httpsCallable<any, any>(functionsAsia, "createRide");
    const result = await createRideAsiaCallable(bookingPayload);
    if (result.data && result.data.rideId) {
      console.log("[WEB_BOOKING] Cloud function (asia-south1) created ride:", result.data.rideId);
      return result.data.rideId;
    }
  } catch (asiaErr) {
    console.warn("Cloud function (asia-south1) failed, executing direct Firestore write:", asiaErr);
  }

  // 2. Direct Firestore fallback write to 'rides' collection matching full Driver App schema
  const requestExpiresAt = Timestamp.fromMillis(Date.now() + 120 * 1000); // 120 seconds in future

  const rideData = {
    passengerId: auth.currentUser?.uid || "web_guest",
    riderName: payload.riderName || "Web Passenger",
    riderPhone: payload.riderPhone || "Not specified",
    pickup: {
      address: payload.pickup,
      latitude: 25.3176,
      longitude: 82.9739,
    },
    drop: {
      address: payload.drop,
      latitude: 25.3216,
      longitude: 82.9876,
    },
    pickupLocation: {
      address: payload.pickup,
      latitude: 25.3176,
      longitude: 82.9739,
    },
    dropLocation: {
      address: payload.drop,
      latitude: 25.3216,
      longitude: 82.9876,
    },
    pickupAddress: payload.pickup,
    dropAddress: payload.drop,
    fare: payload.estimatedFare || 150,
    originalFare: payload.estimatedFare || 150,
    distance: 8.5,
    duration: 18,
    date: payload.date || "ASAP",
    time: payload.time || "ASAP",
    tripType: payload.tripType || "ONE_WAY",
    vehicleType: normalizedVehicle, // 'bike' | 'auto' | 'car' | 'jeep'
    status: "requested", // Matches Driver App query: .where('status', '==', 'requested')
    paymentMethod: "cash",
    paymentStatus: "pending",
    isScheduled: false,
    requestExpiresAt,
    source: "WEB_DIRECT",
    createdAt: Timestamp.now(),
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
        const rawStatus = (data.status || "requested").toUpperCase();
        let normalizedStatus: RideStatus["status"] = "SEARCHING";

        if (["ACCEPTED", "ACCEPT"].includes(rawStatus)) normalizedStatus = "ACCEPTED";
        else if (["ARRIVING", "ARRIVED"].includes(rawStatus)) normalizedStatus = "ARRIVING";
        else if (["IN_PROGRESS", "ONGOING"].includes(rawStatus)) normalizedStatus = "IN_PROGRESS";
        else if (["COMPLETED"].includes(rawStatus)) normalizedStatus = "COMPLETED";
        else if (["CANCELLED"].includes(rawStatus)) normalizedStatus = "CANCELLED";
        else normalizedStatus = "SEARCHING";

        onUpdate({
          id: snapshot.id,
          status: normalizedStatus,
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

import {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { signInAnonymously } from "firebase/auth";
import { db, auth } from "./firebase";
import { Ride, RideCategory, RideStatus, NearbyDriver, DriverDetails } from "@/types/ride";

// In-memory fallback bus for offline or restricted Firestore
const localRides = new Map<string, Ride>();
const listeners = new Map<string, Set<(ride: Ride) => void>>();

function notifyLocalListeners(rideId: string, ride: Ride) {
  localRides.set(rideId, ride);
  const set = listeners.get(rideId);
  if (set) {
    set.forEach((cb) => cb(ride));
  }
}

// Ensure anonymous auth
export async function ensureAuth(): Promise<string> {
  try {
    if (auth.currentUser) return auth.currentUser.uid;
    const cred = await signInAnonymously(auth);
    return cred.user.uid;
  } catch (err) {
    console.warn("Firebase Auth fallback to local UID", err);
    return "guest-" + Math.random().toString(36).substring(2, 9);
  }
}

// Create a new Ride
export async function createRide(
  payload: Omit<Ride, "id" | "createdAt">
): Promise<string> {
  const rideId = "CJ-" + Date.now().toString(36).toUpperCase();
  const newRide: Ride = {
    ...payload,
    id: rideId,
    createdAt: new Date().toISOString(),
  };

  localRides.set(rideId, newRide);

  try {
    const docRef = doc(db, "rides", rideId);
    await setDoc(docRef, {
      ...payload,
      id: rideId,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.warn("Firestore write skipped, using local reactive state", err);
  }

  // Trigger Captain simulation automatically so user experiences full real-time lifecycle
  simulateCaptainLifecycle(rideId, payload.category);

  return rideId;
}

// Real-time Ride Subscription
export function subscribeToRide(
  rideId: string,
  callback: (ride: Ride) => void
): () => void {
  // Add to local listeners
  if (!listeners.has(rideId)) {
    listeners.set(rideId, new Set());
  }
  listeners.get(rideId)!.add(callback);

  // If we already have a local copy, immediately send it
  const current = localRides.get(rideId);
  if (current) callback(current);

  // Connect to Firestore onSnapshot
  let unsubFirestore = () => {};
  try {
    const docRef = doc(db, "rides", rideId);
    unsubFirestore = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data() as Ride;
          localRides.set(rideId, data);
          callback(data);
        }
      },
      (error) => {
        console.warn("Firestore snapshot error, using local listener:", error.message);
      }
    );
  } catch (err) {
    console.warn("Firestore snapshot init failed:", err);
  }

  return () => {
    unsubFirestore();
    const set = listeners.get(rideId);
    if (set) {
      set.delete(callback);
    }
  };
}

// Update Ride Status
export async function updateRideStatus(
  rideId: string,
  status: RideStatus,
  driverDetails?: DriverDetails
) {
  const current = localRides.get(rideId);
  if (current) {
    const updated: Ride = {
      ...current,
      status,
      driverDetails: driverDetails || current.driverDetails,
      completedAt: status === "completed" ? new Date().toISOString() : current.completedAt,
    };
    notifyLocalListeners(rideId, updated);
  }

  try {
    const docRef = doc(db, "rides", rideId);
    await updateDoc(docRef, {
      status,
      ...(driverDetails ? { driverDetails } : {}),
      ...(status === "completed" ? { completedAt: serverTimestamp() } : {}),
    });
  } catch (err) {
    // handled locally
  }
}

// Realistic Indian Captain Simulator
const CAPTAIN_PROFILES: Record<RideCategory, DriverDetails> = {
  bike: {
    name: "Suraj Kumar",
    phone: "+91 80877 47774",
    rating: 4.9,
    totalTrips: 1840,
    vehicleNumber: "UP 70 BV 4120",
    vehicleModel: "Hero Splendor Plus (Black)",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    lat: 25.4358,
    lng: 81.8463,
  },
  auto: {
    name: "Mukesh Yadav",
    phone: "+91 80877 47774",
    rating: 4.8,
    totalTrips: 2430,
    vehicleNumber: "UP 70 TA 9821",
    vehicleModel: "Bajaj RE Compact CNG",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    lat: 25.4362,
    lng: 81.8475,
  },
  cab: {
    name: "Ramesh Sharma",
    phone: "+91 80877 47774",
    rating: 4.95,
    totalTrips: 3120,
    vehicleNumber: "UP 70 AB 4774",
    vehicleModel: "Maruti Suzuki Dzire (White AC)",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    lat: 25.4371,
    lng: 81.8452,
  },
  suv: {
    name: "Vikramaditya Pratap Singh",
    phone: "+91 80877 47774",
    rating: 5.0,
    totalTrips: 1290,
    vehicleNumber: "UP 70 R 0001",
    vehicleModel: "Toyota Innova Crysta VIP",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    lat: 25.4385,
    lng: 81.8441,
  },
  outstation: {
    name: "Akhilesh Trivedi",
    phone: "+91 80877 47774",
    rating: 4.98,
    totalTrips: 940,
    vehicleNumber: "UP 70 EX 1100",
    vehicleModel: "Toyota Fortuner 4x4 Highway Cruiser",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    lat: 25.439,
    lng: 81.843,
  },
  baraat: {
    name: "Commander Raghuveer Singh",
    phone: "+91 80877 47774",
    rating: 5.0,
    totalTrips: 450,
    vehicleNumber: "UP 70 ROYAL 7",
    vehicleModel: "Black Fortuner Convoy Squad",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    lat: 25.439,
    lng: 81.843,
  },
  driver_on_demand: {
    name: "Dharmendra Chauffeur",
    phone: "+91 80877 47774",
    rating: 4.94,
    totalTrips: 1850,
    vehicleNumber: "Verified Driver Badge",
    vehicleModel: "Uniformed Professional Chauffeur",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    lat: 25.436,
    lng: 81.846,
  },
  saath: {
    name: "Pooja Mishra (Verified Co-Rider)",
    phone: "+91 80877 47774",
    rating: 4.9,
    totalTrips: 310,
    vehicleNumber: "UP 70 SM 5521",
    vehicleModel: "Honda Amaze Commute Share",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    lat: 25.436,
    lng: 81.846,
  },
};

export function simulateCaptainLifecycle(rideId: string, category: RideCategory) {
  // Step 1: 4.5 seconds searching loader
  setTimeout(() => {
    const current = localRides.get(rideId);
    if (!current || current.status === "cancelled") return;

    const captain = {
      ...(CAPTAIN_PROFILES[category] || CAPTAIN_PROFILES.cab),
      lat: current.pickup.lat + 0.0035,
      lng: current.pickup.lng + 0.0028,
    };

    updateRideStatus(rideId, "accepted", captain);

    // Step 2: 4 seconds later Captain is Arriving (moving)
    setTimeout(() => {
      const c = localRides.get(rideId);
      if (!c || c.status === "cancelled") return;
      updateRideStatus(rideId, "arriving");

      // Step 3: 5 seconds later Captain is Arrived at pickup
      setTimeout(() => {
        const c2 = localRides.get(rideId);
        if (!c2 || c2.status === "cancelled") return;
        updateRideStatus(rideId, "arrived");
      }, 5000);
    }, 4000);
  }, 4500);
}

// Generate moving nearby 2D drivers around a coordinate
export function generateMockNearbyDrivers(
  centerLat: number,
  centerLng: number
): NearbyDriver[] {
  const categories: RideCategory[] = ["bike", "auto", "cab", "suv", "cab", "bike", "auto"];
  return categories.map((cat, idx) => {
    const angle = (idx / categories.length) * Math.PI * 2 + Math.random() * 0.3;
    const distance = 0.003 + Math.random() * 0.006; // approx 300m - 800m
    return {
      id: `driver-${idx + 1}`,
      category: cat,
      lat: centerLat + Math.sin(angle) * distance,
      lng: centerLng + Math.cos(angle) * distance,
      heading: Math.floor(Math.random() * 360),
    };
  });
}

// Predefined landmark presets for quick search in India
export const POPULAR_INDIAN_LANDMARKS = [
  {
    title: "Varanasi Lal Bahadur Shastri Airport (VNS)",
    address: "Babatpur, Varanasi, Uttar Pradesh 221006",
    city: "Varanasi",
    lat: 25.4526,
    lng: 82.8596,
  },
  {
    title: "Prayagraj Junction Railway Station (PRYJ)",
    address: "Civil Lines, Prayagraj, Uttar Pradesh 211001",
    city: "Prayagraj",
    lat: 25.4484,
    lng: 81.8336,
  },
  {
    title: "Phoolpur Main Market & Tehsil",
    address: "Phoolpur Town, Prayagraj, Uttar Pradesh 212402",
    city: "Phoolpur",
    lat: 25.5516,
    lng: 82.0911,
  },
  {
    title: "Triveni Sangam & Kumbh Kshetra",
    address: "Daraganj, Prayagraj, Uttar Pradesh 211005",
    city: "Prayagraj",
    lat: 25.4299,
    lng: 81.8845,
  },
  {
    title: "Kashi Vishwanath Temple Corridor",
    address: "Lahori Tola, Varanasi, Uttar Pradesh 221001",
    city: "Varanasi",
    lat: 25.3109,
    lng: 83.0107,
  },
  {
    title: "Chhatrapati Shivaji Maharaj Airport (BOM) T2",
    address: "Sahar, Andheri East, Mumbai, Maharashtra 400099",
    city: "Mumbai",
    lat: 19.0896,
    lng: 72.8656,
  },
  {
    title: "Bengaluru Kempegowda Airport (BLR)",
    address: "KIAL Rd, Devanahalli, Bengaluru, Karnataka 560300",
    city: "Bengaluru",
    lat: 13.1986,
    lng: 77.7066,
  },
  {
    title: "Indira Gandhi International Airport (DEL) T3",
    address: "New Delhi, Delhi 110037",
    city: "Delhi NCR",
    lat: 28.5562,
    lng: 77.1000,
  },
];

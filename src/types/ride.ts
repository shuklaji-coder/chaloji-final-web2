export type RideCategory =
  | "bike"
  | "auto"
  | "cab"
  | "suv"
  | "outstation"
  | "baraat"
  | "driver_on_demand"
  | "saath";

export type RideStatus =
  | "requested"
  | "accepted"
  | "arriving"
  | "arrived"
  | "ongoing"
  | "completed"
  | "cancelled";

export interface LocationPoint {
  lat: number;
  lng: number;
  address: string;
  title?: string;
}

export interface DriverDetails {
  name: string;
  phone: string;
  rating: number;
  totalTrips?: number;
  vehicleNumber: string;
  vehicleModel: string;
  photoUrl?: string;
  lat: number;
  lng: number;
}

export interface Ride {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  category: RideCategory;
  pickup: LocationPoint;
  drop: LocationPoint;
  distanceKm: number;
  durationMins: number;
  fare: number;
  discount: number;
  paymentMethod: "cash" | "upi" | "wallet";
  status: RideStatus;
  otp: string;
  driverId?: string;
  driverDetails?: DriverDetails;
  createdAt: any;
  completedAt?: any;
}

export interface RideOption {
  id: RideCategory;
  title: string;
  subtitle: string;
  seats: number;
  etaMins: number;
  basePrice: number;
  perKmRate: number;
  icon: string;
  badge?: string;
  priority?: boolean;
}

export interface NearbyDriver {
  id: string;
  category: RideCategory;
  lat: number;
  lng: number;
  heading: number;
}

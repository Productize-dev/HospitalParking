export type LotStatus = "available" | "limited" | "full";
export type LotType = "garage" | "metered" | "time-limited" | "accessible" | "proposed";

export type DirectionStep = {
  instruction: string;
  detail: string;
};

export type ParkingLot = {
  id: string;
  name: string;
  type: LotType;
  area: string;
  address: string;
  walkMinutes: number;
  driveMinutes: number;
  openSpots: number;
  capacity: number;
  status: LotStatus;
  levels: string[];
  pricePerHour: number | null;
  maxHours: number | null;
  rate: string;
  note: string;
  near: string[];
  directions: DirectionStep[];
  /** Position on stylized map, 0–100 */
  mapX: number;
  mapY: number;
  proposed?: boolean;
};

export const campus = {
  name: "Zuckerberg San Francisco General",
  shortName: "ZSFG",
  address: "1001 Potrero Avenue, San Francisco, CA 94110",
  phone: "(415) 206-8000",
};

export const parkingLots: ParkingLot[] = [
  {
    id: "23rd-street-garage",
    name: "ZSFG Hospital Garage",
    type: "garage",
    area: "23rd Street Parking Garage",
    address: "2500 24th St · 1001 Potrero Ave",
    walkMinutes: 4,
    driveMinutes: 3,
    openSpots: 214,
    capacity: 836,
    status: "available",
    levels: ["P1", "P2", "P3", "P4", "P5"],
    pricePerHour: 5,
    maxHours: 24,
    rate: "$5.00 first hour · $29.00 daily max",
    note: "Primary visitor/staff garage — San Francisco General Hospital Medical Center Garage.",
    near: ["Building 5", "Building 9", "Main Lobby"],
    mapX: 72,
    mapY: 48,
    directions: [
      {
        instruction: "Approach on Potrero Avenue",
        detail: "Head toward campus between 22nd and 23rd Streets.",
      },
      {
        instruction: "Turn onto 23rd Street",
        detail: "Drive east past Building 5 (Main Hospital).",
      },
      {
        instruction: "Continue to 24th Street",
        detail: "Garage entrance at 2500 24th St, east of 23rd.",
      },
      {
        instruction: "Enter visitor levels",
        detail: "Follow public parking signs. Open stalls show green on the spot map.",
      },
    ],
  },
  {
    id: "lot-main-hospital",
    name: "Main Hospital Lot",
    type: "garage",
    area: "23rd St · Building 5",
    address: "Campus lot near Main Lobby Entrance",
    walkMinutes: 1,
    driveMinutes: 2,
    openSpots: 8,
    capacity: 36,
    status: "limited",
    levels: ["Ground"],
    pricePerHour: 3.5,
    maxHours: 10,
    rate: "$3.50/hr · Up to 10 hrs",
    note: "Public surface lot by the Main Lobby Entrance (23rd St side of Building 5).",
    near: ["Building 5 Main Lobby", "Radiology"],
    mapX: 58,
    mapY: 42,
    directions: [
      {
        instruction: "Enter campus from 23rd Street",
        detail: "Use the Main Lobby approach near Building 5.",
      },
      {
        instruction: "Look for circled P signs",
        detail: "Surface spaces sit beside the Main Lobby Entrance.",
      },
      {
        instruction: "Park in an open stall",
        detail: "Short-stay preferred — busy stalls show parked duration.",
      },
    ],
  },
  {
    id: "lot-22nd-clinic",
    name: "22nd Street Clinic Lot",
    type: "metered",
    area: "22nd St · Buildings 1 / 20 / 25",
    address: "Campus lot along 22nd Street",
    walkMinutes: 3,
    driveMinutes: 3,
    openSpots: 22,
    capacity: 48,
    status: "available",
    levels: ["Ground"],
    pricePerHour: 2,
    maxHours: 8,
    rate: "$2.00/hr · Up to 8 hrs",
    note: "Public surface parking mid-campus near Building 1, 20, and 25.",
    near: ["Building 1", "Building 20", "Building 25"],
    mapX: 42,
    mapY: 38,
    directions: [
      {
        instruction: "Take 22nd Street into campus",
        detail: "From Potrero Ave, turn toward Buildings 1, 20, and 25.",
      },
      {
        instruction: "Follow public P markers",
        detail: "Surface rows run along the clinic / billing cluster.",
      },
      {
        instruction: "Choose an open stall",
        detail: "Best for Building 1 or billing office visits.",
      },
    ],
  },
  {
    id: "lot-family-health",
    name: "Family Health Lot",
    type: "metered",
    area: "21st–22nd St · Buildings 80 / 90",
    address: "Campus lot by Family Health Center",
    walkMinutes: 5,
    driveMinutes: 4,
    openSpots: 14,
    capacity: 40,
    status: "available",
    levels: ["Ground"],
    pricePerHour: 2,
    maxHours: 8,
    rate: "$2.00/hr · Up to 8 hrs",
    note: "Serves Building 80 (Family Health, Urgent Care) and Building 90.",
    near: ["Building 80", "Building 90"],
    mapX: 28,
    mapY: 52,
    directions: [
      {
        instruction: "Head west toward 21st–22nd",
        detail: "Aim for the Family Health / Building 80 block.",
      },
      {
        instruction: "Watch for P near Buildings 80 & 90",
        detail: "Surface lot beside Family Health and Urgent Care.",
      },
      {
        instruction: "Park and walk in",
        detail: "Short walk to Building 80 lobby and Building 90 clinics.",
      },
    ],
  },
  {
    id: "lot-west-campus",
    name: "West Campus Lot",
    type: "time-limited",
    area: "20th St · Behavioral Health",
    address: "Campus lot near 20th Street",
    walkMinutes: 7,
    driveMinutes: 5,
    openSpots: 0,
    capacity: 28,
    status: "full",
    levels: ["Ground"],
    pricePerHour: 1.5,
    maxHours: 4,
    rate: "$1.50/hr · Up to 4 hrs",
    note: "Often full — overflow uses the 23rd Street Garage.",
    near: ["Behavioral Health", "Building 80"],
    mapX: 18,
    mapY: 58,
    directions: [
      {
        instruction: "Approach via 20th Street",
        detail: "West edge of campus near Behavioral Health.",
      },
      {
        instruction: "Check the spot map first",
        detail: "This lot is often full.",
      },
      {
        instruction: "If full, continue to the garage",
        detail: "Overflow redirects to the 23rd Street Parking Garage.",
      },
    ],
  },
  {
    id: "lot-building-9",
    name: "Building 9 Lot",
    type: "time-limited",
    area: "Southeast campus · Buildings 9 / 40",
    address: "Campus lot near Building 9",
    walkMinutes: 3,
    driveMinutes: 3,
    openSpots: 6,
    capacity: 32,
    status: "limited",
    levels: ["Ground"],
    pricePerHour: 2.5,
    maxHours: 6,
    rate: "$2.50/hr · Up to 6 hrs",
    note: "Beside Building 9 and Building 40 — next to the main garage approach.",
    near: ["Building 9", "Building 40"],
    mapX: 68,
    mapY: 62,
    directions: [
      {
        instruction: "Drive toward southeast campus",
        detail: "Near Building 9 and the garage approach.",
      },
      {
        instruction: "Spot the P by Buildings 9 & 40",
        detail: "Small surface lot beside Occupational Health.",
      },
      {
        instruction: "Use open stalls or the garage",
        detail: "If limited, use the 23rd Street Garage.",
      },
    ],
  },
  {
    id: "accessible-main",
    name: "Accessible — Main Entrance",
    type: "accessible",
    area: "23rd & Potrero curbside",
    address: "Main Entrance · 23rd & Potrero",
    walkMinutes: 1,
    driveMinutes: 2,
    openSpots: 3,
    capacity: 6,
    status: "limited",
    levels: ["Ground"],
    pricePerHour: null,
    maxHours: 4,
    rate: "Permit / placard · Up to 4 hrs",
    note: "Curbside accessible spaces at the Main Entrance.",
    near: ["Building 5 Main Lobby"],
    mapX: 52,
    mapY: 55,
    directions: [
      {
        instruction: "Arrive at 23rd & Potrero",
        detail: "Main Entrance curb on the hospital side.",
      },
      {
        instruction: "Use marked accessible stalls",
        detail: "Placard required. Check open count on the pin.",
      },
    ],
  },
  {
    id: "metered-potrero",
    name: "Potrero Ave Meters",
    type: "metered",
    area: "Potrero Avenue curb",
    address: "Potrero Ave between 22nd & 23rd",
    walkMinutes: 4,
    driveMinutes: 2,
    openSpots: 5,
    capacity: 18,
    status: "limited",
    levels: ["Ground"],
    pricePerHour: 1,
    maxHours: 2,
    rate: "$1.00/hr · Up to 2 hrs",
    note: "Street meters along Potrero facing campus.",
    near: ["Building 5", "Outpatient"],
    mapX: 48,
    mapY: 78,
    directions: [
      {
        instruction: "Stay on Potrero Avenue",
        detail: "Look for meter spaces between 22nd and 23rd.",
      },
      {
        instruction: "Pay at meter / app",
        detail: "2-hour limit typical on this block.",
      },
    ],
  },
  {
    id: "lot-24th-valencia",
    name: "24th & Valencia Lot",
    type: "garage",
    area: "Nearby off-campus",
    address: "2400 Valencia St",
    walkMinutes: 12,
    driveMinutes: 6,
    openSpots: 18,
    capacity: 60,
    status: "available",
    levels: ["Ground", "P1"],
    pricePerHour: 3.5,
    maxHours: 24,
    rate: "$3.50/hr · Up to 24 hrs",
    note: "Off-campus option southwest of ZSFG — longer walk / shuttle.",
    near: ["24th St corridor"],
    mapX: 88,
    mapY: 78,
    directions: [
      {
        instruction: "Continue south/west toward Valencia",
        detail: "Leave campus via 24th Street area.",
      },
      {
        instruction: "Enter 2400 Valencia lot",
        detail: "Then walk or shuttle back toward Potrero.",
      },
    ],
  },
  {
    id: "proposed-22nd-utah",
    name: "Proposed: Reserved Zone — 22nd & Utah",
    type: "proposed",
    area: "Proposed staff reserved",
    address: "22nd & Utah",
    walkMinutes: 6,
    driveMinutes: 4,
    openSpots: 8,
    capacity: 10,
    status: "available",
    levels: ["Ground"],
    pricePerHour: null,
    maxHours: 10,
    rate: "Proposed · Staff reserved · Up to 10 hrs",
    note: "Proposed reserved zone for staff — design preview only.",
    near: ["Utah St approach"],
    mapX: 35,
    mapY: 22,
    proposed: true,
    directions: [
      {
        instruction: "Navigate to 22nd & Utah",
        detail: "Northwest of the main hospital block.",
      },
      {
        instruction: "Look for proposed zone markings",
        detail: "Dashed ring on the map marks proposed reserved stalls.",
      },
    ],
  },
  {
    id: "proposed-23rd-potrero",
    name: "Proposed: Reserved Zone — 23rd & Potrero",
    type: "proposed",
    area: "Proposed staff reserved",
    address: "23rd & Potrero (east side)",
    walkMinutes: 2,
    driveMinutes: 2,
    openSpots: 4,
    capacity: 8,
    status: "limited",
    levels: ["Ground"],
    pricePerHour: null,
    maxHours: 10,
    rate: "Proposed · Staff reserved · Up to 10 hrs",
    note: "Proposed east-side reserved curb near 23rd & Potrero.",
    near: ["Building 5", "Emergency"],
    mapX: 62,
    mapY: 70,
    proposed: true,
    directions: [
      {
        instruction: "Reach 23rd & Potrero east side",
        detail: "Curbside opposite the main garage approach.",
      },
      {
        instruction: "Use proposed reserved stalls if marked",
        detail: "Staff mode preview — not live enforcement yet.",
      },
    ],
  },
  {
    id: "proposed-24th-bryant",
    name: "Proposed: Reserved Zone — 24th & Bryant",
    type: "proposed",
    area: "Proposed staff reserved",
    address: "24th & Bryant",
    walkMinutes: 9,
    driveMinutes: 5,
    openSpots: 6,
    capacity: 12,
    status: "available",
    levels: ["Ground"],
    pricePerHour: null,
    maxHours: 10,
    rate: "Proposed · Staff reserved · Up to 10 hrs",
    note: "Proposed reserved zone farther south — longer walk to campus.",
    near: ["24th St corridor"],
    mapX: 82,
    mapY: 28,
    proposed: true,
    directions: [
      {
        instruction: "Head toward 24th & Bryant",
        detail: "South/east of the hospital campus core.",
      },
      {
        instruction: "Park in proposed reserved stalls",
        detail: "Then walk or shuttle back to Potrero Ave.",
      },
    ],
  },
  {
    id: "accessible-outpatient",
    name: "Accessible — Outpatient",
    type: "accessible",
    area: "22nd St clinic curb",
    address: "Outpatient entrance · 22nd St",
    walkMinutes: 2,
    driveMinutes: 2,
    openSpots: 2,
    capacity: 4,
    status: "limited",
    levels: ["Ground"],
    pricePerHour: null,
    maxHours: 4,
    rate: "Permit / placard · Up to 4 hrs",
    note: "Accessible stalls by the Outpatient / Clinic Entrance.",
    near: ["Outpatient", "Pharmacy"],
    mapX: 40,
    mapY: 58,
    directions: [
      {
        instruction: "Use the 22nd Street clinic approach",
        detail: "Outpatient entrance side of Building 5.",
      },
      {
        instruction: "Park in marked accessible stalls",
        detail: "Placard required.",
      },
    ],
  },
];

export function getLot(id: string) {
  return parkingLots.find((lot) => lot.id === id);
}

export const statusLabel: Record<LotStatus, string> = {
  available: "Open",
  limited: "Filling up",
  full: "Full",
};

export const typeLabel: Record<LotType, string> = {
  garage: "Garage",
  metered: "Metered street",
  "time-limited": "Time-limited",
  accessible: "Accessible",
  proposed: "Proposed zone",
};

export const typeColor: Record<LotType, string> = {
  garage: "oklch(0.45 0.12 250)",
  metered: "oklch(0.72 0.12 165)",
  "time-limited": "oklch(0.78 0.14 75)",
  accessible: "oklch(0.55 0.18 300)",
  proposed: "oklch(0.55 0.2 25)",
};

export const statusRing: Record<LotStatus, string> = {
  available: "oklch(0.68 0.15 150)",
  limited: "oklch(0.75 0.15 65)",
  full: "oklch(0.58 0.2 25)",
};

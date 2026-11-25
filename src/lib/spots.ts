export type SpotState = "open" | "busy";

export type ParkingSpot = {
  id: string;
  label: string;
  row: string;
  state: SpotState;
  /** Minutes occupied when busy; 0 when open */
  parkedMinutes: number;
};

export type SpotLayout = {
  rows: string[];
  cols: number;
  levelLabel: string;
  aisleLabel: string;
  spots: ParkingSpot[];
  openCount: number;
  busyCount: number;
  longestBusyMinutes: number;
};

/** Deterministic pseudo-random from string */
function hash(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rand(seed: number) {
  let s = seed;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

/**
 * Builds a visual layout for a lot section.
 * Large garages show one level slice; small lots show the full ground grid.
 */
export function buildSpotLayout(
  lotId: string,
  capacity: number,
  openSpots: number,
  levels: string[]
): SpotLayout {
  const isGarage = levels.length > 1;
  const levelLabel = isGarage ? levels[1] ?? levels[0] : "Ground";
  const rows = isGarage ? ["A", "B", "C"] : ["A", "B", "C", "D"];
  const cols = isGarage ? 8 : Math.min(8, Math.max(5, Math.ceil(Math.min(capacity, 40) / rows.length)));
  const total = rows.length * cols;

  // Match overall lot occupancy ratio in this visual slice
  const openRatio = capacity === 0 ? 0 : openSpots / capacity;
  const targetOpen = Math.round(total * openRatio);

  const next = rand(hash(lotId + levelLabel));
  const occupiedIndices = new Set<number>();
  while (occupiedIndices.size < total - targetOpen) {
    occupiedIndices.add(Math.floor(next() * total));
  }

  const spots: ParkingSpot[] = [];
  let i = 0;
  for (const row of rows) {
    for (let c = 1; c <= cols; c++) {
      const busy = occupiedIndices.has(i);
      const parkedMinutes = busy
        ? Math.max(8, Math.round(next() * 280) + Math.floor(next() * 40))
        : 0;
      spots.push({
        id: `${lotId}-${row}${c}`,
        label: `${row}-${String(c).padStart(2, "0")}`,
        row,
        state: busy ? "busy" : "open",
        parkedMinutes,
      });
      i++;
    }
  }

  const busySpots = spots.filter((s) => s.state === "busy");
  return {
    rows,
    cols,
    levelLabel,
    aisleLabel: isGarage ? "Visitor aisle · east wing" : "Surface rows",
    spots,
    openCount: spots.filter((s) => s.state === "open").length,
    busyCount: busySpots.length,
    longestBusyMinutes: busySpots.reduce(
      (max, s) => Math.max(max, s.parkedMinutes),
      0
    ),
  };
}

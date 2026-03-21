export interface TotalData {
  uberFare: number | null;
  uberTips: number | null;
  lyftFare: number | null;
  lyftTips: number | null;
  totalFare: number | null;
  totalTips: number | null;
  total: number | null;
}

export interface Ride {
  service: "uber" | "lyft";
  account: string;
  fare: number;
  fee: number;
  tip: number;
}

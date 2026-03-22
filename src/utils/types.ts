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
  id: number;
  service: "uber" | "lyft";
  start_time: Date;
  account: string;
  fare: number;
  fee: number;
  tip: number;
}

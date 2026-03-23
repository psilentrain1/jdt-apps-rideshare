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
  account: "sofi" | "chime" | "cashapp";
  fare: number;
  fee: number;
  tip: number;
  modified_at?: Date;
  deleted_at?: Date;
}

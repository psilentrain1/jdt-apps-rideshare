export interface TotalData {
  monthLabel: string;
  uberFare: number;
  uberTips: number;
  lyftFare: number;
  lyftTips: number;
  totalFare: number;
  totalTips: number;
  total: number;
}

export interface Ride {
  id?: number;
  service: "uber" | "lyft";
  start_time: string;
  account: "sofi" | "chime" | "cashapp";
  fare: number;
  fee: number;
  tip: number;
  modified_at?: Date;
  deleted_at?: Date;
}

export interface Month {
  label: string;
  value: number;
}

export interface MonthlyTotals {
  [key: string]: TotalData;
}

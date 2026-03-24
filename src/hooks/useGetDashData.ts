import { useEffect, useState } from "react";
import { getAllRides } from "../utils/db.utils";
import { getMonthLabel } from "../utils/data.utils";
import type { Month, MonthlyTotals, Ride } from "../utils/types";

export function useGetDashData() {
  const [rideList, setRideList] = useState<Ride[]>([]);

  useEffect(() => {
    getAllRides().then(setRideList);
  }, []);

  const totalList: MonthlyTotals = {};
  const monthList: Month[] = [];

  rideList.forEach((ride) => {
    const month = Number(ride.start_time.substring(0, 7).replace("-", ""));
    const monthLabel = getMonthLabel(month);
    if (!Object.hasOwn(totalList, month)) {
      totalList[month] = {
        monthLabel: monthLabel,
        uberFare: 0,
        uberTips: 0,
        lyftFare: 0,
        lyftTips: 0,
        totalFare: 0,
        totalTips: 0,
        total: 0,
      };
      monthList.push({
        label: monthLabel,
        value: Number(month),
      });
    }

    if (ride.service === "uber") {
      totalList[month].uberFare += ride.fare + ride.fee;
      totalList[month].uberTips += ride.tip;
    } else if (ride.service === "lyft") {
      totalList[month].lyftFare += ride.fare + ride.fee;
      totalList[month].lyftTips += ride.tip;
    }
  });

  Object.keys(totalList).forEach((month) => {
    const monthData = totalList[month];
    monthData.totalFare = monthData.uberFare + monthData.lyftFare;
    monthData.totalTips = monthData.uberTips + monthData.lyftTips;
    monthData.total = monthData.totalFare + monthData.totalTips;
  });

  return { monthList, totals: totalList };
}

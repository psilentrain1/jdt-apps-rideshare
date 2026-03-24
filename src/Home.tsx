import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import UberLogo from "./assets/uber-logo-white-transparent.png";
import LyftLogo from "./assets/Lyft-Logo.wine.png";
// import type { TotalData, Month } from "./utils/types";
import { useGetDashData } from "./hooks/useGetDashData";

export default function Home() {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const { monthList, totals } = useGetDashData();

  return (
    <>
      <div className="flex flex-col gap-8">
        <section className="flex flex-row w-full justify-center">
          <Select items={monthList} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {monthList.map((month) => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </section>
        <section className="flex flex-col w-full items-center justify-center gap-4 border-b border-b-slate-400 pb-4">
          <div className="flex flex-col">
            <span className="text-slate-400 text-center text-3xl">Total:</span>
            <span className="font-bold text-6xl text-center">
              ${selectedMonth !== null ? totals[selectedMonth].total : "-.--"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-400 text-center text-xl">Fares:</span>
            <span className="text-4xl text-center">
              $
              {selectedMonth !== null
                ? totals[selectedMonth].totalFare
                : "-.--"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-400 text-center text-xl">Tips:</span>
            <span className="text-4xl text-center">
              $
              {selectedMonth !== null
                ? totals[selectedMonth].totalTips
                : "-.--"}
            </span>
          </div>
        </section>
        <section className="grid grid-cols-2 gap-8 w-full">
          <div className="flex flex-col gap-8 border-r border-r-slate-400">
            <div className="w-full flex flex-row justify-center items-center">
              <img className="h-40" src={UberLogo} alt="" />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <span className="text-slate-400 text-center text-xl">
                  Fares:
                </span>
                <span className="text-4xl text-center">
                  $
                  {selectedMonth !== null
                    ? totals[selectedMonth].uberFare
                    : "-.--"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-400 text-center text-xl">
                  Tips:
                </span>
                <span className="text-4xl text-center">
                  $
                  {selectedMonth !== null
                    ? totals[selectedMonth].uberTips
                    : "-.--"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="w-full flex flex-row justify-center items-center">
              <img className="h-40" src={LyftLogo} alt="" />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <span className="text-slate-400 text-center text-xl">
                  Fares:
                </span>
                <span className="text-4xl text-center">
                  $
                  {selectedMonth !== null
                    ? totals[selectedMonth].lyftFare
                    : "-.--"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-400 text-center text-xl">
                  Tips:
                </span>
                <span className="text-4xl text-center">
                  $
                  {selectedMonth !== null
                    ? totals[selectedMonth].lyftTips
                    : "-.--"}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

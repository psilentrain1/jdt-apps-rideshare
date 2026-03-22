import React, { useState } from "react";
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
import type { TotalData } from "./utils/types";

const dates = [
  { label: "December 2025", value: 20251201 },
  { label: "January 2026", value: 20260101 },
  { label: "February 2026", value: 20260201 },
  { label: "March 2026", value: 20260301 },
];

export default function Home() {
  const [selectedMonth, setSelectedMonth] = useState<number | null>();
  const [monthTotals, setMonthTotals] = useState<TotalData>({
    uberFare: null,
    uberTips: null,
    lyftFare: null,
    lyftTips: null,
    totalFare: null,
    totalTips: null,
    total: null,
  });

  return (
    <>
      <div className="flex flex-col gap-8">
        <section className="flex flex-row w-full justify-center">
          <Select items={dates} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {dates.map((date) => (
                  <SelectItem key={date.value} value={date.value}>
                    {date.label}
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
              ${monthTotals.total ? monthTotals.total : "-.--"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-400 text-center text-xl">Fares:</span>
            <span className="text-4xl text-center">
              ${monthTotals.totalFare ? monthTotals.totalFare : "-.--"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-400 text-center text-xl">Tips:</span>
            <span className="text-4xl text-center">
              ${monthTotals.totalTips ? monthTotals.totalTips : "-.--"}
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
                  ${monthTotals.uberFare ? monthTotals.uberFare : "-.--"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-400 text-center text-xl">
                  Tips:
                </span>
                <span className="text-4xl text-center">
                  ${monthTotals.uberTips ? monthTotals.uberTips : "-.--"}
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
                  ${monthTotals.lyftFare ? monthTotals.lyftFare : "-.--"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-400 text-center text-xl">
                  Tips:
                </span>
                <span className="text-4xl text-center">
                  ${monthTotals.lyftTips ? monthTotals.lyftTips : "-.--"}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

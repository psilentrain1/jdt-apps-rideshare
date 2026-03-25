import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { getAllRides } from "./utils/db.utils";
import { usdFormatter } from "./utils/data.utils";
import UberLogo from "./assets/uber-logo-white-transparent.png";
import LyftLogo from "./assets/Lyft-Logo.wine.png";
import type { Ride } from "./utils/types";

// TODO: Fix table header style
// TODO: Add ability to edit and delete rides
// TODO: Format dates
export default function List() {
  const [rideList, setRideList] = useState<Ride[]>([]);

  useEffect(() => {
    getAllRides().then(setRideList);
  }, []);

  return (
    <div>
      <div className="flex flex-row justify-between">
        <h2 className="font-bold text-2xl">Transactions</h2>
        <Link to={"/add"}>Add a transaction</Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Fare</TableHead>
            <TableHead>Fee</TableHead>
            <TableHead>Tip</TableHead>
            <TableHead>Account</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rideList.map((ride) => (
            <TableRow key={ride.id}>
              <TableCell>
                <img
                  className="h-8"
                  src={ride.service == "uber" ? UberLogo : LyftLogo}
                />
              </TableCell>
              <TableCell>{ride.start_time}</TableCell>
              <TableCell>{usdFormatter.format(ride.fare)}</TableCell>
              <TableCell>{usdFormatter.format(ride.fee)}</TableCell>
              <TableCell>{usdFormatter.format(ride.tip)}</TableCell>
              <TableCell>{ride.account}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

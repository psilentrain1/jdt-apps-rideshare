import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { Button } from "./components/ui/button";
import { getAllRides } from "./utils/db.utils";
import { usdFormatter } from "./utils/data.utils";
import UberLogo from "./assets/uber-logo-white-transparent.png";
import LyftLogo from "./assets/Lyft-Logo.wine.png";
import type { Ride, ListSort, ListDirection, ListColumn } from "./utils/types";

// TODO: Fix table header style
// TODO: Add ability to edit and delete rides
// TODO: Format dates
export default function List() {
  const [rideList, setRideList] = useState<Ride[]>([]);
  const [listSort, setListSort] = useState<ListSort>({
    column: "start_time",
    direction: "asc",
  });

  useEffect(() => {
    getAllRides().then(setRideList);
  }, []);

  const sortedRides = useMemo(() => {
    const rides = [...rideList];

    rides.sort((a, b) => {
      if (a[listSort.column] < b[listSort.column]) {
        return listSort.direction === "asc" ? -1 : 1;
      }
      if (a[listSort.column] > b[listSort.column]) {
        return listSort.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    return rides;
  }, [rideList, listSort]);

  const handleSort = (column: ListColumn) => {
    let direction: ListDirection = "asc";
    if (listSort.column === column && listSort.direction === "asc") {
      direction = "des";
    }
    setListSort({ column: column, direction: direction });
  };

  return (
    <div>
      <div className="flex flex-row justify-between">
        <h2 className="font-bold text-2xl">Transactions</h2>
        <Link to={"/add"}>Add a transaction</Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("service")}>
                Service
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("start_time")}>
                Date
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("fare")}>
                Fare
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("fee")}>
                Fee
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("tip")}>
                Tip
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("account")}>
                Account
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedRides.map((ride) => (
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

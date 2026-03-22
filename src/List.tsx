import { Link } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import UberLogo from "./assets/uber-logo-white-transparent.png";
import LyftLogo from "./assets/Lyft-Logo.wine.png";
import type { Ride } from "./utils/types";

const testData: Ride[] = [
  {
    id: 1,
    service: "uber",
    start_time: new Date(),
    fare: 32.99,
    fee: 2.3,
    tip: 3.0,
    account: "sofi",
  },
  {
    id: 2,
    service: "lyft",
    start_time: new Date(),
    fare: 45.39,
    fee: 1.99,
    tip: 3.0,
    account: "chime",
  },
];

// TODO: Format currency correctly
// TODO: Fix header style
export default function List() {
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
          {testData.map((ride) => (
            <TableRow key={ride.id}>
              <TableCell>
                <img
                  className="h-8"
                  src={ride.service == "uber" ? UberLogo : LyftLogo}
                />
              </TableCell>
              <TableCell>{ride.start_time.toDateString()}</TableCell>
              <TableCell>{ride.fare}</TableCell>
              <TableCell>{ride.fee}</TableCell>
              <TableCell>{ride.tip}</TableCell>
              <TableCell>{ride.account}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

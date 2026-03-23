// import { Link } from "react-router";
import NewRideForm from "./components/NewRideForm";

export default function Add() {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <h2 className="font-bold text-2xl">Add a Ride</h2>
        {/*<Link to={"/add"}>Add a transaction</Link>*/}
      </div>
      <NewRideForm />
    </div>
  );
}

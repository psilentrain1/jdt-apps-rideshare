import { NavLink } from "react-router";
import { authClient } from "../lib/auth-client";
import { Toaster } from "react-hot-toast";

export default function Header() {
  return (
    <>
      <Toaster />
      <header className="flex flex-row justify-between py-4 px-12">
        <div className="text-4xl font-bold">Rideshare Expenses</div>
        <nav>
          <ul className="flex flex-row gap-4">
            <li>
              <NavLink to={"/dashboard"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/list"}>List</NavLink>
            </li>
            <li>
              <NavLink to={"/calendar"}>Calendar</NavLink>
            </li>
            <li>
              <NavLink to={"/add"}>Add</NavLink>
            </li>
            <li>
              <span
                className="cursor-pointer"
                onClick={() => authClient.signOut()}
              >
                Logout
              </span>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

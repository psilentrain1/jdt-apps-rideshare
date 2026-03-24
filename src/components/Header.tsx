import { NavLink } from "react-router";
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
              <NavLink to={"/"}>Home</NavLink>
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
          </ul>
        </nav>
      </header>
    </>
  );
}

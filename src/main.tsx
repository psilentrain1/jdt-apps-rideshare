import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import App from "./App.tsx";
import Home from "./Home.tsx";
import Dashboard from "./Dashboard.tsx";
import List from "./List.tsx";
import Calendar from "./Calendar.tsx";
import Add from "./Add.tsx";
import Login from "./Login.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    Component: ProtectedRoute,
    children: [
      {
        Component: App,
        children: [
          {
            path: "/dashboard",
            Component: Dashboard,
          },
          {
            path: "list",
            Component: List,
          },
          {
            path: "calendar",
            Component: Calendar,
          },
          {
            path: "add",
            Component: Add,
          },
        ],
      },
    ],
  },
]);

const root = document.getElementById("root");

createRoot(root!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

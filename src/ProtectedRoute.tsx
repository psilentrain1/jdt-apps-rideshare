import { Navigate, Outlet } from "react-router";
import { authClient } from "./lib/auth-client";

export default function ProtectedRoute() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return <p>Loading...</p>;

  return session ? <Outlet /> : <Navigate to="/login" replace />;
}

import { Navigate, Outlet } from "react-router";
import { authClient } from "./lib/auth-client";

export default function ProtectedRoute() {
  const { data: session, isPending } = authClient.useSession();
  console.log("ProtectedRoute()", session);
  if (isPending) return <></>;

  return session ? <Outlet /> : <Navigate to="/login" replace />;
}

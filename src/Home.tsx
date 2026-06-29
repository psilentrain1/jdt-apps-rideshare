import { Navigate } from "react-router";
import { authClient } from "./lib/auth-client";

export default function Home() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return <></>;
  return session ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
}

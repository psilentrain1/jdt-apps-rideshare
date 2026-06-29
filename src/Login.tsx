import { useState } from "react";
import { authClient } from "./lib/auth-client";

// TODO: failed login feedback
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await authClient.signIn.email({ email, password });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <div className="bg-slate-100 rounded-xl flex flex-col items-center justify-center gap-4 p-8 text-slate-800">
        <input
          className="min-w-48 border border-slate-800 p-2 rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="min-w-48 border border-slate-800 p-2 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 text-slate-50 font-bold p-2 rounded active:bg-blue-600"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}

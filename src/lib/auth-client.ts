import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: `${import.meta.env.VITE_API_ENDPOINT}/auth`,
  fetchOptions: {
    onSuccess: (ctx) => {
      const authToken = ctx.response.headers.get("set-auth-token");
      if (authToken) {
        localStorage.setItem("token", authToken);
      }
    },
    auth: {
      type: "Bearer",
      token: () => localStorage.getItem("token") || "",
    },
  },
});

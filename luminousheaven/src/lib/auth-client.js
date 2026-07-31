// luminousheaven/src/lib/auth-client.js
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL:
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_APP_URL || "https://www.luminous-heaven.com",
});

export const { signIn, signUp, signOut, useSession } = authClient;

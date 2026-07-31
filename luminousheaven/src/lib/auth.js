// luminousheaven/src/lib/auth.js
import { betterAuth } from "better-auth";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000,
});

const getBaseUrl = () => {
  if (process.env.BETTER_AUTH_URL) return process.env.BETTER_AUTH_URL;
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
};

const trustedOrigins = [
  "http://localhost:3000",
  "https://real-estate-website-uwgn.vercel.app",
  process.env.BETTER_AUTH_URL,
  process.env.NEXT_PUBLIC_APP_URL,
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
  process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : null,
].filter(Boolean);

export const auth = betterAuth({
  database: pool,
  emailAndPassword: {
    enabled: true,
    password: {
      hash: async (password) => bcrypt.hash(password, 10),
      verify: async ({ password, hash }) => bcrypt.compare(password, hash),
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "member",
      },
      membership_status: {
        type: "string",
        required: false,
        defaultValue: "active",
      },
    },
  },
  secret: process.env.BETTER_AUTH_SECRET || process.env.JWT_SECRET,
  baseURL: getBaseUrl(),
  trustedOrigins: trustedOrigins,
});

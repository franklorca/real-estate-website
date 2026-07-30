// luminousheaven/src/lib/api-auth.js
import { auth } from "@/lib/auth";
import jwt from "jsonwebtoken";
import db from "@/lib/db";

export async function getAuthSession(req) {
  try {
    // 1. Check Better-Auth Session
    const session = await auth.api.getSession({
      headers: req.headers,
    });
    if (session?.user) {
      return {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role || "member",
        membership_status: session.user.membership_status || "active",
      };
    }
  } catch (err) {
    // Session check failed, try Bearer token fallback
  }

  // 2. Fallback: Check Bearer JWT Token in Authorization Header
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    if (token) {
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET || process.env.BETTER_AUTH_SECRET
        );
        if (decoded?.userId) {
          const user = await db("users").where({ id: decoded.userId }).first();
          if (user) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role || "member",
              membership_status: user.membership_status || "active",
            };
          }
        }
      } catch (e) {
        // Token invalid or expired
      }
    }
  }

  return null;
}

export async function requireAuthUser(req) {
  const user = await getAuthSession(req);
  if (!user) {
    return { user: null, response: Response.json({ message: "Unauthorized" }, { status: 401 }) };
  }
  return { user, response: null };
}

export async function requireAdminUser(req) {
  const user = await getAuthSession(req);
  if (!user) {
    return { user: null, response: Response.json({ message: "Unauthorized: No token provided" }, { status: 401 }) };
  }
  if (user.role !== "admin") {
    return { user: null, response: Response.json({ message: "Access denied: Admins only" }, { status: 403 }) };
  }
  return { user, response: null };
}

// luminousheaven/src/app/admin/layout.jsx
import AdminLayout from "@/components/AdminLayout";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminRootLayout({ children }) {
  const reqHeaders = await headers();
  const pathname = reqHeaders.get("x-pathname") || "";

  const session = await auth.api.getSession({
    headers: reqHeaders,
  });

  const isAdmin = session?.user && session.user.role === "admin";

  // Standalone Admin Login page route
  if (pathname === "/admin/login") {
    if (isAdmin) {
      redirect("/admin/dashboard");
    }
    return <>{children}</>;
  }

  // Strict Security Guard: Only users with role === 'admin' can access admin dashboard & management pages
  if (!isAdmin) {
    redirect("/admin/login");
  }

  return <AdminLayout>{children}</AdminLayout>;
}

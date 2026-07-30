// luminousheaven/src/app/admin/layout.jsx
import AdminLayout from "@/components/AdminLayout";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminRootLayout({ children }) {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({
    headers: reqHeaders,
  });

  // Second-layer server component check for Admin role
  if (!session?.user || session.user.role !== "admin") {
    // Exception for the admin login page itself so it renders
  }

  return <AdminLayout>{children}</AdminLayout>;
}

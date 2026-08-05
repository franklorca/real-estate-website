// luminousheaven/src/app/api/admin/settings/route.js
import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/api-auth";
import { getSetting, setSetting } from "@/lib/settings";

export async function GET(req) {
  const { user, response } = await requireAdminUser(req);
  if (response) return response;

  try {
    const rawVal = await getSetting("membership_fee_enabled", "true");
    return NextResponse.json({ membership_fee_enabled: rawVal === "true" });
  } catch (error) {
    console.error("Admin GET settings error:", error);
    return NextResponse.json(
      { message: "Failed to fetch settings." },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  const { user, response } = await requireAdminUser(req);
  if (response) return response;

  try {
    const body = await req.json();
    if (typeof body.membership_fee_enabled !== "boolean") {
      return NextResponse.json(
        { message: "membership_fee_enabled must be a boolean value." },
        { status: 400 }
      );
    }

    const newStrVal = body.membership_fee_enabled ? "true" : "false";
    await setSetting("membership_fee_enabled", newStrVal);

    return NextResponse.json({
      success: true,
      membership_fee_enabled: body.membership_fee_enabled,
      message: `Membership fee gate ${body.membership_fee_enabled ? "enabled" : "disabled"}.`,
    });
  } catch (error) {
    console.error("Admin PUT settings error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to update settings." },
      { status: 500 }
    );
  }
}

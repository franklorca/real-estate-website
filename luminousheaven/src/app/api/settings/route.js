// luminousheaven/src/app/api/settings/route.js
import { NextResponse } from "next/server";
import { getSetting } from "@/lib/settings";

export async function GET() {
  try {
    const rawVal = await getSetting("membership_fee_enabled", "true");
    const isFeeEnabled = rawVal === "true";

    return NextResponse.json(
      { membership_fee_enabled: isFeeEnabled },
      {
        headers: {
          "Cache-Control": "public, s-maxage=10, stale-while-revalidate=59",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { membership_fee_enabled: true },
      { status: 500 }
    );
  }
}

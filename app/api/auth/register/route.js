import { NextResponse } from "next/server";

export async function POST(request) {
  return NextResponse.json(
    {
      error:
        "Self-registration is disabled. Please contact admin to create your account.",
    },
    { status: 403 },
  );
}

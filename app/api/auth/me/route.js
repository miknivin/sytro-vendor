import dbConnect from "@/lib/db/connection";
import { isAuthenticatedUser } from "@/middlewares/auth";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();
    const user = await isAuthenticatedUser(req);

    if (user?.role !== "vendor") {
      return NextResponse.json(
        { success: false, message: "Forbidden: vendor access only" },
        { status: 403 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 401 }
    );
  }
}

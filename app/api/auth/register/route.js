import { NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "@/lib/db/connection";
import sendToken from "@/utlis/sendToken";
import { createErrorResponse } from "../../utils/errorResponse";

export async function POST(request) {
  try {
    await dbConnect();
    const { name, email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Please enter email and password" },
        { status: 400 }
      );
    }

    const user = await User.create({
      name,
      email,
      password,
      signupMethod: "Email/Password",
    });

    return sendToken(user, 201);
  } catch (error) {
    return createErrorResponse(error, "Unable to register user");
  }
}

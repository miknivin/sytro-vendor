import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/connection";
import User from "@/models/User";
import sendToken from "@/utlis/sendToken";
import SessionStartedOrder from "@/models/SessionStartedOrder";
import Order from "@/models/Order";
import fetchFirstDocuments from "../../utils/fetchFirstDocuments/fetchFirst";
import { createErrorResponse } from "../../utils/errorResponse";

export async function POST(request) {
  try {
    await dbConnect();
    fetchFirstDocuments();
    const { idToken, email, displayName, uid, photoURL } = await request.json();

    if (!idToken || !email) {
      return NextResponse.json(
        { error: "idToken and email are required" },
        { status: 400 }
      );
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name: displayName,
        email,
        avatar: photoURL ? { url: photoURL } : undefined,
        signupMethod: "OAuth",
      });
    } else {
      if (photoURL) {
        user.avatar = { url: photoURL };
      }
      if (user.signupMethod !== "OAuth") {
        user.signupMethod = "OAuth";
      }
      await user.save();
    }

    Order.find({ user: user._id })
      .then((orders) => {
        console.log(`Found ${orders.length} orders for user ${user._id}`);
      })
      .catch((err) => {
        console.error(`Error fetching orders for user ${user._id}:`, err);
      });

    SessionStartedOrder.find()
      .then((sessionOrders) => {
        console.log(`Found ${sessionOrders.length} session started orders`);
      })
      .catch((err) => {
        console.error(`Error fetching session started orders:`, err);
      });

    return sendToken(user, 200);
  } catch (error) {
    console.error("Google sign-in error:", error);
    return createErrorResponse(error, "Google authentication failed");
  }
}

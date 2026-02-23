import dbConnect from "@/lib/db/connection";
import { isAuthenticatedUser } from "@/middlewares/auth";
import Order from "@/models/Order";
import Product from "@/models/Products";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { triggerAdminShipment } from "@/utlis/triggerAdminShipment";

export async function POST(req) {
  try {
    Product;
    User;

    await dbConnect();

    const user = await isAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    if (user.role !== "vendor") {
      return NextResponse.json(
        { success: false, message: "Forbidden: vendor access only" },
        { status: 403 },
      );
    }

    const body = await req.json();

    const {
      orderItems,
      shippingInfo,
      itemsPrice,
      taxAmount = 0,
      shippingAmount = 0,
      totalAmount,
      paymentInfo,
      couponCode,
      discountAmount = 0,
      couponDiscountType = "",
      couponDiscountValue = 0,
      orderNotes = "",
    } = body;

    const order = await Order.create({
      orderItems,
      shippingInfo,
      itemsPrice: Number(itemsPrice || 0),
      taxAmount: Number(taxAmount || 0),
      shippingAmount: Number(shippingAmount || 0),
      totalAmount: Number(totalAmount || 0),
      paymentMethod: "Vendor-Payment",
      paymentInfo,
      remainingAmount: 0,
      couponApplied: couponCode || "No",
      discountAmount: Number(discountAmount || 0),
      couponDiscountType: couponDiscountType || "",
      couponDiscountValue: Number(couponDiscountValue || 0),
      orderNotes: orderNotes || "",
      user: user._id,
    });

    setImmediate(() => {
      triggerAdminShipment(order._id.toString()).catch((err) =>
        console.error("triggerAdminShipment failed (ignored):", err),
      );
    });

    return NextResponse.json({ success: true, order }, { status: 200 });
  } catch (error) {
    const message = error?.message || "Internal Server Error";
    const status = message.toLowerCase().includes("login") ? 401 : 500;
    return NextResponse.json({ success: false, message }, { status });
  }
}

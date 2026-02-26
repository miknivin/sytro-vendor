import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/connection";
import Product from "@/models/Products"; // ← fixed import name (was "products")
import APIFilters from "@/utlis/apiFilters";
import { isAuthenticatedUser } from "@/middlewares/auth";
export async function GET(req) {
  try {
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
    const { searchParams } = new URL(req.url);
    const resPerPage = parseInt(searchParams.get("resPerPage")) || 50;

    // Convert searchParams to plain object
    const queryParams = Object.fromEntries(searchParams.entries());

    // Force category to "Kids Bags" (your existing rule)
    queryParams.category = "Kids Bags";

    // Initialize filters
    const apiFilters = new APIFilters(Product.find(), queryParams) // ← start with .find()
      .search()
      .filter()
      .sort();

    // Clone the query before pagination to count total filtered docs
    let queryForCount = apiFilters.query.clone();

    // Apply the hard requirement: capacity > 15 liters
    apiFilters.query = apiFilters.query.find({ capacity: { $gt: 15 } });
    queryForCount = queryForCount.find({ capacity: { $gt: 15 } });

    // Get filtered count (after all filters including capacity)
    const filteredProductsCount = await queryForCount.countDocuments();

    // Apply pagination
    apiFilters.pagination(resPerPage);

    // Execute final query (exclude choiceImages field)
    const filteredProducts = await apiFilters.query
      .clone()
      .select("-choiceImages")
      .lean(); // lean() → plain JS objects, faster

    return NextResponse.json(
      {
        success: true,
        resPerPage,
        filteredProductsCount,
        filteredProducts,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Products API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Server error",
      },
      { status: 500 },
    );
  }
}

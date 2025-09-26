import { connectDB } from "@/lib/mongodb";
import Property from "@/models/Property";
import User from "@/models/User"; // <-- Ensure User model is registered
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB(); // Ensure DB is connected before using models

  try {
    const { searchParams } = new URL(req.url);
    const location = searchParams.get("location");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    let filter = {};
    if (location) filter.location = { $regex: location, $options: "i" };
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const properties = await Property.find(filter).populate("host");

    return NextResponse.json(properties, { status: 200 });  // ✅ NextResponse
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch properties", details: error.message },
      { status: 500 }
    );
  }
}

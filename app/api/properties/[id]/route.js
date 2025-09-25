// app/api/properties/[id]/route.js
import dbConnect from "@/lib/mongodb";
import Property from "@/models/Property";
import { Types } from "mongoose";

export async function GET(req, { params }) {
  await dbConnect();

  const { id } = params;
  if (!Types.ObjectId.isValid(id)) {
    return new Response(JSON.stringify({ error: "Invalid ID" }), { status: 400 });
  }

  try {
    const property = await Property.findById(id);
    if (!property) return new Response(JSON.stringify({ error: "Property not found" }), { status: 404 });
    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch property" }), { status: 500 });
  }
}

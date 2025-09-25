// models/Property.js
import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
    description: { type: String },
    beds: { type: Number },
    baths: { type: Number },
    amenities: [{ type: String }],
    availableFrom: { type: Date },
    availableTo: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Property || mongoose.model("Property", PropertySchema);

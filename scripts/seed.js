import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Property from "../models/Property.js";
import User from "../models/User.js";

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // clear old data
    await Property.deleteMany();
    await User.deleteMany();

    // insert dummy users
    const users = await User.insertMany([
      { name: "Alice", email: "alice@example.com", password: "hashedpassword1" },
      { name: "Bob", email: "bob@example.com", password: "hashedpassword2" },
    ]);

    // insert dummy properties
    await Property.insertMany([
      {
        title: "Cozy Beach House",
        description: "A relaxing beach house with ocean views",
        location: "Miami",
        price: 200,
        images: ["https://via.placeholder.com/600x400"],
        beds: 3,
        baths: 2,
        amenities: ["WiFi", "Pool", "Air Conditioning"],
        availableFrom: new Date("2025-10-01"),
        availableTo: new Date("2025-12-31"),
        host: users[0]._id,
      },
      {
        title: "Mountain Cabin",
        description: "A quiet cabin in the mountains",
        location: "Denver",
        price: 150,
        images: ["https://via.placeholder.com/600x400"],
        beds: 2,
        baths: 1,
        amenities: ["Fireplace", "Hiking Trails"],
        availableFrom: new Date("2025-11-01"),
        availableTo: new Date("2026-03-31"),
        host: users[1]._id,
      },
    ]);

    console.log("🌱 Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  }
}

seed();

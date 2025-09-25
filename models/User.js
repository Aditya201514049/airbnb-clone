// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String }, // for avatar (if using OAuth)
    password: { type: String }, // if you implement credentials login
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);

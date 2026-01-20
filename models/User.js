import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: {
      type: String,
      enum: ["student", "professor", "admin"],
      default: "student",
    },
    isVerified: {
      type: Boolean,
      default: false, // for professor
    },
    resetToken: String,
resetTokenExpiry: Date,

  },
  { timestamps: true }
)

export default mongoose.model("User", userSchema)

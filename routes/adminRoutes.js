import express from "express"
import User from "../models/User.js"
import { protect, adminOnly } from "../middleware/authMiddleware.js"

const router = express.Router()

// ✅ GET ALL PENDING PROFESSORS
router.get("/pending-professors", protect, adminOnly, async (req, res) => {
  try {
    const professors = await User.find({
      role: "professor",
      isVerified: false,
    }).select("-password")

    res.json(professors)
  } catch (err) {
    console.error("ADMIN FETCH ERROR:", err)
    res.status(500).json({ message: "Failed to load professors" })
  }
})

// ✅ VERIFY PROFESSOR
router.put("/verify/:id", protect, adminOnly, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      isVerified: true,
    })
    res.json({ message: "Professor verified" })
  } catch (err) {
    res.status(500).json({ message: "Verification failed" })
  }
})

export default router

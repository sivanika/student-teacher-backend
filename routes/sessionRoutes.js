import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import {
  createSession,
  getAllSessions,
  enrollSession,
  getProfessorSessions,
} from "../controllers/sessionController.js"

const router = express.Router()

router.post("/", protect, createSession)
router.get("/", protect, getAllSessions)
router.post("/:id/enroll", protect, enrollSession)
router.get("/professor", protect, getProfessorSessions)

export default router

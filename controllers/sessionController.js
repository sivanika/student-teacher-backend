import Session from "../models/Session.js"

// CREATE SESSION
export const createSession = async (req, res) => {
  try {
    if (req.user.role !== "professor")
      return res.status(403).json({ message: "Forbidden" })

    const session = await Session.create({
      ...req.body,
      professor: req.user.id,
    })

    res.json(session)
  } catch (err) {
    console.error("CREATE SESSION ERROR:", err)
    res.status(500).json({ message: "Create failed" })
  }
}

// GET ALL SESSIONS (STUDENT)
export const getAllSessions = async (req, res) => {
  const sessions = await Session.find().populate("professor", "name")
  res.json(sessions)
}

// ENROLL (ONLY PUSH STUDENT)
export const enrollSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)

    if (!session)
      return res.status(404).json({ message: "Session not found" })

    if (session.students.includes(req.user.id))
      return res.json({ message: "Already enrolled" })

    session.students.push(req.user.id)
    await session.save()

    res.json({ message: "Enrolled" })
  } catch (err) {
    console.error("ENROLL ERROR:", err)
    res.status(500).json({ message: "Enroll failed" })
  }
}

// PROFESSOR SESSIONS
export const getProfessorSessions = async (req, res) => {
  const sessions = await Session.find({
    professor: req.user.id,
  }).populate("students", "name email")

  res.json(sessions)
}

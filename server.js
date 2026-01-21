import express from "express"
import http from "http"
import { Server } from "socket.io"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"
import socketHandler from "./socketHandler.js"
import adminRoutes from "./routes/adminRoutes.js"
// routes
import authRoutes from "./routes/authRoutes.js"
import sessionRoutes from "./routes/sessionRoutes.js"
import chatRoutes from "./routes/chatRoutes.js"
// import feedbackRoutes from "./routes/feedbackRoutes.js";

dotenv.config()
connectDB()

const app = express()
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀")
})

app.use(cors({
    origin: ["https://student-teacher-portal-six.vercel.app"],
  credentials: true,
}
))
app.use(express.json())

// routes
app.use("/api/auth", authRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/sessions", sessionRoutes)
app.use("/api/chat", chatRoutes)
// app.use("/api/feedback", feedbackRoutes);

// ✅ CREATE HTTP SERVER FIRST
const server = http.createServer(app)

// ✅ THEN CREATE SOCKET.IO WITH SAME SERVER
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
})

// ✅ PASS SAME IO
socketHandler(io)

// ✅ START SERVER
const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT)
})

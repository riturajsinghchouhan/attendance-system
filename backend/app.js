import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/attendance", attendanceRoutes);

// DB + Server Start
connectDB();
const PORT =  5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

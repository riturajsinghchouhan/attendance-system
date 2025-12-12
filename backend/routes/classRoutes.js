import express from "express";
import { createClass, getAllClasses, getClassById, generateClassQR } from "../controllers/classController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Create new class
router.post("/", authMiddleware, createClass);

// ✅ Get all classes
router.get("/", authMiddleware, getAllClasses);

// ✅ Get single class by ID
router.get("/:id", authMiddleware, getClassById);

// ✅ Generate QR for class
router.get("/qr/:id", authMiddleware, generateClassQR);

export default router;

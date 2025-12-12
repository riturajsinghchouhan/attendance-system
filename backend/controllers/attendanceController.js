import Attendance from "../models/Attendance.js";
import mongoose from "mongoose";

// Classroom location sample (faculty sets when creating class)
const CLASSROOM_COORDS = { lat: 22.7196, lng: 75.8577 }; // Example: Indore
const MAX_DISTANCE = 50; // meters
const CHECK_LOCATION = false; // 🔹 Change to true in production

function haversineDistance(coords1, coords2) {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371e3; // Earth radius in meters

  const dLat = toRad(coords2.lat - coords1.lat);
  const dLon = toRad(coords2.lng - coords1.lng);

  const lat1 = toRad(coords1.lat);
  const lat2 = toRad(coords2.lat);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export const markAttendance = async (req, res) => {
  try {
    const { classId, studentId, location } = req.body;

    if (CHECK_LOCATION) {
      // ✅ Location validation enabled
      const distance = haversineDistance(CLASSROOM_COORDS, location);
      if (distance > MAX_DISTANCE) {
        return res.status(400).json({ message: "You are not in the classroom area" });
      }
    } else {
      console.log("⚠️ Location check skipped (testing mode)");
    }

    const newAttendance = await Attendance.create({
      classId,
      studentId,
      location,
      status: "present",
    });

    res.status(201).json({ message: "Attendance marked", attendance: newAttendance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getClassAttendance = async (req, res) => {
  try {
    const { classId } = req.params;
console.log("Fetching attendance for classId:", classId);

    // Check if valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({ message: "Invalid classId" });
    }

    const attendance = await Attendance.find({ classId: new mongoose.Types.ObjectId(classId) })
      .populate("studentId", "name rollNumber");

    res.json(attendance);
  } catch (error) {
    console.error("❌ Error in getClassAttendance:", error);
    res.status(500).json({ message: error.message });
  }
};
import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  timestamp: { type: Date, default: Date.now },
  location: {
    lat: Number,
    lng: Number,
  },
  status: { type: String, enum: ["present", "absent"], default: "present" },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;

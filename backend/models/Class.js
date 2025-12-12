import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  subject: { type: String, required: true },
  classCode: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Class = mongoose.model("Class", classSchema);

export default Class;

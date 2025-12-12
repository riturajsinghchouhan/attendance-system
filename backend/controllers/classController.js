import ClassModel from "../models/Class.js";
import QRCode from "qrcode";

export const createClass = async (req, res) => {
  try {
    const { subject, classCode } = req.body;
    const newClass = new ClassModel({
      subject,
      classCode,
      faculty: req.user.id, // assuming faculty info from auth
    });
    await newClass.save();
    res.json(newClass);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllClasses = async (req, res) => {
  try {
    const classes = await ClassModel.find({ faculty: req.user.id });
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getClassById = async (req, res) => {
  try {
    const cls = await ClassModel.findById(req.params.id);
    if (!cls) return res.status(404).json({ message: "Class not found" });
    res.json(cls);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const generateClassQR = async (req, res) => {
  try {
    const classId = req.params.id;
    const qrImage = await QRCode.toDataURL(`attendance:${classId}`);
    res.json({ qrImage });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

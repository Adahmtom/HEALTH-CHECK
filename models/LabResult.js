const mongoose = require("mongoose");

const LabResultSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  testName: { type: String, required: true },
  result: { type: String, required: true },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
});

module.exports = mongoose.model("LabResult", LabResultSchema);

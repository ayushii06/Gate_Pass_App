// models/leavelog.model.js

const mongoose = require("mongoose");

const leaveLogSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  gatePass: { type: mongoose.Schema.Types.ObjectId, ref: "GatePass", required: true },
  type: { type: String, enum: ["exit", "entry"], required: true },
  timestamp: { type: Date, default: Date.now },
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("LeaveLog", leaveLogSchema);

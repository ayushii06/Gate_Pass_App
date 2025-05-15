const mongoose = require("mongoose");

const gatePassSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  leaveApplication: { type: mongoose.Schema.Types.ObjectId, ref: "LeaveApplication", required: true },
  issuedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  issuedAt: { type: Date, default: Date.now },
  qrData: { type: String }, // base64 image or URL if hosted externally
  status: { type: String, enum: ["issued", "used", "expired"], default: "issued" }
}, {timestamps:true});

module.exports = mongoose.model("GatePass", gatePassSchema);

const mongoose = require("mongoose");

const leaveFormSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  roomNo:{type:String,required:true},
  reason: { type: String, required: true, maxlength: 500 },
  type: { type: String, enum: ["emergency", "event", "personal", "medical"], required: true },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  address:{type:String,required:true},
  status: {
    type: String,
    enum: ["Assistant", "HOD", "DOSA", "Warden", "Office", "Rejected"],
    default: "Assistant"
  },
  phoneNo:{type:String,required:true},
  rejectionReason: String,
  documents: [String], // URLs or paths of uploaded files
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
}, { timestamps: true });

module.exports = mongoose.model("LeaveForm", leaveFormSchema);

const QRCode = require("qrcode");
const LeaveApplication = require("../models/Leave");
const GatePass = require("../models/GatePass");
const User = require("../models/User");
const LeaveLog = require("../models/LeaveLog");

exports.generateQR = async (req, res) => {
    try {
        const leave = await LeaveApplication.findById(req.params.leaveId).populate("student");

        if (!leave || leave.status !== "Office") {
            return res.status(400).json({ message: "Leave not approved or not found" });
        }

        // 🔍 Expire any active (non-expired) gate pass for this student
        await GatePass.updateMany(
            { student: leave.student._id, status: { $ne: "expired" } },
            { $set: { status: "expired", expiredAt: new Date() } }
        );

        // 📦 QR Payload
        const qrPayload = {
            studentId: leave.student._id,
            name: leave.student.name,
            roll: leave.student.rollNo,
            room: leave.roomNo,
            from: leave.fromDate,
            to: leave.toDate,
            leaveId: leave._id,
            issuedAt: new Date().toISOString()
        };

        const qrDataURL = await QRCode.toDataURL(JSON.stringify(qrPayload));

        // 🆕 Create new gate pass
        const newPass = await GatePass.create({
            student: leave.student._id,
            leaveApplication: leave._id,
            issuedBy: req.user.id,
            qrData: qrDataURL,
            status: "issued", // explicitly setting status
        });

        // ✉️ Optional: Send email
        await sendMail(
            leave.student.email,
            "🎫 Your Gate Pass is Ready",
            `Hello ${leave.student.name},\n\nYour gate pass has been generated.\nLeave Duration: ${leave.fromDate} to ${leave.toDate}\n\nPlease show the QR code at the gate for scanning.\n\nRegards,\nHostel Office`
        );

        res.status(200).json({success:true, message: "✅ Gate pass generated", gatePass: newPass });

    } catch (err) {
        console.error(err);
        res.status(500).json({success:false, message: "❌ Failed to generate gate pass", error: err.message });
    }
};

exports.getMyAllGatePasses = async(req,res)=>{
    try {
        const pass = await GatePass.find({ student: req.user.id }).sort({ createdAt: -1 }).populate("leaveApplication");
        return res.status(200).json({ success:true,gatePasses: pass });
    } catch (err) {
        return res.status(500).json({success:false, message: "Error fetching gate pass" });
    }
};

exports.getCurrentGatePass = async (req, res) => {
    try {
        const studentId = req.user.id;

        const activePass = await GatePass.findOne({
            student: studentId,
            status: "issued"
        }).populate("leaveApplication");

        if (!activePass) {
            return res.status(404).json({success:false, message: "No active gate pass found" });
        }

        return res.status(200).json({
            success: true,
            gatePass: activePass,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({success:false, message: "Failed to fetch current gate pass" });
    }
};

exports.scan = async (req, res) => {
  try {
    const { qrData } = req.body;

    if (!qrData) {
      return res.status(400).json({ message: "QR data is required" });
    }

    const data = JSON.parse(qrData);
    const { studentId, leaveId, email } = data;

    const gatePass = await GatePass.findOne({ student: studentId, leaveApplication: leaveId });
    if (!gatePass) {
      return res.status(404).json({success:false, message: "Gate pass not found" });
    }

    if (gatePass.status === "expired") {
      return res.status(403).json({success:false, message: "Gate pass is expired" });
    }

    const lastLog = await LeaveLog.findOne({ gatePass: gatePass._id }).sort({ timestamp: -1 });
    const nextType = lastLog?.type === "exit" ? "entry" : "exit";

    // Create new log entry
    const log = await LeaveLog.create({
      student: studentId,
      gatePass: gatePass._id,
      type: nextType,
      verifiedBy: req.user.id,
    });

    // Update gate pass status accordingly
    if (nextType === "exit") {
      gatePass.status = "used";
      await gatePass.save();
      await User.findByIdAndUpdate(studentId,{status:"outside"});
    } else if (nextType === "entry") {
      gatePass.status = "expired"; // Final status after return
      await gatePass.save();
      await User.findByIdAndUpdate(studentId,{status:"inside"});
    }

    // Optional: Send email
    if (email) {
      const msg =
        nextType === "exit"
          ? "🚪 You have exited the campus. Safe journey!"
          : "🎓 You have re-entered the campus. Welcome back!";
      await sendMail(email, `Campus ${nextType.toUpperCase()} Recorded`, msg);
    }

    res.status(200).json({
      success:true,
      message: `✅ ${nextType.toUpperCase()} recorded successfully`,
      log,
      gatePassStatus: gatePass.status,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({success:false, message: "QR scan failed", error: err.message });
  }
};

exports.outOfStationStudents = async(req,res)=>{
    try{
        const outStation = await User.find({status:"outside"});
        if(!outStation){
            return res.status(404).json({
                success:false,
                message:"Students not fetched",
            });
        }
        return res.status(200).json({
            success:true,
            message:"Students fetched.",
            outStation,
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Students list not fetched",
            error:err.message,
        });
    }
};
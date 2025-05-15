const User = require("../models/User");
const LeaveApplication = require("../models/LeaveForm");

exports.leaveApply = async(req,res)=>{
    try {
        const userId = req.user.id;
        const {
        reason, fromDate, toDate,
        typeOfLeave, documents,phoneNo,address,roomNo
        } = req.body;

        // Check date validity
        if (!isAtLeast72HoursLater(fromDate)) {
        return res.status(400).json({ message: "⛔ Leave must be applied at least 72 hours in advance." });
        }

        const newLeave = new LeaveApplication({
        student: req.user.id,
        reason,
        fromDate,
        toDate,
        type:typeOfLeave,
        documents,
        phoneNo,
        address,
        roomNo,
        });

        await newLeave.save();
        res.status(201).json({success:true, message: "✅ Leave application submitted", leaveId: newLeave._id });

    } catch (err) {
        console.error(err);
        res.status(500).json({success:false, message: "Server error submitting leave" });
    }
};

exports.getMyApplications = async(req,res)=>{
    try {
        const leaves = await LeaveApplication.find({ student: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json({ success:true,applications: leaves });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success:false,message: "Error fetching leave applications" });
    }
};

exports.getAllApplications = async(req,res)=>{
    try {
        const userType = req.user.accountType;
        const pendingLeaves = await LeaveApplication.find({ status: accountType });
        res.status(200).json({ success:true,pendingLeaves });
    } catch (err) {
        res.status(500).json({success:false, message: "Error fetching HOD pending leaves" });
    }
};

exports.getApplicationDetails = async(req,res)=>{
    try{
        const leaveId = req.body;
        const leaveDetails = await LeaveApplication.find(leaveId).populate('student');
        return res.json({
            success:true,
            status:200,
            leaveDetails,
        });
    }
    catch(err){
        return res.json({
            success:false,
            status:500,
            message:"Error fetching details of leave form",
        });
    }
}

exports.approveApplication = async (req, res) => {
    try {
        const {leaveId} = req.body;
        const userType = req.user.accountType; 

        // Find the leave by ID
        const leave = await LeaveApplication.findById(leaveId);
        if (!leave) {
            return res.status(404).json({
                success: false,
                message: "Leave application not found",
            });
        }

        // Check if current status matches the user's role (to prevent duplicate approvals)
        if (leave.status !== userType) {
            return res.status(403).json({
                success: false,
                message: `You are not authorized to approve at the '${leave.status}' stage`,
            });
        }

        // Define approval flow
        const approvalFlow = ['Assistant', 'HOD', 'DOSA', 'Warden', 'Office'];
        const currentIndex = approvalFlow.indexOf(leave.status);

        if (currentIndex === -1 || currentIndex === approvalFlow.length - 1) {
            return res.status(400).json({
                success: false,
                message: "Leave already at final stage or invalid status",
            });
        }

        // Move to next stage
        leave.status = approvalFlow[currentIndex + 1];
        leave.updatedAt = new Date();
        await leave.save();

        return res.json({
            success: true,
            message: `✅ Leave forwarded to ${leave.status}`,
            leave,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "❌ Error approving leave",
        });
    }
};

exports.rejectApplication = async (req, res) => {
    try {
        const { reason,leaveId } = req.body;
        const userType = req.user.accountType;

        const leave = await LeaveApplication.findById(leaveId).populate("student");
        if (!leave) {
            return res.status(404).json({ success: false, message: "Leave not found" });
        }

        // Only allow rejection at the current approval stage
        if (leave.status !== userType) {
            return res.status(403).json({
                success: false,
                message: `You are not authorized to reject at the '${leave.status}' stage`,
            });
        }

        // Update leave status and reason
        leave.status = "Rejected";
        leave.rejectionReason = reason;
        leave.updatedAt = new Date();
        await leave.save();

        // Send rejection email to student
        await sendMail(
            leave.student.email,
            "❌ Leave Application Rejected",
            `Hello ${leave.student.name},\n\nYour leave request has been rejected by the ${userType}.\n\nReason: ${reason}\n\nRegards,\n${userType}`
        );

        res.json({ success: true, message: "❌ Leave rejected", reason });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error rejecting leave" });
    }
};
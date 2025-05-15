const express = require("express");
const router = express.Router();

const {leaveApply,getMyApplications,getAllApplications, getApplicationDetails,approveApplication,rejectApplication} = require("../controllers/Leave");
const{auth} = require("../middlewares/auth");

router.post("/applyLeave", auth, isStudent, leaveApply);
router.post("/getMyApplications", auth, isStudent, getMyApplications);
router.post("/signUp", signUp);

router.post("/getAllApplications",auth,getAllApplications);

router.post("/getApplicationDetails",auth,getApplicationDetails);

router.post("/approveApplication",auth,approveApplication);

router.post("/rejectApplication",auth,rejectApplication);

module.exports = router;
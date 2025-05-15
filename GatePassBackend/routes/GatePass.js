const express = require("express");
const router = express.Router();

const {generateQR,getMyAllGatePasses,getCurrentGatePass,scan,outOfStationStudents} = require("../controllers/GatePass");

const{auth} = require("../middlewares/auth");

router.post("/generateQR", auth, isOffice, generateQR);

router.get("/getMyAllGatePasses", auth, isStudent, getMyAllGatePasses);

router.get("/getCurrentGatePass",auth,isStudent,getCurrentGatePass);

router.post("/scan",auth,isGuard,scan);

router.post("/outOfStationStudents",auth,isOffice,outOfStationStudents);

module.exports = router;
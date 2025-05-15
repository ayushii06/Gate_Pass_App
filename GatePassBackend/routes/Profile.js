const express = require("express");
const router = express.Router();

const {updateProfile,getAllUserDetails,deleteAccount} = require("../controllers/Profile");
const{auth} = require("../middlewares/auth");

router.delete("/deleteProfile", deleteAccount);
router.put("/updateProfile",auth,updateProfile);
router.get("/getUserDetails",auth,getAllUserDetails);

module.exports = router;
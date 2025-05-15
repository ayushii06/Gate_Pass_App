const express = require("express");
const router = express.Router();

const {login, signUp,sendOTP,changePassword} = require("../controllers/Auth");
const {resetPassword,resetPasswordToken} = require("../controllers/ResetPassword");
const{auth} = require("../middlewares/auth");

router.post("/login", login);
router.post("/signUp", signUp);

//testing route
router.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:'Welcome to protected route for test',
    })
})

router.post("/sendOTP",sendOTP);
router.post("/changePassword",auth,changePassword);

router.post("/reset-password",resetPassword);
router.post("/reset-password-token",resetPasswordToken);


module.exports = router;
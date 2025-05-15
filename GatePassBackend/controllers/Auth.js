const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");

//send otp
exports.sendOTP = async (req,res)=>{
    try{
        //fetch email 
        const {email} = req.body;
        //check if user already exist 
        const checkUserPresent = await User.findOne({email});
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:'User already Exist',
            })
        }
        //generate otp 
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets: false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        let result = await OTP.findOne({otp:otp});
        while(result){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets: false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
            result = await OTP.findOne({otp:otp});
        }
        const otpPayload = {email,otp};
        //create entry for otp 
        const otpBody = await OTP.create(otpPayload);
        res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            otpBody,
        })
    }
    catch(error){
        res.status(200).json({
            success:false,
            message:'Error while sending otp',
        })
    }
}

//signup 
exports.signUp = async (req,res)=>{
    try{
            //data fetch 
        const {
            email,password,confirmPassword,firstName,lastName,accountType,otp
        } = req.body;

        //check all fields are filled or not
        if(!firstName||!lastName||!email||!password||!confirmPassword||!otp/*why otp?? otp is sent after confirmation or validation signup so it is not present before*/  ){
           
            return res.status(403).json({
                success:false,
                messsage:"All fields are not filled",
            })
        }
        //password and confirmPassword should be same 
        if(password !== confirmPassword){
          
            return res.status(400).json({
                success:false,
                message:'Password and Confirm Password does not match.',
            })
        }
        //existing user 
        const existingUser = await User.findOne({email});
        if(existingUser){
          
            res.status(200).json({
                success:false,
                message:'User Already exist',
            })
        }
        //most recent otp match*******
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
      
        //validate otp 
        if(recentOtp.length == 0){
            //otp not found
           console.log("yaha1")
            return res.status(400).json({
                success:false,
                message:'OTP not found',
            })
        }
        else if(otp !== recentOtp[0].otp){
            //invalid otp
            console.log("yaha2")
            return res.status(400).json({
                success: false,
                message:'Invalid Otp',
            })
        }
        //hash password using bcrypt
        const hashedPassword = await bcrypt.hash(password,10);

        //create profile details for saaving user entry of signup in db
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        });
        //user entry saving in db 
        const user = await User.create({
            firstName,lastName,email,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebar.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })
        return res.status(200).json({
            success:true,
            message:'User Registered Successfully',
        })
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:'Error while signUp',
        })
    }
    
}

//login 
exports.login = async (req,res)=>{
    try{
        //get data from req.body 
        const {email,password} = req.body;
        //validation of data
        if(!email||!password){
            return res.status(403).json({
                success:false,
                message:'Fill all the entries in login',
            });
        }
        //fetch user details by email 
        let user = await User.findOne({email}).populate("additionalDetails");
        // if user doesn't exist
        if(!user){
            return res.status(401).json({
                success:false,
                message:'User Not Exist. Try Signup',
            });
        }
        //check password and generate jwt
        const payload = {
            email:user.email,
            id:user._id,
            accountType:user.accountType,
        }
        if(await bcrypt.compare(password,user.password)){
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn:"2h",
            });
            user = user.toObject();
            user.token = token;
            user.password = undefined;

            //create cookie 
            const options = {
                expiresIn: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:'Logged in Successfully',
            })
        }
        else{
            //incorrect password 
            return res.status(401).json({
                success:false,
                message:'Incorrect Password',
            })
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:'Error while login',
        })
    }
}

//change password
exports.changePassword = async (req, res) => {
    try {
      // Get user data from req.user
      const userDetails = await User.findById(req.user.id)
      
  
      // Get old password, new password, and confirm new password from req.body
      const { oldPassword, newPassword } = req.body
      
  
      // Validate old password
      const isPasswordMatch = await bcrypt.compare(
        oldPassword,
        userDetails.password
      )
      if (!isPasswordMatch) {
        // If old password does not match, return a 401 (Unauthorized) error
        return res
          .status(401)
          .json({ success: false, message: "The password is incorrect" })
      }
  
      // Update password
      const encryptedPassword = await bcrypt.hash(newPassword, 10)
      const updatedUserDetails = await User.findByIdAndUpdate(
        req.user.id,
        { password: encryptedPassword },
        { new: true }
      )
  
      // Send notification email
      try {
        const emailResponse = await mailSender(
          updatedUserDetails.email,
          "Password for your account has been updated",
          passwordUpdated(
            updatedUserDetails.email,
            `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
          )
        )
        console.log("Email sent successfully:", emailResponse.response)
      } catch (error) {
        // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
        console.error("Error occurred while sending email:", error)
        return res.status(500).json({
          success: false,
          message: "Error occurred while sending email",
          error: error.message,
        })
      }
  
      // Return success response
      return res
        .status(200)
        .json({ success: true, message: "Password updated successfully" })
    } catch (error) {
      // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while updating password:", error)
      return res.status(500).json({
        success: false,
        message: "Error occurred while updating password",
        error: error.message,
      })
    }
  }
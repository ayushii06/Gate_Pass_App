const Profile = require("../models/Profile");
const User = require("../models/User");

exports.updateProfile = async(req,res)=>{
    try{
        //get data 
        const {dateOfBirth=""/*it means default empty*/,about="",contactNumber,gender} = req.body;
        //get user id 
        const id = req.user.id;
        //validation 
        if(!contactNumber||!gender||!id){
            return res.status(400).json({
                success:false,
                message:'Fill All Details for Profile',
            });
        }
        //find profile 
        //profile ke id nhi hai but user ki id hai aur user ke andr profile ki id hai 
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        //update profile 
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();

        return res.status(200).json({
            success:true,
            message:'Profile created Successfully'
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Error while creating Profile',
        })
    }
}

exports.deleteAccount = async(req,res)=>{
    try{
        //get id 
        const id = req.user.id;//id nikal li kyonki logged in thi 
        //validation
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:'User not found',
            })
        }
        //phle profile delete ki 
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        // ..hw*****unenroll user from all enrolled courses

        //delete user 
        await User.findByIdAndDelete({_id:id});

        return res.status(200).json({
            success:true,
            message:'Account Deleted Successfully'
        })
        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Error while deleting Account'
        })
    }
}

exports.getAllUserDetails = async(req,res)=>{
    try{
        //get id
        const id = req.user.id;
        //validate and get user details 
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        return res.status(200).json({
            success:true,
            message:'User Data fetched Successfully',
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Error while fetching User Details'
        })
    }
}
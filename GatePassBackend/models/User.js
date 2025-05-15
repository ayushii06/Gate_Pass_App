const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    rollNo:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    accountType:{
        type:String,
        enum: ["Assistant","Student","HOD","DOSA","Warden","Office","Guard"],
        required:true
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile"
    },
    token:{
        type:String,
    },
    resetPasswordExpires:{
        type: Date,
    },
    status: {
    type: String,
    enum: ["inside", "outside"],
    default: "inside"
    }
});

module.exports = mongoose.model("User", userSchema);
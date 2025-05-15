const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth
exports.auth = async (req,res,next)=>{
    try{
        //extract token 
        const token = req.cookies.token || req.header("Authorization").replace("Bearer ","") || req.body.token;
        //if token is not present 
        if(!token){
            return res.status(401).json({
                success:false,
                message:'Token is missing',
            });
        }
        //verify token 
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode
        }
        catch(error){
            //verification issue 
            return res.status(401).json({
                success:false,
                message:'Token is Invalid',
            });
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:'Something went wrong in validating token',
        })
    }
}
 //is Student 
 exports.isStudent = async (req,res,next)=>{
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:'This is portal for student',
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified',
        });
    }
 };
 
 exports.isAssistant = async (req,res,next)=>{
    try{
        if(req.user.accountType !== "Assistant"){
            return res.status(401).json({
                success:false,
                message:'This is portal for Assistant',
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified',
        });
    }
 }

 //isHOD
 exports.isHOD = async (req,res,next)=>{
    try{
        if(req.user.accountType !== "HOD"){
            return res.status(401).json({
                success:false,
                message:'This is portal for HOD',
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified',
        });
    }
 };

 //isDOSA
 exports.isDOSA = async (req,res,next)=>{
    try{
        if(req.user.accountType !== "DOSA"){
            return res.status(401).json({
                success:false,
                message:'This is portal for DOSA',
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified',
        });
    }
 };

 //isWarden
 exports.isWarden = async (req,res,next)=>{
    try{
        if(req.user.accountType !== "Warden"){
            return res.status(401).json({
                success:false,
                message:'This is portal for Warden',
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified',
        });
    }
 };

 //isOffice
 exports.isOffice = async (req,res,next)=>{
    try{
        if(req.user.accountType !== "Office"){
            return res.status(401).json({
                success:false,
                message:'This is portal for Office',
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified',
        });
    }
 };

 //isGuard
 exports.isGuard = async (req,res,next)=>{
    try{
        if(req.user.accountType !== "Guard"){
            return res.status(401).json({
                success:false,
                message:'This is portal for Guard',
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified',
        });
    }
 };


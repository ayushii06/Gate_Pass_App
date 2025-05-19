import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../slice/authSlice'
import profileReducer from "../slice/profileSlice";
import attendanceReducer from "../slice/attendanceSlice";
import branchReducer from "../slice/branchSlice";
import courseReducer from "../slice/courseSlice";
import themeReducer from "../slice/themeSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    profile:profileReducer,
    course:courseReducer,
    branch:branchReducer,
    attendance:attendanceReducer,
    theme:themeReducer
})

export default rootReducer
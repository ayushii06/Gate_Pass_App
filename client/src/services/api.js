const BASE_URL = "http://localhost:5000/api/v1"

// AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendOTP",
    SIGNUP_API: BASE_URL + "/auth/signUp",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changePassword",
}

// GATE PASS ENDPOINTS
export const leaveEndpoints = {
    APPLY_FOR_LEAVE_FORM:BASE_URL+"/leave/applyLeave", //student submit leave form
    GET_ALL_LEAVE_REQUESTS:BASE_URL+"/leave/getMyApplications", //students all application
    GET_ALL_PENDING_LEAVE_REQUESTS:BASE_URL+"/leave/getAllApplications", //everyone
    GET_LEAVE_DETAILS_BY_ID:BASE_URL+"/leave/getApplicationDetails", //get all info about leave - all 
    APPROVE_LEAVE:BASE_URL+"/leave/approveApplication",
    REJECT_LEAVE:BASE_URL+"/leave/rejectApplication",
}

export const gatePassEndpoints = {
    GENERATE_QR:BASE_URL+`/gate-pass/generateQR/:leaveId`, //HOSTEL OFFICE ONLY
    GET_MY_ALL_GATE_PASSES:BASE_URL+"/gate-pass/getMyAllGatePasses", //
    GET_CURRENT_GATE_PASSES:BASE_URL+"/gate-pass/getCurrentGatePass", //
    SCAN_QR:BASE_URL+"/gate-pass/scan", //only guard
    SCAN_BY_ID:BASE_URL+"/gate-pass/scanById",
    OUT_OF_STATION:BASE_URL+"/gate-pass/outOfStationStudents", //hostel office only
}

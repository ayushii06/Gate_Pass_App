import { apiConnector } from "../apiconnector"
import { endpoints } from "../api"
import {ACCOUNT_TYPE} from '../../utils/constants'
import {setUser} from '../../slice/profileSlice'
import {setToken,setLoading} from '../../slice/authSlice'

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
  CHANGE_PASSWORD_API
} = endpoints

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    try {
      console.log(email)
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        // //toast.error(response.data.message || "Can't send OTP")
        return;
      }
      navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
    }
  }
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  // branch,
  // rollNo,
  // year,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    // const //toastId = //toast.loading("Loading...")
    try {
      console.log(accountType,firstName,lastName,email,password,confirmPassword,otp)
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        // branch,
        // rollNo,
        // year,
        password,
        confirmPassword,
        otp,
      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      //toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      //toast.error("Signup Failed")
      navigate("/signup-student")
    }
    // dispatch((false))
    //toast.dismiss(//toastId)
  }
}

export function login(email, password, navigate) {
  console.log("LOGIN API CALLED",LOGIN_API)
  return async (dispatch) => {
  
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      // console.log("LOGIN API RESPONSE............", response)
      dispatch(setToken(response.data.token))
      dispatch(setUser({ ...response.data.user }))
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))
      console.log("ACCOUNT TYPE", response.data.user.accountType)
      if(response.data.user.accountType==ACCOUNT_TYPE.STUDENT){
        navigate('/student-dashboard')
      }else if(response.data.user.accountType==ACCOUNT_TYPE.HOSTEL_OFFICE){
        navigate('/hostel-dashboard')
      }else if(response.data.user.accountType==ACCOUNT_TYPE.GUARD){
        navigate('/guard-dashboard')
      }else{
        navigate('/admin-dashboard')
      }

    } catch (error) {
      console.log("LOGIN API ERROR............", error)
    }
    dispatch(setLoading(false))
  }
}


export function logout(navigate) {
  console.log("navigate called")
  return async (dispatch) => {
    // const //toastId = //toast.loading("Loading...")
    try {
      dispatch(setToken(null))
      dispatch(setUser(null))
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      //toast.success("Logged Out")
      navigate("/")
      
    } catch (error) {
      console.log("eror")
    }
    //toast.dismiss(//toastId)
  }
}

export function getPasswordResetToken(email , setEmailSent) {
  return async(dispatch) => {
    // dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {email})

      console.log("RESET PASSWORD TOKEN RESPONSE....", response);

      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      //toast.success("Reset Email Sent");
      setEmailSent(true);
    }
    catch(error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      //toast.error("Failed to send email for resetting password");
    }
    // dispatch(setLoading(false));
  }
}

export function resetPassword(password, confirmPassword, token) {
  return async(dispatch) => {
    // dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST", RESETPASSWORD_API, {password, confirmPassword, token});

      console.log("RESET Password RESPONSE ... ", response);


      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      //toast.success("Password has been reset successfully");
    }
    catch(error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      //toast.error("Unable to reset password");
    }
    // dispatch(setLoading(false));
  }
}

export function changePassword(oldPassword, newPassword, confirmPassword, token) {
  return async(dispatch) => {
    // dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST", CHANGE_PASSWORD_API, {oldPassword, newPassword, confirmPassword},{
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
    });

      console.log("CHANGE Password RESPONSE ... ", response);


      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      //toast.success("Password has been changed successfully");
    }
    catch(error) {
      console.log("CHANGE PASSWORD TOKEN Error", error);
      //toast.error(error.response?.data?.message || "Unable to change password");
    }
    // dispatch(setLoading(false));
  }
}
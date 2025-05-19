import { apiConnector } from "../apiconnector"
import { leaveEndpoints } from "../api"
import {ACCOUNT_TYPE} from '../../utils/constants'

const {APPLY_FOR_LEAVE_FORM,REJECT_LEAVE,GET_ALL_LEAVE_REQUESTS,GET_ALL_PENDING_LEAVE_REQUESTS,GET_LEAVE_DETAILS_BY_ID,APPROVE_LEAVE} = leaveEndpoints;

//only for student
export async function submitLeave(credentials,token) {
      try {
        
        const response = await apiConnector("POST", APPLY_FOR_LEAVE_FORM, {
          reason:credentials.reason,
          fromDate:credentials.date_from,
          toDate:credentials.date_to,
          typeOfLeave:credentials.nature_of_leave,
          documents:credentials.document,
          phoneNo:credentials.mobileNo,
          roomNo:credentials.roomNo,
          address:credentials.address_during_leave,
        },{Authorization:`Bearer ${token}`})
  
        console.log("Submit leave RESPONSE............", response)
  
        if (!response.data.success) {
          console.log("error")
          return;
        }

        return true;

  
      } catch (error) {
        console.log("LOGIN API ERROR............", error)
      }
      
    
  }

export async function getAllLeave(token){
    try {
        const response = await apiConnector("POST",GET_ALL_LEAVE_REQUESTS,{Authorization:`Bearer ${token}`});
        console.log(response.data.applications);

        if(!response.data.success){
          console.log("error");
          return [];
        }

        return response.data.applications;

    } catch (error) {
        console.log("error",error)
    }
}

export async function getAllPendingLeaves(token){
  try {
        const response = await apiConnector("POST",GET_ALL_PENDING_LEAVE_REQUESTS,{Authorization:`Bearer ${token}`});
        console.log(response);

        if(!response.data.success){
          console.log("error");
          return ;
        }

        return response.data.pendingLeaves
    } catch (error) {
        console.log("error",error)
    }
}

export async function getLeaveDetails(leaveID, token) {
  try {
    const response = await apiConnector("POST", GET_LEAVE_DETAILS_BY_ID,{leaveId:leaveID},{Authorization:`Bearer ${token}`});
    console.log("response",response)

    if (!response.data.success) {
     return [];
    }

    return response.data.leaveDetails


  } catch (error) {
    console.error('Error fetching leave details:', error);
    return [];
  }
}

export async function approveLeave(leaveID,token){
  try {
    const response = await apiConnector("POST",APPROVE_LEAVE,{
      leaveId:leaveID
    },
    {
      Authorization:`Bearer ${token}`
    }
    )

    if(!response.data.success){
      return false;
    }

    return response.data.leave;
  } catch (error) {
    return false;
  }
}

export async function rejectLeave(leaveID,reason,token){
  try {
    const response = await apiConnector("POST",REJECT_LEAVE,{
      leaveId:leaveID
    },
    {
      Authorization:`Bearer ${token}`
    }
    )

    console.log(response);

    if(!response.success){
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}

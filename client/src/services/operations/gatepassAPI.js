import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { gatePassEndpoints } from "../api"
import { ACCOUNT_TYPE } from '../../utils/constants'

const { GENERATE_QR, GET_MY_ALL_GATE_PASSES, GET_CURRENT_GATE_PASSES, SCAN_QR ,OUT_OF_STATION,SCAN_BY_ID} = gatePassEndpoints;


export async function generateQRCode(leaveId,token) {
  try {
    console.log(leaveId)
    const url = GENERATE_QR.replace(':leaveId', leaveId.requestID);
    console.log(url)
    const response = await apiConnector("POST", url, {
      Authorization: `Bearer ${token}`
    })
    console.log("Submit leave RESPONSE............", response)

    if (!response.data.success) {
      return [];
    }

    return response.data.gatePass;

  } catch (error) {
    console.log("LOGIN API ERROR............", error)
  }
}

export async function getMyAllGatePasses(token) {
  try {
    const response = await apiConnector("POST", GET_MY_ALL_GATE_PASSES, { Authorization: `Bearer ${token}` })

    console.log(response)
    if (!response.data.success) {
      console.log("error");
      return null;
    }

    return response.data.gatePasses;
  } catch (error) {
    console.error('Error fetching leave details:', error);
    return null;
  }
}

export async function getCurrentGatePass(token) {
  try {
    const response = await apiConnector("POST", GET_CURRENT_GATE_PASSES, { Authorization: `Bearer ${token}` });

    console.log(response)

    if (!response.data.success) {
      return null;
    }

    return response.data.gatePass


  } catch (error) {
    console.error('Error fetching leave details:', error);
    return null;
  }
}

export async function scanQR(qrData, token) {
  try {
    const response = await apiConnector("POST", SCAN_QR, { qrData }, { Authorization: `Bearer ${token}` });

    if (!response.data.success) {
      return response.data;
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching leave details:', error);
    return null;
  }
}

export async function scanById(gatePassId, token) {
  try {
    const response = await apiConnector("POST", SCAN_BY_ID, { gatePassId }, { Authorization: `Bearer ${token}` });

    console.log("dfbgdg",response)

    if (!response.data.success) {
      return response.data;
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching leave details:', error);
    return null;
  }
}


export async function outOfStationStudents(token) {
  try {
    const response = await apiConnector("POST", OUT_OF_STATION, { Authorization: `Bearer ${token}` });

    if (!response.data.success) {
      return response.data.message;
    }

    return response.data.outStation;
  } catch (error) {
    console.error('Error fetching leave details:', error);
    return null;
  }
}


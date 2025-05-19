import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Clock, Calendar, FileText, User2Icon, Calendar1Icon, TimerIcon, TimerOffIcon, FormInput, LocateIcon, Phone } from "lucide-react";
import logo from '../../../assets/logo.png'
import { approveLeave, getLeaveDetails } from "../../../services/operations/leaveAPI";
import { formatDate } from "../../../utils/formatDate"


const getStatusBadge = (status) => {
  switch (status) {
    case 'pending':
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
    case 'approved':
      return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
    case 'rejected':
      return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>;
    case 'issued':
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Issued</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const ApplicationForm = ({
  isOpen,
  onClose,
  request
}) => {
  if (!request) return null;

  const [leaveDetailsFound, setLeaveDetailsFound] = useState('false');
  const [leaveDetails, setLeaveDetails] = useState([]);

  const getLeaveDetail = async() =>{
    const response = await getLeaveDetails(request, localStorage.getItem("token"));
    console.log("Leave Details", response)

    
      setLeaveDetails(response);
      setLeaveDetailsFound('true');
  
  }

  useEffect(()=>{
    getLeaveDetail();
  },[request]);

  const handleApprove = (requestID) => {
    const response = approveLeave(requestID, localStorage.getItem("token"));
    console.log("response", response);

  }

  const handleReject = (requestID) => {
    const response = approveLeaveByHOD(requestID, localStorage.getItem("token"));
    console.log("response", response);

  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" w-[80%] bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-start text-xl justify-start gap-6">
            <img src={logo} className="w-12 h-12"></img>
            <div className="flex flex-col">
            Student Leave Application Form 
            <span className="text-sm font-normal">ID: {leaveDetails._id}</span>
            </div>

          </DialogTitle>
        </DialogHeader>
        
        {leaveDetailsFound &&
        <div className="space-y-4 py-4">
          <div className="flex items-center gap-2">
            <User2Icon className="h-5 w-5 text-muted-foreground" />
           
              <p className="text-sm font-medium">Name</p>
              <p className="text-sm text-muted-foreground">{leaveDetails?.student?.firstName || "AYUSHI"} {leaveDetails?.student?.lastName ||"PAL"}</p>
            
          </div>
          
          <div className="flex items-center justify-start gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
         
              <p className="text-sm font-medium">Roll No.</p>
              <p className="text-sm text-muted-foreground">{leaveDetails?.student?.rollNo || "22CD3008"}</p>
         
          </div>
          <div className="flex items-center justify-start gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
         
              <p className="text-sm font-medium">Department</p>
              <p className="text-sm text-muted-foreground">{leaveDetails?.student?.branch||"CSD"}</p>
         
          </div>
         
          <div className="flex items-center justify-start gap-2">
            <TimerIcon className="h-5 w-5 text-muted-foreground" />
         
              <p className="text-sm font-medium">Start Date</p>
              <p className="text-sm text-muted-foreground">{formatDate(leaveDetails.fromDate)}</p>
         
          </div>
          <div className="flex items-center justify-start gap-2">
            <TimerOffIcon className="h-5 w-5 text-muted-foreground" />
         
              <p className="text-sm font-medium">End Date</p>
              <p className="text-sm text-muted-foreground">{formatDate(leaveDetails.toDate)}</p>
         
          </div>
          <div className="flex items-center justify-start gap-2">
            <FormInput className="h-5 w-5 text-muted-foreground" />
         
              <p className="text-sm font-medium">Nature Of Leave</p>
              <p className="text-sm text-muted-foreground">{leaveDetails.type}</p>
         
          </div>
          <div className="flex items-center justify-start gap-2">
            <LocateIcon className="h-5 w-5 text-muted-foreground" />
         
              <p className="text-sm font-medium">Address during Leave</p>
              <p className="text-sm text-muted-foreground">{leaveDetails.address}</p>
         
          </div>
          <div className="flex items-center justify-start gap-2">
            <Phone className="h-5 w-5 text-muted-foreground" />
         
              <p className="text-sm font-medium">Mobile Number</p>
              <p className="text-sm text-muted-foreground">{leaveDetails.phoneNo}</p>
         
          </div>
        
        </div>
}
        
        <DialogFooter className="justify-center gap-5 w-full">
          
          {request.status === 'pending' && (
            <>
              <Button type="button" className="px-4 " variant="success">
                Approve
              </Button>
              <Button type="button" className="px-4" variant="danger">
                Reject
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationForm;
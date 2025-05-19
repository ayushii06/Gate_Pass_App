import React from "react";
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
import { Clock, Calendar, FileText, User2Icon, Calendar1Icon, TimerIcon, TimerOffIcon, FormInput, LocateIcon, Phone, Download } from "lucide-react";
import logo from '../../../assets/logo.png'

import { generateGatePassPDF } from '../../common/pdfGenerator';

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

const ApprovedRequest = ({
  isOpen,
  onClose,
  request
}) => {
  if (!request) return null;

  const handleDownloadPDF = async (request) => {
    
    if (!request) return;
    
    try {
      const pdfDataUrl = await generateGatePassPDF({
        id: request.id,
        date: request.date,
        startTime: request.startTime,
        endTime: request.endTime,
        reason: request.reason,
        studentName: "John Doe", // Mock data - in a real app, this would come from user context
        studentId: "ST12345",
        approvedBy: "Dr. Smith",
        approvedOn: new Date().toISOString().split('T')[0]
        // QRCode
      });
      
      // Create an invisible link and trigger download
      const link = document.createElement('a');
      link.href = pdfDataUrl;
      link.download = `gate_pass_${request.id}.pdf`;
      link.click();
      
      toast({
        title: "Gate Pass Downloaded",
        description: "Your gate pass has been downloaded successfully."
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was a problem downloading your gate pass.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" w-[80%] bg-white text-center ">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl ">
            <img src={logo} className="w-12 h-12"></img>
            <div className="px-4">Your Approved Leave Form</div>
          </DialogTitle>
        </DialogHeader>
        
          <div className="flex items-center justify-center">
           
              <Button variant="outline" className="flex text-black items-center gap-1" onClick={() => handleDownloadPDF(request)}>
            <Download className="h-5 w-5 text-muted-foreground" />
                Download Leave Form
                </Button>
          </div>

          or
          
            
         
              <p className="text-sm font-medium">Show the following QR Code at the Gate Pass</p>
              <img src={logo} className="w-52 text-center mx-auto"/>
        
      </DialogContent>
    </Dialog>
  );
};

export default ApprovedRequest;
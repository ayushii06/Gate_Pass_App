import React, { useState } from 'react';
import { Button } from "../component/ui/button";
import { 
  LogIn, 
  LogOut, 
  Check, 
  X 
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../component/ui/dialog";
import QRCodeScanner from "../component/core/gatePass/QRCodeScanner";
import { Navbar } from '../component/common/Navbar';
import { useSelector } from 'react-redux';
import Toast from '../component/ui/toast';
import { scanById, scanQR } from '../services/operations/gatepassAPI';


const GuardDashboard = () => {
  const [toast, setToast] = useState('false');
    const [type, setType] = useState("");
    const [message, setMessage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [showDialog,setShowDialog] = useState('false');
  const [processingStatus, setProcessingStatus] = useState('idle');

  // Handle QR code scan
  const handleScan = async(data) => {
    setProcessingStatus('verifying');
    // Extract pass ID from QR code data
    const qrData = data
    console.log(qrData)
    
    if (!qrData) {
      setToast('true')
      setType('error')
      setMessage('Not able to verify')
      setProcessingStatus('rejected');
      setTimeout(() => {
      setToast('false')
    }
    , 3000)
      return;
    }

    const response = await scanQR(qrData,localStorage.getItem("token"));
    setShowDialog('true')
    console.log(response)


    if(!response.success){
      setToast('true')
      setType('error')
      setMessage(response.message);
      return;
    }

    setToast('true')
      setType('success')
      setMessage(response.message);
    

  };


  // Handle closing the verification dialog
  const handleCloseDialog = () => {
    setScannedPassDetails(null);
    setShowDialog('false')
    //reload the page
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      <Navbar updates={[]} />
              {toast==='true' && <Toast type={type} message={message}/>}

      <h1 className="text-3xl font-bold text-white text-center relative z-40">Security Guard Dashboard</h1>
      
      {/* Guard Info */}
      <div className="flex flex-wrap items-center gap-4 my-12 justify-center mb-4">
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="bg-amber-500 text-amber-800 border-amber-200 hover:bg-amber-100"
            onClick={() => {
              setIsScanning(true);
            }}
          >
            <LogOut className="mr-2 h-4 w-4" /> 
            Scan Gate Pass
          </Button>
          
         
        </div>
      </div>
      
      {/* QR Code Scanner Dialog */}
      <Dialog open={isScanning} className="relative -z-50 " onOpenChange={(open) => !open && setIsScanning(false)}>
        <DialogContent className="sm:max-w-md bg-white text-black overflow-y-scroll h-[80%]">
          <DialogHeader>
            <DialogTitle>
             Scan Pass
            </DialogTitle>
          
          </DialogHeader>
          
          <QRCodeScanner onScanSuccess={handleScan} />
        </DialogContent>
      </Dialog>
      
      {/* Pass Verification Dialog */}
      <Dialog open={showDialog==='true'} onOpenChange={() => handleCloseDialog()}>
        <DialogContent className="sm:max-w-md bg-white text-black">
          <DialogHeader>
            <DialogTitle>
             {message}
            </DialogTitle>
          </DialogHeader>
        
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GuardDashboard;
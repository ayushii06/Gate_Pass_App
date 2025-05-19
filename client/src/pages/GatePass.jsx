
import React, { useState, useEffect } from 'react';
import { Navbar } from '../component/common/Navbar';
import { generateQRCode } from '../services/operations/gatepassAPI';
import { useParams } from 'react-router-dom';
import { generateGatePassPDF } from '../component/common/pdfGenerator';
import { Button } from '../component/ui/button';
import { Download } from 'lucide-react';

function HostelOfficeDashboard() {
    const [QRData,setQRData] = useState(null);

    const leaveId=useParams();
    

  const generateGatePass = async() => {
    const response = await generateQRCode(leaveId,localStorage.getItem("token"));

    
    if (response?.status==='issued') {
      setQRData(response);
    } else {
    }
  }

  useEffect(()=>{
    generateGatePass();
  },[]);

   const handleDownloadPDF = async (request) => {
      console.log(request)
      if (!request) return;
      
      try {
        const pdfDataUrl = await generateGatePassPDF(request);
        console.log(pdfDataUrl)
        
        // Create an invisible link and trigger download
        const link = document.createElement('a');
        link.href = pdfDataUrl;
        link.download = `gate_pass_${request._id}.pdf`;
        link.click();
        
        // toast({
        //   title: "Gate Pass Downloaded",
        //   description: "Your gate pass has been downloaded successfully."
        // });
      } catch (error) {
        // toast({
        //   title: "Download Failed",
        //   description: "There was a problem downloading your gate pass.",
        //   variant: "destructive"
        // });
      }
    };
  
  return (
    <div className="space-y-6 mx-4 ">
      <Navbar updates={[]}/>
      <h1 className="text-3xl text-center relative z-50 font-bold text-white">Download Gate Pass</h1>

      {QRData===null ?  <div className="flex items-center justify-center">
           
              <Button variant="outline" disabled className="flex text-black items-center gap-1" >
            
                Generating...
                </Button>
          </div>:
          <div className="flex items-center justify-center">
           
              <Button variant="outline" className="flex text-black items-center gap-1" onClick={() => handleDownloadPDF(QRData)}>
            <Download className="h-5 w-5 text-muted-foreground" />
                Download Gate Pass
                </Button>
          </div>

          }
    </div>
  );
};



export default HostelOfficeDashboard
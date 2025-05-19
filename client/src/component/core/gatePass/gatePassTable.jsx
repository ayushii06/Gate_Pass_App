
import {React,useState} from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Button } from "../../ui/button";
import { Download, QrCode, Search, SearchCheck } from 'lucide-react';
import {formatDate} from '../../../utils/formatDate';
import {generateGatePassPDF} from '../../common/pdfGenerator'

const GatePassTable = ({request}) => {
    console.log("res",request)
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
    <div className="rounded-md mx-8 border overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>Issued On</TableHead>
            <TableHead>Issued By</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
   
            <TableRow key={request._id} className="py-2">
              <TableCell>{formatDate(request.createdAt)}</TableCell>
              
              <TableCell className="max-w-[200px] truncate">{request.issuedBy}</TableCell>
              <TableCell className="max-w-[200px] truncate">{request.status==='used'?"Used":"Issued"}</TableCell>
              
              <TableCell>
 <Button variant='outline' onClick={()=>{handleDownloadPDF(request)}}>
                  <Download className="mr-2 h-4 w-4" />  
                 Download Gate Pass
                </Button>                 
                
              </TableCell>
             
            </TableRow>
          
         
        </TableBody>
      </Table>

    </div>
  );
};

export default GatePassTable;

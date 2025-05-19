
import {React,useState} from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import ApprovedRequest from './approvedRequest';
import { QrCode, Search, SearchCheck } from 'lucide-react';
import {formatDate} from '../../../utils/formatDate';
import ApplicationForm from './leaveApplicationForm';


const RequestTable = ({ requests}) => {
const [isDialogOpen, setIsDialogOpen] = useState(false);
const [leaveFormOpen, setLeaveFormOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

    const handleLeaveApproval = (request) => {
      setSelectedRequest(request);
      if(request.status !== 'approved'){
        setLeaveFormOpen(true);
      }
      else{
        setIsDialogOpen(true);
      }
      
    };
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>Submitted On</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request._id} className="py-2">
              <TableCell>{formatDate(request.createdAt)}</TableCell>
              
              <TableCell className="max-w-[200px] truncate">{request.reason}</TableCell>
              <TableCell>{request.status!=='Office' ? request.status!=='Rejected' ?  
              `Pending at ${request.status}`:"Rejected":"Approved"}</TableCell>
              <TableCell>
                {request.status !== 'pending' && (<Button variant='outline' onClick={()=>{handleLeaveApproval(request._id)}}>
                  <Search className="mr-2 h-4 w-4" />  
                  View More
                </Button>)}
              
                {request.status === 'rejected' && (<Button variant='outline'>Rejected</Button>)}

                  
                
              </TableCell>
             
            </TableRow>
          ))}
          {requests.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                No requests found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <ApplicationForm
        isOpen={leaveFormOpen}
        onClose={() => setLeaveFormOpen(false)}
        request={selectedRequest}
        />
    <ApprovedRequest
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        request={selectedRequest}
        />
    </div>
  );
};

export default RequestTable;

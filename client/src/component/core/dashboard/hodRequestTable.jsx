
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Button } from "../../ui/button";
import { Checkbox } from '../../ui/checkbox';
import ApplicationForm from './leaveApplicationForm';
import { formatDate } from '../../../utils/formatDate';
// import viewMoreDialog from './viewMore';

const HodRequestTable = ({ requests,selectedItems=[],onCheckboxChange=()=>{}}) => {
    
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

    const handleViewRequest = (request) => {
        setSelectedRequest(request);
        setIsDialogOpen(true);
    };
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50 ">
          <TableRow className="">
          
            <TableHead className="w-[50px]">Select</TableHead>
            <TableHead>Roll Number</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Type Of Leave</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request._id}>
                <TableCell>
                    
                  <Checkbox 
                    checked={selectedItems.includes(request._id)} 
                    onCheckedChange={(checked) => onCheckboxChange(request._id, checked)}
                  />
                </TableCell>
              <TableCell>{request?.student?.rollNo || "22cd3008"}</TableCell>
              <TableCell>{request?.student?.firstName || "Ayushi Pal"} {request?.student?.lastName || " "}</TableCell>
              <TableCell className="max-w-[200px] truncate">{formatDate(request?.fromDate)}</TableCell>
              <TableCell className="max-w-[200px] truncate">{formatDate(request?.toDate)}</TableCell>
              <TableCell className="max-w-[200px] truncate">{request.type}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewRequest(request)} >View More</Button>
                  </div>
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
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        request={selectedRequest}
        />
      {/* <
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        request={selectedRequest}
      /> */}
    </div>
    
  );
};

export default HodRequestTable;

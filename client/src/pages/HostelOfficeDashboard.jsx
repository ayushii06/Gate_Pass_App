
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../component/ui/card";
import { Button } from "../component/ui/button";
import { Table,TableBody,TableHeader,TableRow,TableHead,TableCell } from "../component/ui/table";
import { Badge } from "../component/ui/badge";
import { Mail, Check, X, UserCheck, UserX, Users, AlertCircle } from 'lucide-react';
import { Navbar } from '../component/common/Navbar';
import StatusCard from '../component/core/dashboard/statusCard';
import { getAllPendingLeaves } from '../services/operations/leaveAPI';
import { generateQRCode, outOfStationStudents } from '../services/operations/gatepassAPI';
import {formatDate} from '../utils/formatDate'
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';

function HostelOfficeDashboard() {
  const navigate=useNavigate();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchReq = async()=>{
      const fetchRequests = await getAllPendingLeaves(localStorage.getItem('token'));

    if (fetchRequests) {
      setRequests(fetchRequests);
    } else {
      setRequests([]);
    }
  }
  fetchReq();
  }, []);


  const [offCampusStudents, setOffCampusStudents] = useState([]);


  useEffect(() => {
    const getStudents = async()=>{
      const students = await outOfStationStudents(localStorage.getItem("token"));
    console.log(students)
    if (students) {
      setOffCampusStudents(students);
    } else {
      setOffCampusStudents([]);
    }}

    getStudents();

  }, []);

  const generateQR = async() => {
    const response = await generateQRCode(localStorage.getItem("token"));
    if (response.length>0) {
      setQRData(response.qrData);
    } else {
    }
  }
  
  return (
    <div className="space-y-6 mx-4 ">
      <Navbar updates={[]}/>
      <h1 className="text-3xl font-bold text-white">Hostel Office Dashboard</h1>
      
      <div className="grid relative z-50 text-white gap-4 md:grid-cols-3">
        <StatusCard 
          title="Pending QR CODE Requests" 
          count={requests?.length} 
          icon={<AlertCircle/>}
          color="#ffb20f"
        />
       
        <StatusCard 
          title="Students Off Campus" 
          count={(offCampusStudents?.length)} 
          icon={<UserX/>}
          color="#ffb20f"
        />
      </div>

    
       <div>
        <h2 className="text-2xl font-semibold mb-4">Gate Pass Management</h2>
         
             <Card>
               <CardHeader>
                 <CardTitle>Pending QR CODE Requests</CardTitle>
               </CardHeader>
               <CardContent>
                 {requests?.length === 0 ? (
                   <p className="text-center text-muted-foreground py-4">No approved requests</p>
                 ) : (
                   <div className="overflow-auto">
                     <Table>
                       <TableHeader>
                         <TableRow>
                           <TableHead>Request ID</TableHead>
                           <TableHead>Student</TableHead>
                           <TableHead>From Date</TableHead>
                           <TableHead>End Date</TableHead>
                           <TableHead>Status</TableHead>
                           <TableHead>Actions</TableHead>
                         </TableRow>
                       </TableHeader>
                       <TableBody>
                         {requests?.map((request) => (
                           <TableRow key={request._id}>
                             <TableCell className="font-medium">{request?._id}</TableCell>
                             <TableCell>{request?.student?.firstName} {request?.student?.lastName}</TableCell>
                             <TableCell>{formatDate(request?.fromDate)}</TableCell>
                             <TableCell>{formatDate(request?.toDate)}</TableCell>
                           
                             <TableCell>
                               <Badge className="bg-green-500">Approved</Badge>
                             </TableCell>
                             <TableCell>
                               <div className="flex space-x-2">
                                 <Button 
                                   variant="outline" 
                                   size="sm"
                                  className="bg-green-900 border-green-200 text-green-700 hover:bg-green-100"
                                   onClick={() => {navigate(`/generate-qr/${request._id}`)}}
                                >
                                  <Check className="h-4 w-4 mr-1" /> Generate QR Code
                                </Button>
                                
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>

      </div>

       <div>
      
            <Card>
              <CardHeader>
                <CardTitle>Students Currently Off Campus</CardTitle>
              </CardHeader>
              <CardContent>
                {offCampusStudents?.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">No students off campus</p>
                ) : (
                  <div className="overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Status</TableHead>
                          {/* <TableHead>Expected Return</TableHead>
                          <TableHead>Actions</TableHead> */}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {offCampusStudents.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">{student._id}</TableCell>
                            <TableCell>{student.firstName} {student.lastName}</TableCell>
                            <TableCell>{student.email}</TableCell>
                            <TableCell>{student.status}</TableCell>
                            {/* <TableCell>{student.expectedReturn}</TableCell>
                            <TableCell>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="bg-green-900 border-green-200 text-green-700 hover:bg-green-100"
                                onClick={() => handleStudentReturn(student.id)}
                              >
                                <UserCheck className="h-4 w-4 mr-1" /> Send Return Reminder
                              </Button>
                            </TableCell> */}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          
          
      </div> 
    </div>
  );
};



export default HostelOfficeDashboard
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../component/common/Navbar';
import StatusCard from '../component/core/dashboard/statusCard';
import { Calendar, CheckCheck, Clock, XCircle,CheckCircle2 } from 'lucide-react';
import RequestTable from '../component/core/dashboard/requestTable';
import HodRequestTable from '../component/core/dashboard/hodRequestTable';
import { Checkbox } from '../component/ui/checkbox';
import { Button } from '../component/ui/button';
import { Label } from '../component/ui/label';
import Toast from '../component/ui/toast';
import Approve from '../component/core/gatePass/approveOverlay';
import { approveLeave, rejectLeave } from '../services/operations/leaveAPI';

// Sample data for demonstration
const mockRequests = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    rollNumber: '123456',
    type_of_leave: 'Casual Leave',
    duration: '2 days',
    date: 'Apr 10, 2025',
    startTime: '09:00 AM',
    endTime: '06:00 PM',
    reason: 'Family function at home',
    status: 'pending'
  },
  {
    id: '2',
    firstName: 'John',
    lastName: 'Doe',
    rollNumber: '123456',
    type_of_leave: 'Casual Leave',
    duration: '2 days',
    date: 'Apr 10, 2025',
    startTime: '09:00 AM',
    endTime: '06:00 PM',
    reason: 'Family function at home',
    status: 'pending'
  },
  {
    id: '3',
    firstName: 'John',
    lastName: 'Doe',
    rollNumber: '123456',
    type_of_leave: 'Casual Leave',
    duration: '2 days',
    date: 'Apr 10, 2025',
    startTime: '09:00 AM',
    endTime: '06:00 PM',
    reason: 'Family function at home',
    status: 'pending'
  },
  {
    id: '4',
    firstName: 'John',
    lastName: 'Doe',
    rollNumber: '123456',
    type_of_leave: 'Casual Leave',
    duration: '2 days',
    date: 'Apr 10, 2025',
    startTime: '09:00 AM',
    endTime: '06:00 PM',
    reason: 'Family function at home',
    status: 'pending'
  },
];

<style jsx>{`
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  .blink {
    animation: blink 1s step-start infinite;
  }
`}</style>


// Filter requests based on status
const pendingRequests = mockRequests.filter(req => req.status === 'pending');
const approvedRequests = mockRequests.filter(req => req.status === 'approved' || req.status === 'issued');
const rejectedRequests = mockRequests.filter(req => req.status === 'rejected');

const HodDashboard = () => {

  const [selectedRequests, setSelectedRequests] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [toast, setToast] = useState('false');
  const [type, setType] = useState("");
  const [message, setMessage] = useState(null);
  const [requests,setRequests]=useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");


  
  const handleSelectAllChange = (checked) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedRequests(pendingRequests.map(req => req.id));
    } else {
      setSelectedRequests([]);
    }
  };

  const handleCheckboxChange = (id, checked) => {
    if (checked) {
      setSelectedRequests(prev => [...prev, id]);
    } else {
      setSelectedRequests(prev => prev.filter(reqId => reqId !== id));
      setSelectAll(false);
    }
  };

  const handleBulkApprove = () => {
    if (selectedRequests.length === 0) {
      setToast('true')
      setType('error')
      setMessage('Please select at least one request to approve')
      return;
    }
    console.log('Approved requests:', selectedRequests);


    // Here you can add the logic to approve the selected requests
    const response = approveLeave(selectedRequests, token);
    console.log("response",response)

    if (!response.success) {
      setToast('true')
      setType('error')
      setMessage('Error approving requests')
      return;
    }

    //show success message    
    setToast('true')
    setType('success')
    setMessage(`Successfully approved ${selectedRequests.length} requests`);
    
    console.log("tost",toast)
    setTimeout(() => {
      setToast('false')
    }
    , 3000)
    
    // Reset after approval
    setSelectedRequests([]);
    setSelectAll(false);
  };

  const handleBulkReject = () => {
    if (selectedRequests.length === 0) {
      setToast('true')
      setType('error')
      setMessage('Please select at least one request to reject')
      return;
    }
    
    console.log('Rejected requests:', selectedRequests);

    const response = rejectLeave(selectedRequests, token);
    console.log("response",response)

    if (!response.success) {
      setToast('true')
      setType('error')
      setMessage('Error approving requests')
      return;
    }

    //show success message    
    setToast('true')
    setType('success')
    setMessage(`Successfully rejected ${selectedRequests.length} requests`);
    setTimeout(() => {
      setToast('false')
    }
    , 3000)

    
    // Reset after rejection
    setSelectedRequests([]);
    setSelectAll(false);
  };


  

  return (
    <>
      <Navbar />
        {toast==='true' && <Toast type={type} message={message}/>}
      <div className="space-y-6 ">
        <div className="flex my-8 mx-8 flex-col md:flex-row justify-between items-start md:items-center gap-4">

          <div>

            <h1 className="text-2xl text-white font-bold tracking-tight">Hello ! Dr. Susham Biswas</h1>
            <p className="text-gray-400">Manage requests by the students for your campus exit permissions</p>
          </div>
          
        </div>

        <div className="grid my-8 gap-4 md:grid-cols-4 mx-8">
          <StatusCard
            title="Pending Approvals"
            count={pendingRequests.length}
            icon={<Calendar />}
            color="#06ffec"
          />
          <StatusCard
            title="Total Approved"
            count={approvedRequests.length}
            icon={<CheckCheck />}
            color="#10b981"
          />
          <StatusCard
            title="Rejected"
            count={rejectedRequests.length}
            icon={<XCircle />}
             color="#ef4444"
            
          />
          <StatusCard
            title="Total Requests"
            count={mockRequests.length}
            icon={<Clock />}
           
            color="#06ffec"

          />
        </div>

        <div className="mx-auto text-center text-red-500 font-bold text-2xl my-5 ">Pending Requests !</div>
 
        <div className="mx-8 my-8 ">
          <div className=" flex justify-between my-4">
        
               <div className="flex items-center mb-4 ml-4 text-white">
                <Checkbox 
                  id="select-all" 
                  checked={selectAll}
                  onCheckedChange={(checked) => handleSelectAllChange(checked)} 
                />
                <label htmlFor="select-all" className="ml-2 text-lg text-white font-medium">
                  Select All
                </label>
              </div>
              {selectedRequests.length > 0 && (
                <div className="flex gap-2">
                  <Button 
                    variant="success" 
                    size="sm" 
                    onClick={handleBulkApprove} 
                    className="flex items-center gap-1"
                  >
                    <CheckCircle2 className="h-4 w-4" /> Approve ({selectedRequests.length})
                  </Button>
                  <Button 
                    variant="danger" 
                    size="sm" 
                    onClick={handleBulkReject} 
                    className="flex items-center gap-1"
                  >
                    <XCircle className="h-4 w-4" /> Reject ({selectedRequests.length})
                  </Button>
                </div>
              )}
              </div>
        <HodRequestTable requests={pendingRequests} selectedItems={selectedRequests} onCheckboxChange={handleCheckboxChange}/>
        </div>

      

      </div>
    </>
  );
};

export default HodDashboard;

import React, { useEffect, useState } from 'react';
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
import { approveLeave, getAllPendingLeaves, rejectLeave } from '../services/operations/leaveAPI';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [toast, setToast] = useState('false');
  const [type, setType] = useState("");
  const [message, setMessage] = useState(null);
  const [requests,setRequests]=useState([]);
  const token = localStorage.getItem("token");
  const user = useSelector((state)=>state.profile.user)

 
  useEffect(() => {
    const fetchRequest = async() =>{

      const fetchRequests = await getAllPendingLeaves(token);
      console.log(fetchRequests)
      setRequests(fetchRequests);
    }

    fetchRequest();
  }, []);

  const handleSelectAllChange = (checked) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedRequests(requests.map(req => req._id));
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

  const handleBulkApprove = async() => {
    if (selectedRequests.length === 0) {
      setToast('true')
      setType('error')
      setMessage('Please select at least one request to approve')
      return;
    }
    console.log('Approved requests:', selectedRequests);


    // Here you can add the logic to approve the selected requests
    //approve leave takes only one request at a time

    for (let i = 0; i < selectedRequests.length; i++) {
      const response = await approveLeave(selectedRequests[i], token);
       console.log("response",response)

        if (!response) {
          setToast('true')
          setType('error')
          setMessage('Error approving requests')
          return;
        }
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

  const handleBulkReject = async() => {
    
    if (selectedRequests.length === 0) {
      setToast('true')
      setType('error')
      setMessage('Please select at least one request to reject')
      return;
    }
    
    console.log('Rejected requests:', selectedRequests);

      const response = await rejectLeave(selectedRequests, token);
       console.log("response",response)

        if (!response) {
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
      <Navbar updates={[]}/>
        {toast==='true' && <Toast type={type} message={message}/>}
      <div className="space-y-6 ">
        <div className="flex my-8 mx-8 flex-col md:flex-row justify-between items-start md:items-center gap-4">

          <div>

            <h1 className="text-2xl text-white font-bold tracking-tight">Hello ! Dr. {user?.firstName} {user?.lastName}</h1>
            <p className="text-gray-400">Manage requests by the students for your campus exit permissions</p>
          </div>
          
        </div>

        <div className="grid my-8 gap-4 md:grid-cols-4 mx-8">
          <StatusCard
            title="Pending Approvals"
            count={requests.length}
            icon={<Calendar />}
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

        
              {selectedRequests?.length > 0 && (
                <>
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
                    variant="" 
                    size="sm" 
                    onClick={handleBulkReject} 
                    className="flex items-center bg-red-500 text-white gap-1"
                  >
                    <CheckCircle2 className="h-4 w-4" /> Reject ({selectedRequests.length})
                  </Button>
                
                </div>
        </>
      )}
    
      </div>
      <HodRequestTable requests={requests} selectedItems={selectedRequests} onCheckboxChange={handleCheckboxChange}/>
        </div>
      

      </div>
    </>
  );
};

export default AdminDashboard;

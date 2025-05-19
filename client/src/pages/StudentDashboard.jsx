
import React, { use, useEffect, useState } from 'react';
import StatusCard from '../component/core/dashboard/statusCard';
import RequestTable from '../component/core/dashboard/requestTable';
import { Calendar, CheckCheck, Clock, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../component/common/Navbar';
import AnimatedButton from '../component/common/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "../component/ui/Select";
import { getAllLeave } from '../services/operations/leaveAPI';
import { getCurrentGatePass, getMyAllGatePasses } from '../services/operations/gatepassAPI';
import GatePassTable from '../component/core/gatePass/gatePassTable';


const Requests = () => {
  const navigate = useNavigate();
  const [requestType, setRequestType] = useState('all');
  const [newRequest, setNewRequest] = useState([]);
  const [oldRequests, setOldRequests] = useState([]);
  const [newUpdates, setNewUpdates] = useState([]);
  const [gatePass, setGatePass] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const fetchRequests = await getAllLeave(token);
      console.log("Fetched Requests", fetchRequests);

      if (fetchRequests.length > 0) {
        setNewRequest(fetchRequests);
        setNewUpdates([]); // Clear previous updates

        fetchRequests.forEach((request) => {
          const existing = oldRequests.find(req => req.id === request.id);

          if (!existing || existing.status !== request.status) {
            setNewUpdates(prev => [...prev, request]);
          }
        });

        setOldRequests(fetchRequests);
      } else {
        setNewRequest([]);
        setOldRequests([]);
        setNewUpdates([]);
      }
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };


  const fetchGatePassData = async () => {
    try {
      const token = localStorage.getItem("token");
      const gatePassRequests = await getCurrentGatePass(token);
      console.log("Fetched Requests", gatePassRequests);

      if (gatePassRequests!==null) {
        console.log("ok")
        setGatePass(gatePassRequests);
      } else {
        setGatePass(null);
      }
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  
  
  fetchGatePassData();

  fetchData();
}, []);



  const pendingReq = oldRequests.filter(req => req.status === 'pending');
  const approvedReq = oldRequests.filter(req => req.status === 'approved');
  const rejectedReq = oldRequests.filter(req => req.status === 'rejected');
  return (
    <>
      <Navbar updates={newUpdates} />
      <div className="space-y-6 ">
        <div className="flex my-8 mx-8 flex-col md:flex-row justify-between items-start md:items-center gap-4">

          <div>

            <h1 className="text-2xl text-white font-bold tracking-tight">Hi! Ayushi Pal</h1>
            <p className="text-gray-400">Manage and track all your campus exit permissions</p>
          </div>
          <AnimatedButton text='Apply for Gate Pass' handleOnClick={() => { navigate('/apply-leave-form') }} />
        </div>


        <div className="grid my-8 gap-4 md:grid-cols-4 mx-8">
          <StatusCard
            title="Total Requests"
            count={oldRequests.length}
            icon={<Calendar />}
            color="#06ffec"
          />
          <StatusCard
            title="Pending"
            count={pendingReq.length}
            icon={<Clock />}
            color="#ffb20f"
          />
          <StatusCard
            title="Approved"
            count={approvedReq.length}
            icon={<CheckCheck />}
            color="#10b981"
          />
          <StatusCard
            title="Rejected"
            count={rejectedReq.length}
            icon={<XCircle />}
            color="#ef4444"
          />
        </div>

            {gatePass && (
          <>
           <div className='text-2xl mx-8 text-white font-bold tracking-tight '>Your Gate Pass</div>
          <GatePassTable request={gatePass}/>
          </>
        )}
        <div className='mx-8 my-12 flex justify-between items-center'>


          <div className="w-[80%]">

            <div className='text-2xl text-white font-bold tracking-tight '>Request History</div>
            <div className='text-gray-400'>View and manage all your gate pass requests</div>
          </div>
          <Select
            id="type" className="text-white bg-transparent"
            value={requestType}
            onValueChange={(value) =>
              setRequestType(value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

        </div>

      
        <div className="mx-8 my-8">
          {oldRequests.length > 0 ? (
            <>
              {requestType === 'all' && <RequestTable requests={oldRequests} />}
              {requestType === 'pending' && <RequestTable requests={pendingReq} />}
              {requestType === 'accepted' && <RequestTable requests={approvedReq} />}
              {requestType === 'rejected' && <RequestTable requests={rejectedReq} />}
            </>
          ) : (
            <div className="text-white my-5 text-center">
              <h2 className="text-2xl font-bold">No Requests Found</h2>
              <p className="text-gray-400">You have not made any requests yet.</p>
            </div>
          )}

        </div>


      </div>
    </>
  );
};

export default Requests;

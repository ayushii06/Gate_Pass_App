import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { Input } from "../component/ui/input";
import { Label } from "../component/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "../component/ui/Select";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { differenceInCalendarDays } from "date-fns";
import { submitLeave } from '../services/operations/leaveAPI';
import Toast from '../component/ui/toast';

const typeOfLeave = [
  {value:"medical", label:"Medical Leave"},
  {value:"emergency", label:"Emergency"},
  {value:"event", label:"Event Leave"},
  {value:"personal",label:"Personal Leave"},
]

const RegisterStudent = () => {
  const [setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [credentials, setCredentials] = useState({
    nature_of_leave:"",
    reason:"",
    roomNo:"",
    date_from:"",
    date_to:"",
    address_during_leave:"",
    document:"",
    mobileNo:"",
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (credentials.date_from && credentials.date_to) {
      const totalDays = differenceInCalendarDays(credentials.date_to, credentials.date_from) + 1;
      setCredentials((prev) => ({ ...prev, duration: totalDays }));
    }
  }, [credentials.date_from, credentials.date_to]);

  // Handle Form Submission
  const handleSubmit = async(e) => {
    e.preventDefault()

    console.log(credentials)

    const response = await submitLeave(credentials,localStorage.getItem("token"));

    if(response){
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false);
        navigate('/student-dashboard')
      }, 2000);
    }
    else{
      setIsError(true)
      setTimeout(() => {
        setIsError(false);
      }, 2000);
    }
    // Reset
    setCredentials({
    roomNo:"",
    reason:"",
    date_from:"",
    date_to:"",
    document:"",
    nature_of_leave:"",
    address_during_leave:"",
    mobileNo:"",
    })
  }


  return (
    <>

      <div className="min-h-screen flex flex-col bg-background grid-background dark">
        {
          isSuccess && (
            <Toast type="success" message="Leave Application Submitted Successfully" />
          )
}

 {       
          isError && (
            <Toast type="error" message="Leave Application Submission Failed" />
          )
        }      


        <div className="flex-1 flex flex-col items-center justify-center px-4 my-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">Apply For Leave</h1>
              <p className="text-gray-400">Fill out the details very carefully.</p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-6'>

        


             
               

        
            
<div className="">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="from" className="block text-white font-medium">Start Date</Label>
                <DatePicker
          selected={credentials.date_from}
          onChange={(date) => setCredentials({ ...credentials, date_from: date })}
          selectsStart
          startDate={credentials.date_from}
          endDate={credentials.date_to}
          minDate={new Date(new Date().setDate(new Date().getDate() + 3))
}
          placeholderText="Select start date"
          className="text-white bg-transparent border border-white px-3 py-2 rounded-md w-full"
          calendarClassName="bg-white text-black"
          dateFormat="yyyy-MM-dd"
        />
                {/* <Input id="from" type='date' value={credentials.date_from} onChange={(e) => {
                  setCredentials({...credentials,date_from:value})}
                } name='from' required className="text-white bg-transparent" /> */}

              </div>
                <div className="space-y-2">
                  <Label htmlFor="to" className="block text-white font-medium">End Date</Label>
                  <DatePicker
          selected={credentials.date_to}
          onChange={(date) => setCredentials({ ...credentials, date_to: date })}
          selectsEnd
          startDate={credentials.date_from}
          endDate={credentials.date_to}
          minDate={credentials.date_from}
          placeholderText="Select end date"
          className="text-white bg-transparent border border-white px-3 py-2 rounded-md w-full"
          calendarClassName="bg-white text-black"
          dateFormat="yyyy-MM-dd"
        />
                </div>

                </div>

                {credentials.duration && (
  <div className="flex w-full justify-start gap-2 items-center">
    <Label className="block text-blue-500 font-medium">Total Leave Duration (days) - </Label>
    <div className="text-blue-500 text-sm ">
      {credentials.duration} day(s)
    </div>
  </div>
)}

</div>

              <div className="space-y-2">
                  <Label htmlFor="type" className="block text-white font-medium">Type Of Leave</Label>
                  <Select
                        id="type" className="text-white bg-transparent"
                        value={credentials.nature_of_leave}
                        onValueChange={(e) =>
                          setCredentials({ ...credentials, nature_of_leave: e})
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Type" >{credentials.nature_of_leave}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {typeOfLeave.map((item)=>{
                            return (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                
                </div>

              <div className="space-y-2">
                  <Label htmlFor="reason" className="block text-white font-medium">Reason Of Leave</Label>
                  <Input id="reason" value={credentials.reason} onChange={(e) => {
                  setCredentials({...credentials,reason:e.target.value})}
                } name='reason' placeholder='Please type your reason for leave' required className="text-white bg-transparent" />
                </div>

                 <div className="space-y-2">
                  <Label htmlFor="roomNo" className="block text-white font-medium">Room Number</Label>
                  <Input id="roomNo" value={credentials.roomNo} onChange={(e) => {
                  setCredentials({...credentials,roomNo:e.target.value})}
                } name='roomNo' required className="text-white bg-transparent" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile" className="block text-white font-medium">Mobile Number</Label>
                  <Input id="mobile" value={credentials.mobileNo} onChange={(e) => {
                  setCredentials({...credentials,mobileNo:e.target.value})}
                } name='mobile' placeholder='Please enter your mobile number' required className="text-white bg-transparent" />
                </div>

                 <div className="space-y-2">
                  <Label htmlFor="address" className="block text-white font-medium">Address</Label>
                  <Input id="address" value={credentials.address_during_leave} onChange={(e) => {
                  setCredentials({...credentials,address_during_leave:e.target.value})}
                } name='mobile' placeholder='Please enter your address' required className="text-white bg-transparent" />
                </div>

                 <div className="space-y-2">
                  <Label htmlFor="document" className="block text-white font-medium">Attach Document</Label>
                  <Input id="document" type='file'
                  accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
                  onChange={(e) => {
                    setCredentials({...credentials,document:e.target.files[0]})
                  }} name='document'  className="text-white bg-transparent" />

                </div>


              
              <div className="flex flex-col space-y-4">
                <button disabled={setLoading} style={{"backgroundColor":"#0060af"}} className=" relative group/btn block dark:bg-primary w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]" type="submit">
                  {setLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Submitting Leave...
                    </div>
                  ) : (
                    "Submit Leave"
                  )}
                  <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></span><span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></span></button>

              

                
              </div>
            </form>

          </div>
        </div>
      </div>


    </>
  )
}

export default RegisterStudent
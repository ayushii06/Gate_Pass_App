import { Routes, BrowserRouter, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import './index.css'

import Home from '../src/pages/Home'

//DASHBOARDS ----
import StudentDashboard from "./pages/StudentDashboard";
import HodDashboard from "./pages/HodDashboard";
import WardenDashboard from "./pages/WardenDashboard";
import HostelOfficeDashboard from './pages/HostelOfficeDashboard'

//AUTH ----
import Register_Student from "./component/core/Auth/Register_Student";
import Register_Faculty from "./component/core/Auth/Register_Faculty";
import VerifyEmail from './pages/VerifyEmail'
import Login from './component/core/Auth/Login'
import PrivateRoute from "./component/core/Auth/PrivateRoute";
import StudentRoute from "./component/core/Auth/StudentRoute";
import FacultyRoute from "./component/core/Auth/TeacherRoute";
import ForgotPassword from "./component/core/Auth/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";

//GATEPASS
import LeaveForm from "./pages/LeaveForm"

//SETTING ----
import ProfileSetting from "./pages/ProfileSetting";
import GuardDashboard from "./pages/GuardDashboard";
import AdminDashboard from "./pages/AdminDashBoard";
import GatePass from "./pages/GatePass";

function App() {

  const user = useSelector((state) => state.profile.user);

  return (

    <>
      <Routes>
        {/* AUTH ROUTE */}
        <Route exact path='/' element={<Home />} />
        <Route exact path='/signup-student' element={<Register_Student/>} />
        <Route exact path='/signup-faculty' element={<Register_Faculty/>} />
        <Route exact path='/verify-email' element={<VerifyEmail />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/forgot-password' element={<ForgotPassword/>}/>
        <Route exact path="/update-password" element={<UpdatePassword/>} />


        {/* PRIVATE ROUTE */}
        <Route exact path='/profile' element={<PrivateRoute><ProfileSetting /></PrivateRoute>} />

        {/* ADMIN ROUTE */}
        {/* { */}
          // user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route exact path='/student-dashboard' element={<StudentDashboard />} />
              <Route exact path='/apply-leave-form' element={<LeaveForm />} />
            </>
          )
        {/* } */}

        {/* HOD ROUTE */}
        {
          // user?.accountType === ACCOUNT_TYPE.HOD && (
            <>
              <Route exact path='/hod-dashboard' element={<HodDashboard />} />
              <Route exact path='/admin-dashboard' element={<AdminDashboard />} />
            </>
          // )
        }

        {/* HOSTEL OFFICE ROUTE */}
    
            <>
              <Route exact path='/hostel-dashboard' element={<HostelOfficeDashboard/>} />
              <Route exact path='/generate-qr/:requestID' element={<GatePass/>} />
            </>
 
        {/* WARDEN ROUTE */}
        {
          user?.accountType === ACCOUNT_TYPE.WARDEN && (
            <>
              <Route exact path='/hod-dashboard' element={<WardenDashboard />} />
            </>
          )
        }

        <Route exact path='/guard-dashboard' element={<GuardDashboard />} />

        
      </Routes>


    </>
  );
}

export default App;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../component/common/Navbar';


const TeacherDashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="space-y-6 ">
        <div className="flex my-8 mx-8 flex-col md:flex-row justify-between items-start md:items-center gap-4">

          <div>

            <h1 className="text-2xl text-white font-bold tracking-tight">Hi! Ayushi Pal</h1>
            <p className="text-gray-400">Manage and track all your campus exit permissions</p>
          </div>
          
        </div>

      

      </div>
    </>
  );
};

export default TeacherDashboard;

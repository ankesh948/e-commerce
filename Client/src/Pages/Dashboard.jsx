import React from 'react'
import Sidebar from '../Components/Sidebar'
import { useState } from 'react';
import Login from './Login';
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from 'react';



const Dashboard = () => {
  const navigate = useNavigate();
//   const [token, setToken] = useState('');

// useEffect(()=>{
//   if (!token) {
//     navigate('/login');
//   }
// },[''])

  return (
    <>
    <div className="container-fluid">
    <div className="d-flex gap-4 mt-4">
        <Sidebar/>
        <div className="main">
            <h1>Dashboard</h1>
        </div>
    </div>
    </div>

    </>
  )
}

export default Dashboard
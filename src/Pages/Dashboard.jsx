import React from 'react'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'

const Dashboard = () => {
  return (
    <>
    <Header />
    <div className="d-flex">
        <Sidebar/>
        <div className="main">
            <h1>Dashboard</h1>
        </div>
    </div>

    </>
  )
}

export default Dashboard
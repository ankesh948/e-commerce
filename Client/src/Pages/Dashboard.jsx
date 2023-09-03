import React from 'react'
import Sidebar from '../Components/Sidebar'
import { useContext } from 'react'
import {Wrapper} from '../context'

const Dashboard = () => {
const {data}= useContext(Wrapper)
console.log(data)
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
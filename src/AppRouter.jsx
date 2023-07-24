import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Add_Product from "./Pages/Add_Product"
import Login from './Pages/Login'

const AppRouter = () => {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<Login />} />
                <Route path='/add_product' element={<Add_Product />} />
                <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default AppRouter
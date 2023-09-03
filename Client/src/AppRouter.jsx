import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Add_Product from "./Pages/Add_Product"
import Product_List from './Pages/Product_List'
import Login from './Pages/Login'
import HomePage from './Pages/HomePage'
import Edit_Product from './Pages/Edit_Product'
import ManageCategory from './Pages/ManageCategory'
import Register from './Pages/Register'

const AppRouter = () => {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<HomePage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/add-product' element={<Add_Product />} />
                <Route path='/product-list' element={<Product_List />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/edit-product/:id' element={<Edit_Product />} />
                <Route path='/manage-categories' element={<ManageCategory />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default AppRouter
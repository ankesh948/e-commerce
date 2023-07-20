import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './src/Components/Login'

const AppRouter = () => {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route exact path='/' Component={Login}  />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default AppRouter
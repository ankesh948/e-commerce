import React from 'react'
import { Link } from 'react-router-dom'
import FrontentHeader from '../Components/FrontentHeader'

const Login = () => {


  return (
    <>
    <FrontentHeader/>
      <div className='loginsection mt-5'>
        <div className="container">
            <form  id="logincustom" className='card m-auto w-50 p-5'>
                <h1 className='text-center pb-5'>Login Form</h1>
                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="form2Example1">Email Address</label>
                  <input type="email" id="form2Example1" placeholder='Email' className="form-control" />
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form2Example2">Password</label>
                  <input type="password" id="form2Example2" placeholder='Password' className="form-control" />
                </div>
                <Link to="/dashboard"><button className="btn btn-lg btn-dark w-100 rounded-pill">Sign in</button></Link>
              </form>
        </div>
      </div>
    </>
  )
}

export default Login
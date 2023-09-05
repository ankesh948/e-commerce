import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import FrontentHeader from "../Components/FrontentHeader";
import {useNavigate } from "react-router-dom";

const Register = () => {

  const [FullName, setFullName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const FormData = {
      FullName,
      Email,
      Password,
    };
  
    try {
      const result = await axios.post("http://localhost:4000/api/register/", FormData);
      console.log(result);
      setFullName('')
      setEmail('')
      setPassword('')
      navigate('/login');
    } catch (error) {
      console.error('An error occurred:', error.message); // Log the error message
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  };
  

  return (
    <>
      <FrontentHeader/>

      <div className="loginsection">
        <div className="container">
          <div
            className="row align-items-center justify-content-center"
            style={{ height: "calc(100vh - 50px)" }}
          >
            <div className="col-6">
              <form
                id="register"
                method="POST"
                onSubmit={(e) => handleSubmit(e)}
                className="card p-5"
              >
                <h1 className="text-center pb-5">Sign Up</h1>

                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="form2Example1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={FullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="form2Example1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="form-control"
                    required
                  />
                </div>


                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form2Example2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="form-control"
                    required
                  />
                </div>
                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-lg btn-dark px-5  rounded-pill"
                  >
                    Register
                  </button>

                  <Link to="/login">
                    <button
                      type="submit"
                      className="btn btn-lg btn-info px-5 rounded-pill"
                    >
                      Go to Login
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

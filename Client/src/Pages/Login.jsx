import React, { useEffect, useState } from "react";
import FrontentHeader from "../Components/FrontentHeader";
import axios from "axios";

const Login = () => {
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      Email,
      Password,
    };
    try {
      const response = await axios.post(
        "http://localhost:4000/api/login",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log(response.data);
    } 

    catch(err){
      console.error('api not working',err);
    };

  }

  return (
    <>
      <FrontentHeader />
      <div className="loginsection mt-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <form
                id="logincustom"
                method="POST"
                onSubmit={(e) => handleSubmit(e)}
                className="card m-auto w-50 p-5"
              >
                <h1 className="text-center pb-5">Login Form</h1>
                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="form2Example1">
                    Email Address
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="form-control"
                  />
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form2Example2">
                    Password
                  </label>
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="form-control"
                  />
                </div>
                <button className="btn btn-lg btn-dark w-100 rounded-pill">
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

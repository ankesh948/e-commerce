import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';

const Login = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token") || null);
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      if (!(decodedToken.exp < currentTime)) {
        navigate("/dashboard");
      }
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      Email,
      Password,
    };
    axios.post("http://localhost:4000/api/login", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      const token = res.data.token;
      const Email = res.data.user.Email;
      const FullName = res.data.user.FullName;
      localStorage.setItem('Email', Email);
      localStorage.setItem('FullName', FullName);
      localStorage.setItem('token', token);
      setEmail('')
      setPassword('')
      navigate('/dashboard');
    })
    .catch((err) => {
      console.error('api not working',err);
    });
  };
  

  return (
    <>
      <div className="loginsection">
        <div className="container">
          <div className="row align-items-center justify-content-center" style={{ height: 'calc(100vh - 50px)' }}>
            <div className="col-6">
              <form
                id="logincustom"
                method="POST"
                onSubmit={(e) => handleSubmit(e)}
                className="card p-5"
              >
                <h1 className="text-center pb-5">Login Form</h1>
                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="form2Example1">
                    Email Address
                  </label>
                  <input
                    type="text"
                    value={Email}
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
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="form-control"
                  />
                </div>
                <div className="d-flex gap-2">
                <button type="submit" className="btn btn-lg btn-dark px-5 rounded-pill">
                  Sign in
                </button>
                  <Link to="/dashboard">
                    <button type="button" className="btn btn-lg btn-info px-5  rounded-pill">
                      Register
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

export default Login;

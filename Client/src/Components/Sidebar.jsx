import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useEffect } from "react";
import {useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';
const Sidebar = () => {

const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem('token') || null);
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime || null) {
        return navigate('/login');
      }
    }else{
      return navigate('/login');
    }
  }, []);
  

  const logOutHandler = () =>{
    if(localStorage.getItem('token')){
      localStorage.clear();
      setTimeout(()=>{
        navigate("/login");
        console.log('first')
      }, 150)
    }
  }

  return (
    <>
      <div className="sidebar">
        <Link to="/" className="dashboard-logo">
          <h5>Admin Dashboard</h5>
        </Link>
        <ul>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/add-product">Add Product</NavLink>
          </li>
          <li>
            <NavLink to="/product-list">Product List</NavLink>
          </li>
          <li>
            <NavLink to="/manage-categories">Product Categories</NavLink>
          </li>
          <li>
            <NavLink to="/users">User Management</NavLink>
          </li>
          <li>
            <Link to="" onClick={()=>logOutHandler()}>Logout</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;

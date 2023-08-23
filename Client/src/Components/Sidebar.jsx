import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';

const Sidebar = () => {

const navigate = useNavigate();

    const [token, setToken] = useState(localStorage.getItem('token') || null);
    useEffect(() => {
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert to seconds
        if (decodedToken.exp < currentTime) {
          console.log('Token has expired');
          navigate('/login');
        } else {
          console.log('Token is live');
          navigate('/dashboard');
        }
        // Set up a timer to check for token expiration periodically
        const intervalId = setInterval(() => {
          const updatedTime = Date.now() / 1000;
          if (decodedToken.exp < updatedTime) {
            console.log('Token has expired');
            navigate('/login');
            clearInterval(intervalId); // Clear the interval once token expires
          }
        }, 5000);
        return () => clearInterval(intervalId);
      }
    }, [token]);


  useEffect(() => {
    const menuItems = document.querySelectorAll('.sidebar ul li a');
    const handleClick = (event) => {
      menuItems.forEach(item => item.classList.remove('active'));
      event.target.classList.add('active');
    };
    menuItems.forEach(item => {
      item.addEventListener('click', handleClick);
      return () => {
        item.removeEventListener('click', handleClick);
      };
    });
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <>
      <div className="sidebar">
        <Link to="/" className="dashboard-logo">
          <h5>Admin Dashboard</h5>
        </Link>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/add-product">Add Product</Link>
          </li>
          <li>
            <Link to="/product-list">Product List</Link>
          </li>
          <li>
            <Link to="/manage-categories">Product Categories</Link>
          </li>
          <li>
            <Link to="/users">User Management</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;

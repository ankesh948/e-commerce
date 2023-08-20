import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Sidebar = () => {
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
            <Link to="/add_product">Add Product</Link>
          </li>
          <li>
            <Link to="/product_list">Product List</Link>
          </li>
          <li>
            <Link to="/">Product Categories</Link>
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

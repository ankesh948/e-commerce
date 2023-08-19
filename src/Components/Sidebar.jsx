import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <Link to="/" className="dashboard-logo">
          <h5>Admin Dashboard</h5>
        </Link>
        <ul>
          <li>
            <Link to="/dashboard">Dahboard</Link>
          </li>
          <li>
            <Link to="/add_product">Add Product</Link>
          </li>
          <li>
            <Link to="/">Product Categories</Link>
          </li>
          <li>
            <Link to="/users">User Mangement</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;

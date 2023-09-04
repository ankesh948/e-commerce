import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'boxicons';
import jwtDecode from 'jwt-decode';
import { Wrapper } from "../Context";
import axios from 'axios';

const FrontentHeader = () => {
  const { userData } = useContext(Wrapper);
  const [ cartData, setCartData ] = useState([]);

  useEffect(() => {
    const getCartData = async () => {
      try {
        if (userData.Email) {
          const response = await axios.get(`http://localhost:4000/api/cart/${userData.Email}`);
          console.log(response.data); 
          return setCartData(response.data);
        } else {
          console.warn('userData.Email is missing or undefined.');
        }
      } catch (error) {
        console.error(error);
      }
    };
    getCartData();
  }, [userData]); 


  return (
    <>
      <nav id="header-custom" className="navbar bg-body-tertiary navbar-expand-lg">
        <div className="container">
          <Link to="/" className="navbar-brand logo me-5">
            E-SHOPING
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#basic-navbar-nav"
            aria-controls="basic-navbar-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="basic-navbar-nav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="">
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="#">
                      Men
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Woman
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="searcharea me-5">
            <form action="">
              <input type="text" className="form-control" placeholder="Search for Products" />
            </form>
          </div>
          <div className="right-area">
            <div className="d-flex align-items-center justify-content-center gap-2">
              <div className="carticon me-3">
                <box-icon size="md" color="#444" name="cart-add"></box-icon>
                <span className="count">{cartData.length > 0 ? cartData.length : '0'}</span>
              </div>
              {userData.Expiry ? (
                <Link to={'/dashboard'} className='text-decoration-none text-dark fw-bold'><span>{userData.FullName}</span></Link>
              ) : (
                <>
                  <Link to="/login">
                    <button className="btn btn-md btn-outline-info">Login</button>
                  </Link>
                  <Link to="/register">
                    <button className="btn btn-md btn-outline-warning">Register</button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default FrontentHeader;

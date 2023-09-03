import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

export const Wrapper = createContext();

const Context = ({ children }) => {
  const [fetchingCategoryData, setCategoryData] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isLoggedIn, setLoggedIn] = useState('');

  console.log(isLoggedIn)
  

  useEffect(() => {
    handleProtectedRequest();
  }, []);

  const handleProtectedRequest = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/protected", {
        headers: {'x-auth-token': token},
      });
      setLoggedIn(response);
    } catch (error) {
      setLoggedIn(error) ;
    }
  };

  useEffect(() => {
    const fetchCategoryData = async () => { // Renamed 'CategoryData' to 'fetchCategoryData'
      try {
        const res = await axios.get("http://localhost:4000/api/category");
        setCategoryData(res.data);
      } catch (err) {
        console.error("API not working", err);
      }
    };
    fetchCategoryData(); // Changed function name to 'fetchCategoryData' and called it within the useEffect
  }, []);

  return (
    <Wrapper.Provider value={{ fetchingCategoryData, setCategoryData }}>
      {children}
    </Wrapper.Provider>
  );
};

export default Context;

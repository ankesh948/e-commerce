import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

export const Wrapper = createContext();

const Context = ({ children }) => {

  const [fetchingCategoryData, setCategoryData] = useState([]);

  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      const UserData  = {
        FullName: decodedToken.FullName,
        Email: decodedToken.Email,
        Expiry: (!(decodedToken.exp < currentTime))
      }
      setUserData(UserData)
    }
  }, [token]);

  useEffect(() => {
    const fetchCategoryData = async () => {  
      try {
        const res = await axios.get("http://localhost:4000/api/category");
        setCategoryData(res.data);
      } catch (err) {
        console.error("API not working", err);
      }
    };
    fetchCategoryData();  
  }, []);

  return (
    <Wrapper.Provider value={{ fetchingCategoryData, setCategoryData, userData }}>
      {children}
    </Wrapper.Provider>
  );
};

export default Context;

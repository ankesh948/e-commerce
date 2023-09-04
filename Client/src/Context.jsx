import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

export const Wrapper = createContext();

const Context = ({ children }) => {
  const [fetchingCategoryData, setCategoryData] = useState([]);

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

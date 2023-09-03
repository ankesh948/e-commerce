import { createContext, useState ,useEffect} from "react";
import React from 'react'
import axios from "axios";
export const Wrapper = createContext()


const Context = ({children}) => {
    const [fetchingCategoryData, setCategoryData] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:4000/api/category")
          .then((res) => {
            setCategoryData(res.data)
          })
          .catch((err) => {
            console.error('api not working',err);
          });
      },[])
    
  return (
    <Wrapper.Provider value={{fetchingCategoryData, setCategoryData}} >
        {children}
    </Wrapper.Provider>
  )
}

export default Context

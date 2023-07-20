import React, { useState } from 'react'
import { useEffect } from 'react';
import Card from './Card';
const Login = () => {

    const [data, setData] = useState([]);

    useEffect(()=>{
        async function asyncCall() { 
            const response =  await fetch("https://dummyjson.com/products").then((res)=>res.json())
            setData(response.products)
        }
        asyncCall()
    },[]);



console.log(data)
  return (
    <>
 {data.map((e)=>{
    const {images} = e
    return(
      
        <>
        <Card img={images} />



        
        
        </>
    )
 })}

    </>
  )
}

export default Login
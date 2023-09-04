import React, { useContext } from 'react'
import FrontentHeader from '../Components/FrontentHeader';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Wrapper } from "../Context";
import {useNavigate } from "react-router-dom";

const HomePage = () => {

  const navigate = useNavigate();
  const [fetchProductData, setFetchProductData] = useState([]);
  const {userData} = useContext(Wrapper);

  const handleAddToCart = async (id) => {
    if(userData.Expiry){
      const CartDetail = {
        "Product_Id": id,
        "Email": userData.Email,
      }
      try {
        const response = await axios.post("http://localhost:4000/api/cart", CartDetail);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }else{
      navigate('/login');
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:4000/api/products");
      const data = response.data;
      setFetchProductData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <>
      <FrontentHeader/>

      <div className="banner">
        <div className="container">
          <div className="row">
            <div className="col-12">
            <img
            src="../src/assets/Img/slider.png"
            className="img-fluid"
            alt=""
          /> 
            </div>
          </div>

          <h1 className="mt-5 text-center">Recent Products</h1>
          <div className="mt-4 d-flex flex-wrap gap-4">
            {fetchProductData.map((e) => (
              <div key={e._id} className="cproducts">
                <img src={e.thumbnail} className="img-fluid" alt="" />

                <div className='brandbx'>
                    {e.brand}
                </div>
                <div className="innercproducts">
                  <h5>{e.title}</h5>
                  <p className="oneline">{e.description}</p>
                  <div className="d-flex align-items-center justify-content-between">
                    <h5>
                      Rs. {e.price}{" "}
                      <span className="realprise text-decoration-line-through">
                        Rs. {e.price}
                      </span>{" "}
                      <span className="discount">
                        ({e.discountPercentage}% OFF)
                      </span>
                    </h5>
                    <p className='fw-bold'>{e.stock >= 2 ? 'Instock' : "out of stock"}</p>
                  </div>

                  <button className='btn btn-md btn-dark d-flex gap-2' onClick={()=>handleAddToCart(e._id)}> <box-icon name='cart-alt'size="cssSize" color='#ffffff' ></box-icon> Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage
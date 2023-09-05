import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import FrontentHeader from "../Components/FrontentHeader";

const Product_Detail = () => {
  const [ProductData, setFetchProductData] = useState([]);

  let { id } = useParams();

  async function fetchData() {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/products/${id}`
      );
      const data = response.data;
      setFetchProductData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  fetchData();

  return (
    <>
      <FrontentHeader />
      <div className="mt-4 d-flex gap-4 w-75 m-auto">
        <div className=" p-4">
          <img src={ProductData.thumbnail} className="img-fluid w-75" alt="" />
        </div>
        <div className=" p-4">
          <div key={ProductData._id} className="">
            <div className="brandbx card p-2 bg-warning w-25">
              {ProductData.brand}
            </div>

            <div className="innercproducts">
              <h5>{ProductData.title}</h5>
              <p className="oneline">{ProductData.description}</p>
              <div className="d-flex align-items-center justify-content-between">
                <h5>
                  Rs. {ProductData.price}{" "}
                  <span className="realprise text-decoration-line-through">
                    Rs. {ProductData.price}
                  </span>{" "}
                  <span className="discount">
                    ({ProductData.discountPercentage}% OFF)
                  </span>
                </h5>
                <p className="fw-bold">
                  {ProductData.stock >= 2 ? "Instock" : "out of stock"}
                </p>
              </div>

              <button
                className="btn btn-md btn-dark d-flex gap-2"
                onClick={() => handleAddToCart(e._id)}
              >
                {" "}
                <box-icon
                  name="cart-alt"
                  size="cssSize"
                  color="#ffffff"
                ></box-icon>{" "}
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product_Detail;

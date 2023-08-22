import React, { useEffect } from "react";
import { useState } from "react";
import Sidebar from "../Components/Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import Edit_Product from "./Edit_Product";

const Product_List = () => {
  const [fetchProductData, setFetchProductData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch("http://localhost:4000/api/products");
      const data = await response.json();
      setFetchProductData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }


  async function handleDelete(id) {
    try {
      const response = await axios.delete(`http://localhost:4000/api/products/${id}`);
      if (response.status === 200) {
        console.log(response.data);
      } else {
        console.error("Error deleting product:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  async function handleDelete(id) {
    try {
      const response = await axios.delete(`http://localhost:4000/api/products/${id}`);
      if (response.status === 200) {
        // Filter out the deleted product from the state
        setFetchProductData((prevData) => prevData.filter(product => product._id !== id));

        console.log(fetchProductData)


        
        
      } else {
        console.error("Error deleting product:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  
  
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex gap-4 mt-4">
          <Sidebar />
          <div className="main">
            <div id="headerdashboard" className="border-bottom py-3 px-5 d-flex justify-content-between mb-4">
              <h1>Products List </h1>
              <Link to="/add-product">
                <button className="btn btn-dark rounded-pill px-5">Add Product</button>
              </Link>
            </div>

            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>Images</th>
                  <th>Products Title</th>
                  <th>Price</th>
                  <th>Discouted</th>
                  <th>Stock</th>
                  <th>Brand</th>
                  <th>Categories</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {fetchProductData.length > 0 ? (
                  fetchProductData.map((e) => (
                    <tr key={e._id}>
                      <td>
                        <img
                          src={e.thumbnail}
                          style={{ width: "40px", height: "40px" }}
                          className="img-thumbnail"
                          alt="image"
                        />
                      </td>
                      <td>{e.title}</td>
                      <td>
                        <div className="d-flex">
                          <box-icon name="rupee"></box-icon> <b>{e.price}</b>
                        </div>
                      </td>
                      <td>{e.discountPercentage}%</td>
                      <td>{e.stock}</td>
                      <td>{e.brand}</td>
                      <td>{e.category}</td>
                      <td style={{width:'120px'}}>
                        <div className="d-flex gap-2">
                          <Link to={`/edit-product/${e._id}`}>
                          <button
                            className="btn"
                          >
                            <box-icon name="edit-alt" color="black"></box-icon>
                            </button>
                          </Link>

                          <button
                            className="btn"
                            onClick={() => handleDelete(e._id)}
                          >
                            <box-icon name="trash" color="red"></box-icon>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{padding:'150px', fontSize: '40px'}} align="center">
                      Data Not Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product_List;

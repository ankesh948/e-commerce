import React, { useEffect } from "react";
import { useState } from "react";
import Sidebar from "../Components/Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";

const Product_List = () => {
  const [fetchProductData, setfetchProductData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:4000/api/products");
        const data = await response.json();
        setfetchProductData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

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

  async function handleUpdate(id, e) {
    e.preventDefault();
    const updatedData = {
      title,
      description,
      price,
      thumbnail,
    };
    try {
      const response = await axios.put(
        `http://localhost:4000/api/products/${id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchDataById(id) {
    try {
      const response = await fetch(`http://localhost:4000/api/products/${id}`);
      const data = await response.json();
      setSingleId(data.id)
      setTitle(data.title)
      setDescription(data.description)
      setPrice(data.price)
      setThumbnail(data.thumbnail)
      setShow(true);
    } catch (error) {
      console.error("Error fetching data:", error);
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
              <Link to="/add_product">
                <button className="btn btn-dark rounded-pill px-5">Add Product</button>
              </Link>
            </div>

            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>Images</th>
                  <th>Products Title</th>
                  {/* <th>Description</th> */}
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
                          src={`../../uploads/${e.thumbnail}`}
                          style={{ width: "40px", height: "40px" }}
                          className="img-thumbnail"
                          alt="image"
                        />
                      </td>
                      <td>{e.title}</td>
                      {/* <td>{e.description}</td> */}
                      <td>
                        <div className="d-flex">
                          <box-icon name="rupee"></box-icon> <b>{e.price}</b>
                        </div>
                      </td>
                      <td>{e.discountPercentage}%</td>
                      <td>{e.stock}</td>
                      <td>{e.brand}</td>
                      <td>{e.category}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <button className="btn">
                            <box-icon name="show-alt"></box-icon>
                          </button>
                          <button
                            className="btn"
                            onClick={() => handleUpdate(e.id)}
                          >
                            <box-icon name="edit-alt" color="black"></box-icon>
                          </button>
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

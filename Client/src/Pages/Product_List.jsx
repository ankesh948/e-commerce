import React, { useEffect } from "react";
import { useState } from "react";
import Sidebar from "../Components/Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";

import DataTable from "react-data-table-component";

const Product_List = () => {
  const [Data, setData] = useState([]);
  const [fetchProductData, setFetchProductData] = useState([]);

  function searchHandle(e) {
    const searchData = e.target.value;
    const filterBySearch = Data.filter((item) => {
      return item.title.toLowerCase().includes(searchData.toLowerCase());
    });
    setFetchProductData(filterBySearch);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:4000/api/products");
        const data = await response.json();
        setData(data);
        setFetchProductData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  async function handleDelete(id) {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/products/${id}`
      );
      if (response.status === 200) {
        setFetchProductData((prevData) =>
          prevData.filter((product) => product._id !== id)
        );
        console.log(fetchProductData);
      } else {
        console.error("Error deleting product:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  const columns = [
    {
      name: "Images",
      selector: (row) => {
        return (
          <img
            src={row.thumbnail}
            className="img-fluid"
            style={{ width: "50px", padding: "5px 0" }}
          />
        );
      },
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Discouted",
      selector: (row) => row.discountPercentage,
      sortable: true,
    },
    {
      name: "Stock",
      selector: (row) => row.stock,
      sortable: true,
    },
    {
      name: "Brand",
      selector: (row) => row.brand,
      sortable: true,
    },
    {
      name: "Categories",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <div className="d-flex gap-2">
            <Link to={`/edit-product/${row._id}`}>
              <button className="btn py-0">
                <box-icon name="edit-alt" color="black"></box-icon>
              </button>
            </Link>

            <button className="btn py-0" onClick={() => handleDelete(row._id)}>
              <box-icon name="trash" color="red"></box-icon>
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex gap-4 mt-4">
          <Sidebar />
          <div className="main">
            <div
              id="headerdashboard"
              className="border-bottom py-3 px-5 d-flex justify-content-between mb-4"
            >
              <h1>Products List </h1>
              <Link to="/add-product">
                <button className="btn btn-dark rounded-pill px-5">
                  Add Product
                </button>
              </Link>
            </div>

            <div className="col-lg-6 mb-4">
              <input
                type="text"
                onChange={searchHandle}
                className="form-control"
                placeholder="Search Box"
              />
            </div>

            <DataTable columns={columns} data={fetchProductData} pagination striped highlightOnHover  />
          </div>
        </div>
      </div>
    </>
  );
};

export default Product_List;

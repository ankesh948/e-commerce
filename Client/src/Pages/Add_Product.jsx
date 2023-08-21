import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Sidebar from "../Components/Sidebar";
import { Link, useNavigate } from "react-router-dom";

function App_Product() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [thumbnail, setThumbnail] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      title,
      description,
      price,
      discountPercentage,
      stock,
      brand,
      category,
      thumbnail,
    };
    console.log('frontend',productData)
    axios.post("http://localhost:4000/api/products", productData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        navigate('/product-list');
      })
      .catch((err) => {
        console.error('api not working',err);
      });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex gap-4 mt-4">
          <Sidebar />
          <div className="main">
            <div id="headerdashboard" className="border-bottom py-3 px-5 d-flex justify-content-between mb-4">
              <h1>Add Product</h1>
              <Link to="/product-list">
                <button className="btn btn-dark rounded-pill">
                  Go to Product List
                </button>
              </Link>
            </div>

          
            <form
              className=""
              method="POST"
              onSubmit={(e) => handleSubmit(e)}
              encType="multipart/form-data"
            >
              <div className="d-flex gap-5 align-items-center">
                <label className="w-10 mb-0" htmlFor="title">
                  Product Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="form-control mb-2"
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="d-flex gap-5 align-items-center">
                <label className="w-10 mb-0" htmlFor="description">
                  Product Description
                </label>
                <textarea
                  type="text"
                  id="description"
                  className="form-control mb-2"
                  placeholder="Description"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="d-flex gap-5 align-items-center">
                <label className="w-10 mb-0" htmlFor="price">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  className="form-control mb-2"
                  placeholder="Price"
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div className="d-flex gap-5 align-items-center">
                <label className="w-10 mb-0" htmlFor="price">
                  Discount Percentage
                </label>
                <input
                  type="number"
                  id="discountPercentage"
                  className="form-control mb-2"
                  placeholder="Discount Percentage"
                  onChange={(e) => setDiscountPercentage(e.target.value)}
                />
              </div>
              <div className="d-flex gap-5 align-items-center">
                <label className="w-10 mb-0" htmlFor="price">
                  Stock
                </label>
                <input
                  type="number"
                  id="stock"
                  className="form-control mb-2"
                  placeholder="Stock"
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </div>
              <div className="d-flex gap-5 align-items-center">
                <label className="w-10 mb-0" htmlFor="price">
                  Brand
                </label>
                <input
                  type="text"
                  id="brand"
                  className="form-control mb-2"
                  placeholder="Brand"
                  onChange={(e) => setBrand(e.target.value)}
                  required
                />
              </div>
              <div className="d-flex gap-5 align-items-center">
                <label className="w-10 mb-0" htmlFor="category">
                  Category
                </label>
                <select
                  id="category"
                  className="form-control mb-2"
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="uncategorized">Uncategorized</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                </select>
              </div>


              <div className="d-flex gap-5 align-items-center">
                <label className="w-10 mb-0" htmlFor="thumbnail">
                  Thumbnail
                </label>
                <input
                  type="file"
                  id="thumbnail"
                  className="form-control mb-2"
                  placeholder="Thumbnail"
                  onChange={(e) => setThumbnail(e.target.files[0])}
                />
              </div>
              <button
                className="btn btn-dark rounded-pill btn-lg px-4 mt-3"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App_Product;

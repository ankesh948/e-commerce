import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import axios from 'axios';


const Edit_Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  const [singleId, setSingleId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState(null);



  useEffect(() => {
    async function fetchDataById() {
      try {
        const response = await axios.get(`http://localhost:4000/api/products/${id}`);
        const data = response.data;
        setSingleId(data.id);
        setTitle(data.title);
        setDescription(data.description);
        setPrice(data.price);
        setDiscountPercentage(data.discountPercentage);
        setStock(data.stock);
        setBrand(data.brand);
        setCategory(data.category);
        setThumbnail(data.thumbnail);
       
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchDataById();
  }, []);




  async function handleUpdate(e) {
    e.preventDefault()
    const updatedData = {title, description, price, discountPercentage, stock, brand, category, thumbnail};
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
      navigate('/product-list');
    } catch (error) {
      console.error(error);
    }
  }



  return (
    <>

<div className="container-fluid">
        <div className="d-flex gap-4 mt-4">
          <Sidebar />
          <div className="main">
            <div id="headerdashboard" className="border-bottom py-3 px-5 d-flex justify-content-between mb-4">
              <h1>Edit Product</h1>
              <Link to="/product-list">
                <button className="btn btn-dark rounded-pill">
                  Go to Product List
                </button>
              </Link>
            </div>

          
            <form
              className=""
              method="POST"
              onSubmit={(e) => handleUpdate(e)}
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
                  value={title}
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
                  value={description}
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
                  value={price}
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
                  value={discountPercentage}
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
                  value={stock}
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
                  value={brand}
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
                  value={category}
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

             <div className="d-flex">
             <div className='w-10 px-5'></div>
              <div className='p-3'>
                <img src={`../../uploads/${thumbnail}`} width={70} alt="" />
              </div>
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
  )
}

export default Edit_Product
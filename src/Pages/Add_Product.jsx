import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Product_List from "./Product_List";

function App_Product() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const userref = useRef(null);
  const [sigleId, setSingleId] = useState("");

  const [fetchProductData, setfetchProductData] = useState([]);

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
      })
      .catch((err) => {
        console.error('api not working',err);
      });
  };

  //       useEffect(() => {
  //           async function fetchData() {
  //             try {
  //               const response = await fetch("http://localhost:4000/api/products");
  //               const data = await response.json();
  //               setfetchProductData(data);
  //             } catch (error) {
  //               console.error("Error fetching data:", error);
  //             }
  //           }
  //           fetchData();
  //         }, []);

  //       async function fetchDataById(id) {
  //         try {
  //           const response = await fetch(`http://localhost:4000/api/products/${id}`);
  //           const data = await response.json();
  //           setSingleId(data.id)
  //           setTitle(data.title)
  //           setDescription(data.description)
  //           setPrice(data.price)
  //           setThumbnail(data.thumbnail)
  //           setShow(true);
  //         } catch (error) {
  //           console.error("Error fetching data:", error);
  //         }
  //       }

  //       async function handleUpdate(id, e) {
  //         e.preventDefault();
  //         const updatedData = {
  //           title,
  //           description,
  //           price,
  //           thumbnail,
  //         };

  //         try {
  //           const response = await axios.put(`http://localhost:4000/api/products/${id}`, updatedData, {
  //             headers: {
  //               'Content-Type': 'multipart/form-data',
  //             },
  //           });
  //           console.log(response);
  //         } catch (error) {
  //           // Handle error here
  //           console.error(error);
  //         }
  //       }

  // async function handleDelete(id) {
  //   try {
  //     const response = await fetch(`http://localhost:4000/api/products/${id}`, {
  //       method: 'DELETE',
  //     });
  //     if (response.ok) {
  //         alert("Deleted")
  //     } else {
  //       console.error('Error deleting product:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error deleting product:", error);
  //   }
  // }

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex gap-4 mt-4">
          <Sidebar />
          <div className="main">
            <div className="border-bottom p-3 d-flex justify-content-between mb-4">
              <h1>Add Product</h1>
              <button className="btn btn-outline-dark">
                Go to Product List
              </button>
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

            {/* <table className='table table-striped table-bordered table-hover'>
        <thead>
          <tr>
            <th>Images</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
        {
          fetchProductData.map((e) => {
            return (
              <tr key={e.id}>
                <td><img src={`../../uploads/${e.thumbnail}`} width={100} className='img-thumbnail' alt="image" /></td>
                <td>{e.title}</td>
                <td>{e.description}</td>
                <td><div className="d-flex"><box-icon name='rupee'></box-icon> <b>{e.price}</b></div></td>
                <td>
                  <div className="d-flex gap-2">
                      <button className='btn btn-success p-1' onClick={()=> fetchDataById(e.id)}>
                        <box-icon name='edit-alt' color='#fff' ></box-icon>
                        </button>
                    <button className='btn btn-danger p-1' onClick={() => handleDelete(e.id)}>
                      <box-icon name='trash' color='#fff' ></box-icon>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })
        }
      </tbody>
      </table> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default App_Product;

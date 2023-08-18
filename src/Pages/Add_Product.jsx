import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Product_List from "./Product_List";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function App_Product() {
  const [sigleId, setSingleId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const userref = useRef(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


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

      async function handleUpdate(id, e) {
        e.preventDefault();
        const updatedData = {
          title,
          description,
          price,
          thumbnail,
        };
      
        try {
          const response = await axios.put(`http://localhost:4000/api/products/${id}`, updatedData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log(response);
        } catch (error) {
          // Handle error here
          console.error(error);
        }
      }



async function handleDelete(id) {
  try {
    const response = await fetch(`http://localhost:4000/api/products/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
        alert("Deleted")
    } else {
      console.error('Error deleting product:', response.statusText);
    }
  } catch (error) {
    console.error("Error deleting product:", error);
  }
}


const handleSubmit = async (e) => {
e.preventDefault();
setShow(false);
const productData = {
  title,
  description,
  price,
  thumbnail,
};
axios
  .post("http://localhost:4000/api/products", productData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.error(err);
  });
};

  return (
    <>
      <Header />
      <div className="d-flex">
        <Sidebar />
        <div className="main">
          <div className="border p-3 d-flex justify-content-between mb-4">
            <h1>Product List</h1>
            <Button variant="info" onClick={handleShow}>
              Add Product
            </Button>
          </div>

    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form method="POST" onSubmit={(e)=>handleUpdate(sigleId, e)} encType="multipart/form-data">
  <label htmlFor="title">Product Title</label>
  <input
    type="text"
    id="title"
    className="form-control mb-2"
    placeholder="Title"
    value={title ? title : ""}
    onChange={(e) => setTitle(e.target.value)}
  />

  <label htmlFor="description">Product Description</label>
  <textarea
    type="text"
    id="description"
    className="form-control mb-2"
    placeholder="Description"
    value={description ? description : ""}
    onChange={(e) => setDescription(e.target.value)}
  ></textarea>

  <label htmlFor="price">Price</label>
  <input
    type="number"
    id="price"
    className="form-control mb-2"
    placeholder="Price"
    value={price ? price : ""}
    onChange={(e) => setPrice(e.target.value)}
  />

  <label htmlFor="thumbnail">Thumbnail</label>
  <div className="d-flex gap-3" >
    {thumbnail? <img src={`../../uploads/${thumbnail}`} width={75} alt="" />: ""}
    <input
      type="file"
      id="thumbnail"
      className="form-control mb-2"
      placeholder="Thumbnail"
      onChange={(e) => setThumbnail(e.target.files[0])}
    />

  <input
      type="test"
      className="form-control mb-2"
      placeholder="Thumbnail"
      value={thumbnail ? thumbnail : ""}
      onChange={(e) => setThumbnail(e.target.value)}
    />
  </div>
  <button className="btn btn-info w-100 mt-3" type="submit">
    Add Product
  </button>
</form>
      </Modal.Body>
    </Modal>




          <table className='table table-striped table-bordered table-hover'>
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
      </table>

        </div>
      </div>
    </>
  );
}

export default App_Product;

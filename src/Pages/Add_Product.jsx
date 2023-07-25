import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Product_List from "./Product_List";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function App_Product() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const userref = useRef(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


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
              <form
                method="POST"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <label htmlFor="">Product Title</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="">Product Description</label>
                <textarea
                  type="text"
                  className="form-control mb-2"
                  placeholder="Description"
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                ></textarea>
                <label htmlFor="">Price</label>
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Price"
                  onChange={(e) => setPrice(e.target.value)}
                />
                <label htmlFor="">Thumbnail</label>
                <input
                  type="file"
                  className="form-control mb-2"
                  placeholder="Thumbnail"
                  onChange={(e) => setThumbnail(e.target.files[0])}
                />
                <button
                  className="btn btn-info w-100 mt-3"
                  type="submit"
                >
                  Add Product
                </button>
              </form>
            </Modal.Body>
          </Modal>
          <Product_List />
        </div>
      </div>
    </>
  );
}

export default App_Product;

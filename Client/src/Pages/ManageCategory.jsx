import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import axios from "axios";
import { useRef } from "react";

const ManageCategory = () => {

    const [categoryName, setCategoryName] = useState("");
    const [categorySlug, setCategorySlug] = useState("");

    const handleCategoryNameFocus = () => {
      setCategorySlug(categoryName.toLowerCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData ={
            categoryName,
            categorySlug
        }
        console.log(formData)
        axios.post("http://localhost:4000/api/category", formData)
          .then((res) => {
            console.log(res.data);
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
            <div
              id="headerdashboard"
              className="border-bottom py-3 px-5 d-flex justify-content-between mb-4"
            >
              <h1>Manage Categries</h1>
            </div>

            <div id="categorypage" className="d-flex gap-5">
              <div className="col">
                <h4 className="mt-5 mb-4">Add Categories</h4>
                <form
                  className="card p-4"
                  method="POST"
                  onSubmit={(e) => handleSubmit(e)}
                  encType="multipart/form-data"
                >
                  <div className="d-flex gap-5 align-items-center">
                    <label className="w-10 mb-0" htmlFor="title">
                      Category Name
                    </label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Category Name"
                      onChange={(e) => setCategoryName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="d-flex gap-5 align-items-center">
                    <label className="w-10 mb-0" htmlFor="description">
                      Category Slug
                    </label>
                    <input
                      type="text"
                      id="slug"
                      className="form-control mb-2"
                      placeholder="Category Slug"
                      value={categorySlug}
                      onChange={(e) => setCategorySlug(e.target.value)}
                      onFocus={handleCategoryNameFocus}
                      required
                    />
                  </div>

                  <div className="d-flex gap-5 align-items-center">
                    <button
                      className="btn btn-dark rounded-pill btn-lg px-5  mt-3"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageCategory;

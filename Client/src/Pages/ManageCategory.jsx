import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import axios from "axios";
import { render } from "react-dom";

const ManageCategory = () => {

    const [categoryName, setCategoryName] = useState("");
    const [categorySlug, setCategorySlug] = useState("");
    const [fetchingCategoryData, setCategoryData] = useState([]);

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

  useEffect(()=>{
    axios.get("http://localhost:4000/api/category")
      .then((res) => {
        setCategoryData(res.data)
      })
      .catch((err) => {
        console.error('api not working',err);
      });
  })

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
                <form
                  className="card p-4"
                  method="POST"
                  onSubmit={(e) => handleSubmit(e)}
                  encType="multipart/form-data"
                >
                  <div className="row">
                  <div className="col-5">
                    <label className="w-10 mb-1" htmlFor="title">
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
                  <div className="col-5">
                    <label className="w-10 mb-0" htmlFor="description">
                      Category Slug
                    </label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Category Slug"
                      onChange={(e) => setCategorySlug(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-2">
                    <button
                      className="btn btn-light rounded-pill btn-lg px-5"
                      type="submit"
                      style={{marginTop: '30px'}}
                    >
                      Submit
                    </button>
                  </div>
                  </div>
                </form>
              </div>
            </div>

          <table className="table table-striped table-bordered table-hover mt-4">
            <thead>
                <tr>
                <th>Id</th>
                <th>Category Name</th>
                <th>Category Slug</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {
              fetchingCategoryData.map((e, i)=>{
                return(
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td>{e.categoryName}</td>
                    <td>{e.categorySlug}</td>
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
                )
              })
            }
            </tbody>
          </table>


          </div>
        </div>
      </div>
    </>
  );
};

export default ManageCategory;

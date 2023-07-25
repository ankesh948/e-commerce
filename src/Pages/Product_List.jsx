  import React, { useEffect } from 'react'
  import { useState } from 'react';


  const Product_List = () => {

    const [fetchProductData, setfetchProductData] = useState([]);

      useEffect(() => {
          async function fetchData() {
            try {
              const response = await fetch("http://localhost:4000/api/products");
              const data = await response.json();
              setfetchProductData(data);
              console.log(data)
      
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          }
          fetchData();
        }, []);

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


        async function handleUpdate(id) {
          try {
            const response = await fetch(`http://localhost:4000/api/products/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatedData),
            });
            console.log(response)
          } catch (error) {
            console.error("Error updating product:", error);
          }
        }


    return (
      <div>


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
                    <button className='btn btn-success p-1' onClick={() => handleUpdate(e.id)}>
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
  )
}

export default Product_List
  import React, { useEffect } from 'react'
  import { useState } from 'react';
  import DataTable from 'react-data-table-component';

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

        const columns = [
            { name: "Thumbnail",  cell: (row) => <img src={`../../uploads/${row.thumbnail}`} alt="thumbnail" width={100} />, },
            { name: "Title", selector: (row) => row.title, sortable: true },
          { name: "Description", selector: (row) => row.description, sortable: true },
        ];


    return (
      <div>

      <DataTable
          columns={columns}
          data={fetchProductData}
          pagination
          selectableRows
          highlightOnHover
          className='table-bordered '
        />


      {/* <table className='table table-striped table-bordered table-hover'>
        <thead>
          <tr>
            <th>Images</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
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
                <td>{e.price}</td>
              </tr>
            );
          })
        }
      </tbody>
      </table> */}
    </div>
  )
}

export default Product_List
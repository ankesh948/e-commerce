import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';

function App_Product() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [daata,setdata]=useState("")
  

  const [fetchProductData, setfetchProductData] = useState([]);


  const handleSubmit =  async (e) => {
    setdata('g')
    e.preventDefault();
    const productData = {
      title, 
      description, 
      price,
      thumbnail
    };
  
    axios.post('http://localhost:4000/api/products', productData, { 
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
    .then((res) => {
      console.log(res.data);
      setTitle('');
      setDescription('');
      setPrice('');
      setThumbnail('');
    })
    .catch((err) => {
      console.error(err);
    });
  };




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
    
  }, [daata]);

  return (
    <>
     <Header />
    <div className="d-flex">
        <Sidebar/>
        <div className="main">
    <div className='container'>
      <div className='row'>
        <div className='col-5 card p-3 mt-3 m-auto'>
          <h2 className='mb-3'>Add Product</h2>
          <form method="POST" onSubmit={handleSubmit} encType='multipart/form-data'>
            <label htmlFor="">Product Title</label>
            <input type="text" className='form-control mb-2' placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <label htmlFor="">Product Description</label>
            <textarea type="text" className='form-control mb-2' placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} rows={3}></textarea>
            <label htmlFor="">Price</label>
            <input type="number" className='form-control mb-2' placeholder="Price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
            <label htmlFor="">Thumbnail</label>
            <input type="file" className='form-control mb-2' placeholder="Thumbnail"  onChange={(e)=>setThumbnail(e.target.files[0])}/>
            <button className='btn btn-info w-100 mt-3' type="submit">Add Product</button>
          </form>
        </div>
      </div>


      <div className="row mt-5">
        <h3>Product List</h3>
      <table className='table table-striped table-bordered table-hover'>
        {
          fetchProductData.map((e) => {
        
            return (
              <tr key={e.id}>
                <td>{e.title}</td>
                <td>{e.description}</td>
                <td>{e.price}</td>
                <td><img src={`../../uploads/${e.thumbnail}`} width={50} className='img-fluid' alt="image" /></td>
              </tr>
            );
          })
        }
</table>
      </div>
    </div>
    </div>
    </div>
    </>
  );
}

export default App_Product;

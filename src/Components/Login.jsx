import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      title, 
      description, 
      price,
      thumbnail
    };
    console.log(productData)
    axios.post('http://localhost:4000/api/products', productData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };


  return (
    <div>
      <h1>Add Product</h1>
      <form method="POST" onSubmit={handleSubmit} encType='multipart/form-data'>
        <input type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
        <input type="text" placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
        <input type="number" placeholder="Price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
        <input type="file" placeholder="Thumbnail"  onChange={(e)=>setThumbnail(e.target.files[0])}/>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default Login;

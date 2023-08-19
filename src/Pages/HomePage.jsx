import React from 'react'
import FrontentHeader from '../Components/FrontentHeader';


const HomePage = () => {
  return (
    <>
      <FrontentHeader/>

      <div className="banner">
        <div className="container">
          <img
            src="../src/assets/Img/slider.png"
            className="img-fluid"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default HomePage
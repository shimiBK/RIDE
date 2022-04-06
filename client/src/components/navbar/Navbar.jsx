import React from 'react';
import "./navbar.css";

function Navbar() {
  return (
    <div className="navContainer">
      <div className="navWrapper">
        <div className="navLeft">
          <img src="../../../public/assests/roi.png" alt="logo" className="logo" />
        </div>
        <div className="navRight">
        </div>
      </div>
    </div>
  )
}

export default Navbar
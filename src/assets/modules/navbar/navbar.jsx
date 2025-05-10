import React from 'react';
import navbar from './navbar.css';


function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        MR SINGH
        <span className="online-store">Online Store</span>
      </div>
      <ul className="nav-links">
        <li>
          <a href="/">
            Home <i className="arrow-down"></i>
          </a>
        </li>
        <li>
          <a href="#">Men</a>
        </li>
        <li>
          <a href="#">Women</a>
        </li>
        <li>
          <a href="#">
            Page <i className="arrow-down"></i>
          </a>
        </li>
        <li>
          <a href="#">Shop</a>
        </li>
        <li>
          <a href="#">Sale</a>
        </li>
        <li>
          <a href="/login-activity">login</a>
        </li>
        <li className="icons">
          <a href="#">
            <i className="user-icon"></i>
          </a>
          <a href="#">
            <i className="cart-icon"></i>
          </a>
          <a href="#">
            <i className="search-icon"></i>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
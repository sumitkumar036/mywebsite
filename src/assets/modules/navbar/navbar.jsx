import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUser,
  faShoppingCart,
  faSearch,
} 

from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/mrsingh.png';

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Logo always visible */}
        <img
          src={logo}
          alt="MR Singh Mart Logo"
          height={40}
          width={40}
          className="me-2"
        />
      
        {/* Hamburger toggler visible only on small & medium */}
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasMenu"
          aria-controls="offcanvasMenu"
          aria-label="Toggle menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links visible only on large screens */}
        <div className="d-none d-lg-flex ms-auto">
          <ul className="navbar-nav flex-row align-items-center gap-3">

            <li className="nav-item">
              <a className="nav-link active d-flex align-items-center" href="#/home">
                <FontAwesomeIcon icon={faHome} className="me-1" />
                Home <FontAwesomeIcon className="ms-1" />
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link d-flex align-items-center" href="#/login">
                 <FontAwesomeIcon icon={faUser} className="me-1" />
                Login <FontAwesomeIcon className="ms-1" />
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link d-flex align-items-center" href="#/cart">
                   <FontAwesomeIcon icon={faShoppingCart} className="me-1" />
                Cart <FontAwesomeIcon className="ms-1" />
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link d-flex align-items-center" href="#/search">
                 <FontAwesomeIcon icon={faSearch} className="me-1" />
                Search <FontAwesomeIcon className="ms-1" />
              </a>
            </li>
          </ul>
        </div>

        {/* Offcanvas sidebar for small/medium screens */}
        <div
          className="offcanvas offcanvas-start bg-dark text-light"
          tabIndex="-1"
          id="offcanvasMenu"
          aria-labelledby="offcanvasMenuLabel"
          style={{
            backgroundColor: '#212529', // Bootstrap's dark background
            color: '#f8f9fa',            // Light text
            borderRight: '1px solid #343a40', // Optional: subtle border
          }}
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasMenuLabel">
              Menu
            </h5>
           <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav">
              <li className="nav-item mb-2">
                <a className="nav-link active" href="#/home">
                  <FontAwesomeIcon icon={faHome} className="me-2" />
                  Home
                </a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link" href="#/login">
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  Login
                </a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link" href="#/cart">
                  <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                  Cart
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/search">
                  <FontAwesomeIcon icon={faSearch} className="me-2" />
                  Search
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

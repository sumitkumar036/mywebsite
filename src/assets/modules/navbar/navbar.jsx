import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faShoppingCart, faSearch, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/mrsingh.png';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
      
        <img src={logo} alt="GPRN Logo" height={40} width={40}/>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation" >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/Home">
                <FontAwesomeIcon icon={faHome} className="me-1" /> {/* Home Icon */}
                Home <FontAwesomeIcon icon={faAngleDown} className="ms-1" />
              </a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="#">
                Men
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Women
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Page <FontAwesomeIcon icon={faAngleDown} className="ms-1"/>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Shop
              </a>
            </li> */}
            {/* <li className="nav-item">
              <a className="nav-link" href="#">
                Sale
              </a>
            </li> 
             <li className="nav-item">
              <a className="nav-link" href="#/login">
                Login
              </a>
            </li>*/}
            <li className="nav-item d-flex align-items-center">
              <a className="nav-link" href="#/login">
                <FontAwesomeIcon icon={faUser} />
              </a>
            </li>
            <li className="nav-item d-flex align-items-center">
              <a className="nav-link" href="#">
                <FontAwesomeIcon icon={faShoppingCart} />
              </a>
            </li>
            <li className="nav-item d-flex align-items-center">
              <a className="nav-link" href="#">
                <FontAwesomeIcon icon={faSearch} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

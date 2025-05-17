import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/*
  Bootstrap + Font-Awesome configuration
*/

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'font-awesome/css/font-awesome.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <React.Fragment>
        <App />
      <ToastContainer 
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
  />
      </React.Fragment>
  </React.StrictMode>
);

reportWebVitals();

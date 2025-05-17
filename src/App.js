import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './assets/modules/login/Login';
import RegisterForm from './assets/modules/register/RegisterForm';
import Home from './assets/modules/home/Home';
import ProductDescription from './assets/modules/product/form/ProductDescription';
import Layout from './assets/common/Layout';
import Checkout from './assets/modules/checkout/Checkout';
import CartContainer from './assets/modules/cart/CartContainer';
import InvoiceApp from './assets/modules/invoice/InvoiceApp'


//[...prevItems] => is a new array with all the same items copied from prevItems.
function App() {

  const [cartItems, setCartItems] = useState([]);

const [customerInformation, setCustomerInformation] = useState({
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  apartment: '',
  city: '',
  country: 'India',
  state: '',
  zip: '',
  phone: ''
});

  //This is to add product and increase quantity if already exist
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const exist = prevItems.find(item => item.id === product.id);
      if (exist) {
        // Increase existing quantity by product.quantity
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      } else {
        // Add new product with given quantity or default to 1
        return [...prevItems, { ...product, quantity: product.quantity || 1 }];
      }
    });
  };

  // This is to remove quantity or remove product if quantity is 1
  const removeFromCart = (product) => {
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === product.id) {
          // If quantity is 1, do not decrease
          if (item.quantity === 1) {
            return item;
          }
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    });

  };


  // This is to delete product completely from the cart
  const deleteFromCart = (product) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== product.id));
  };

  const item = cartItems.map(item => ({
  description: item.title,
  quantity: item.quantity,
  price: item.price,
}));

  //****************************************************************
  // DELETE_FROM_CART
  //-----------------
  //
  // This is to delete product completely from the cart
  //****************************************************************
const Invoice = {
  company: {
    name: "MR SINGH MART",
    logoUrl: "https://s3-us-west-2.amazonaws.com/appsdeveloperblog.com/images/cats/cat-2.jpg",
    address: "Near Phoenix Mall, Bangalore, Karnataka",
    email: "contact@mrsinghmart.com",
    phone: "+91 809 351 2506",
  },

  customer: {
    name: `${customerInformation.firstName} ${customerInformation.lastName}`,

    address: `${customerInformation.address}, 
              ${customerInformation.apartment} 
              ${customerInformation.city}, 
              ${customerInformation.state},
              ${customerInformation.zip}`,
    email: customerInformation.email,

    phone: customerInformation.mobile,
  },
  
  invoiceNumber: "INV-1001",
  invoiceDate: "2025-05-17",
  dueDate: "2025-06-01",

  items: item,

  notes: "Thank you for shopping with us!",
  terms: "Payment due within 15 days.",
};



return (
  <div className="App-bg min-vh-100 d-flex flex-column">
    <HashRouter>
      <Routes>
        {/* Common layout for all pages */}
        <Route path="/" element={<Layout 
          cartItems={cartItems}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          deleteFromCart={deleteFromCart}
        />}>
          {/* Nested routes inside Layout */}
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="registration" element={<RegisterForm />} />
          <Route path="invoice" element={<InvoiceApp invoiceData={Invoice}/>} />

          <Route path="checkout" element={
           <Checkout 
                  cartItems={cartItems} 
                  customerInformation={customerInformation} 
                  setCustomerInformation={setCustomerInformation}
                />
            } />

          <Route path="products/:id" element={
              <ProductDescription 
                cartItems={cartItems}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                deleteFromCart={deleteFromCart}
              />
            } />

          <Route path="cart" element={<CartContainer 
            cartItems={cartItems}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            deleteFromCart={deleteFromCart}
          />} />

        </Route>
      </Routes>
    </HashRouter>
  </div>
);
}

export default App;

import React, { useEffect, useState } from 'react';
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


//[...prevItems] => is a new array with all the same items copied from prevItems.
function App() {
   // Cart state - array of objects {id, title, price, quantity, image}
  const [cartItems, setCartItems] = useState([]);

  /* ***************************************************************
   DELETE_FROM_CART
  -----------------
  
  This is to add product or increase quantity
  //****************************************************************
  */
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



  //****************************************************************
  // DELETE_FROM_CART
  //-----------------
  //
  // This is to remove quantity or remove product if quantity is 1
  //****************************************************************

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

  //****************************************************************
  // DELETE_FROM_CART
  //-----------------
  //
  // This is to delete product completely from the cart
  //****************************************************************
  const deleteFromCart = (product) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== product.id));
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
            <Route path="checkout" element={<Checkout cartItems={cartItems}/>} />

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

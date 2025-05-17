import React from 'react';
import Cart from './Cart';
import { useNavigate } from 'react-router-dom';  // <-- import useNavigate

const CartContainer = ({ cartItems, addToCart, removeFromCart, deleteFromCart }) => {
  const navigate = useNavigate();  // <-- call useNavigate inside the component

  if (cartItems.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className="container mt-5 bg-light p-4 rounded shadow">
      <h2>Your Cart</h2>
      {cartItems.map(item => (
        <Cart
          key={item.id}
          image={item.image}
          title={item.title}
          price={item.price}
          quantity={item.quantity}
          addQuantity={() => addToCart(item)}
          removeQuantity={() => removeFromCart(item)}
          onDelete={() => deleteFromCart(item)}
        />
      ))}

      <button
        className="btn btn-primary mt-2 w-100"
        onClick={() => navigate("/checkout")}  // <-- wrap in function
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartContainer;

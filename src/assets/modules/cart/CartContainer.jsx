import React, { useState } from 'react';
import Cart from './Cart';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { toast } from 'react-toastify';

const CartContainer = () => {

    const navigate = useNavigate();

  const [items, setItems] = useState([
    {
      id: 1,
      image: 'https://s3-us-west-2.amazonaws.com/appsdeveloperblog.com/images/cats/cat-5.jpg',
      title: 'Apple',
      price: 1.2,
      quantity: 2,
    },
    {
      id: 2,
      image: 'https://s3-us-west-2.amazonaws.com/appsdeveloperblog.com/images/cats/cat-6.jpg',
      title: 'Banana',
      price: 0.8,
      quantity: 1,
    }
  ]);

  const increaseQty = (id) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const deleteItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="container mt-5 bg-light p-4 rounded shadow">
      <h3>Your Cart</h3>
      {items.map(item => (
        <Cart
          key={item.id}
          image={item.image}
          title={item.title}
          price={item.price}
          quantity={item.quantity}
          onAdd={() => increaseQty(item.id)}
          onRemove={() => decreaseQty(item.id)}
          onDelete={() => deleteItem(item.id)}
        />
      ))}

        <button
        className="btn btn-primary btn-lg w-100 mt-3"
        onClick={() => {
            toast.success('Redirecting to checkout...');
            navigate('/checkout');
        }}
        >
  <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
  Checkout
</button>
    </div>
  );
};

export default CartContainer;

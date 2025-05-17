import React from 'react';
import config from '../../script/config';

const Cart = ({ image, title, price, quantity, addQuantity, removeQuantity, onDelete }) => {
  
  return (
    <div className="d-flex align-items-center mb-3 p-3 border rounded shadow-sm">
      {/* Product Image */}
      <img
        src={image}
        alt={title}
        className="img-thumbnail"
        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
      />

      {/* Product Details */}
      <div className="ms-4 flex-grow-1">
        <h5 className="mb-1">{title}</h5>
        <p className="mb-2 text-muted">Price: <strong>{config.rupeeSymbol} {(price*quantity).toFixed(2)}</strong></p>

        {/* Quantity Controls */}
        <div className="d-flex align-items-center">
          <button
            className="btn btn-outline-secondary btn-sm me-2"
            onClick={removeQuantity}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="fw-bold">{quantity}</span>
          <button
            className="btn btn-outline-secondary btn-sm ms-2"
            onClick={addQuantity}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Delete Button */}
      <button 
          className="btn btn-danger btn-sm"
          onClick={onDelete}>
          🗑️
      </button>
    </div>
  );
};

export default Cart;

import React from "react";

export default function OrderSummary({
  cartItems,
  shippingCost,
  discountCode,
  onDiscountCodeChange,
  onApplyDiscount,
  totalAmount,
}) {
  const calculateSubtotal = () =>
    cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h5 className="fw-bold mb-4">Order Summary</h5>
        <ul className="list-unstyled">
          {cartItems.map((item) => (
            <li key={item.name} className="d-flex justify-content-between mb-2">
              <span>{item.quantity} x {item.name}</span>
              <span>₹{(item.quantity * item.price).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <hr />
        <div className="d-flex justify-content-between">
          <span>Subtotal</span>
          <span>₹{calculateSubtotal().toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>Shipping</span>
          <span>₹{shippingCost.toFixed(2)}</span>
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="discountCode" className="form-label">Discount Code</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="discountCode"
              value={discountCode}
              onChange={onDiscountCodeChange}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={onApplyDiscount}
            >
              Apply
            </button>
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-between fw-bold">
          <span>Total</span>
          <span>₹{totalAmount.toFixed(2)}</span>
        </div>
        <div className="mt-3 d-flex gap-2">
          <img
            src="https://placehold.co/80x80/cccccc/ffffff?text=Secure"
            alt="Secure"
          />
          <img
            src="https://placehold.co/80x80/cccccc/ffffff?text=Trusted"
            alt="Trusted"
          />
        </div>
      </div>
    </div>
  );
}

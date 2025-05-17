import React from 'react';

export default function Method({ shippingMethod, onChange, onNext, onBack }) {
  return (
    <div className="card p-4 shadow-sm">
      <h4 className="mb-3">Shipping Method</h4>

      <div className="form-check mb-2">
        <input
          type="radio"
          id="standard"
          name="shippingMethod"
          value="standard"
          checked={shippingMethod === 'standard'}
          onChange={onChange}
          className="form-check-input"
        />
        <label className="form-check-label" htmlFor="standard">Standard Shipping - ₹5.00</label>
      </div>

      <div className="form-check mb-3">
        <input
          type="radio"
          id="express"
          name="shippingMethod"
          value="express"
          checked={shippingMethod === 'express'}
          onChange={onChange}
          className="form-check-input"
        />
        <label className="form-check-label" htmlFor="express">Express Shipping - ₹15.00</label>
      </div>

      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={onBack}>Back</button>
        <button className="btn btn-primary" onClick={onNext} disabled={!shippingMethod}>Continue</button>
      </div>
    </div>
  );
}

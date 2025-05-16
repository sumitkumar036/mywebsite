import React from 'react';

export default function Shipping({ shippingAddress, onChange, onNext, onBack }) {
  return (
    <div className="card p-4 shadow-sm">
      <h4 className="mb-3">Shipping Address</h4>

      {/* same form fields as before... */}

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label" htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            className="form-control"
            value={shippingAddress.firstName}
            onChange={onChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            className="form-control"
            value={shippingAddress.lastName}
            onChange={onChange}
            required
          />
        </div>
      </div>

      {/* ...rest of inputs omitted for brevity, same as before */}

      <div className="mb-3">
        <label className="form-label" htmlFor="address">Address</label>
        <input
          id="address"
          name="address"
          className="form-control"
          value={shippingAddress.address}
          onChange={onChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="apartment">Apartment, suite, etc. (optional)</label>
        <input
          id="apartment"
          name="apartment"
          className="form-control"
          value={shippingAddress.apartment}
          onChange={onChange}
        />
      </div>

      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label" htmlFor="city">City</label>
          <input
            id="city"
            name="city"
            className="form-control"
            value={shippingAddress.city}
            onChange={onChange}
            required
          />
        </div>
        <div className="col-md-4">
          <label className="form-label" htmlFor="state">State</label>
          <input
            id="state"
            name="state"
            className="form-control"
            value={shippingAddress.state}
            onChange={onChange}
            required
          />
        </div>
        <div className="col-md-4">
          <label className="form-label" htmlFor="zip">ZIP code</label>
          <input
            id="zip"
            name="zip"
            className="form-control"
            value={shippingAddress.zip}
            onChange={onChange}
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="phone">Phone (optional)</label>
        <input
          id="phone"
          name="phone"
          className="form-control"
          value={shippingAddress.phone}
          onChange={onChange}
        />
      </div>

      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={onBack}>Back</button>
        <button className="btn btn-primary" onClick={onNext}>Continue</button>
      </div>
    </div>
  );
}

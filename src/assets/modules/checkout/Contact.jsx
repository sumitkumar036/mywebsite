import React from 'react';

export default function Contact({ contact, onChange, onNext }) {
  return (
    <div className="card p-4 shadow-sm">
      <h4 className="mb-3">Contact Information</h4>
      <div className="mb-3">
        <label className="form-label" htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control"
          value={contact.email}
          onChange={onChange}
          required
        />
      </div>
      <button className="btn btn-primary" onClick={onNext}>Continue to Shipping</button>
    </div>
  );
}

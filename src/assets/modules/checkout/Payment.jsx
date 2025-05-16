import React from 'react';

export default function Payment({ payment, onChange, onBack, onSubmit }) {
  
  // Format card number with dashes: e.g. 1234-5678-9012-3456
  const formatCardNumber = (value) => {
    // Remove all non-digit characters first
    const digits = value.replace(/\D/g, '');
    // Group digits by 4 and join with dash
    return digits.match(/.{1,4}/g)?.join('-') || '';
  };

  // Handle input change with formatting for cardNumber field
  const handleCardNumberChange = (e) => {
    const rawValue = e.target.value;
    const formattedValue = formatCardNumber(rawValue);
    // Create a synthetic event-like object to pass to onChange
    onChange({
      target: {
        name: 'cardNumber',
        value: formattedValue
      }
    });
  };

  return (
    <form onSubmit={onSubmit} className="card p-4 shadow-sm">
      <h4 className="mb-3">Payment</h4>

      <div className="mb-3">
        <label className="form-label" htmlFor="cardNumber">Card Number</label>
        <input
          id="cardNumber"
          name="cardNumber"
          className="form-control"
          value={payment.cardNumber}
          onChange={handleCardNumberChange}
          placeholder="1234-5678-9012-3456"
          maxLength={19}  // 16 digits + 3 dashes
          required
        />
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label" htmlFor="expiry">Expiry Date (MM/YY)</label>
          <input
            id="expiry"
            name="expiry"
            className="form-control"
            value={payment.expiry}
            onChange={onChange}
            placeholder="MM/YY"
            required
            />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="cvv">CVV</label>
          <input
            id="cvv"
            name="cvv"
            className="form-control"
            value={payment.cvv}
            onChange={onChange}
            maxLength={3}
            type='password'
            required
            />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="nameOnCard">Name on Card</label>
        <input
          id="nameOnCard"
          name="nameOnCard"
          className="form-control"
          placeholder="MR SINGH"
          value={payment.nameOnCard}
          onChange={onChange}
          required
        />
      </div>

      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-secondary" onClick={onBack}>Back</button>
        <button type="submit" className="btn btn-success">Pay now</button>
      </div>
    </form>
  );
}

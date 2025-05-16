import React, { useState } from 'react';
import Contact from './Contact';
import Shipping from './Shipping';
import Method from './Method';
import Payment from './Payment';


const steps = ['Contact', 'Shipping', 'Method', 'Payment'];


export default function Checkout() {
  const [step, setStep] = useState(1);

  const [contact, setContact] = useState({ email: '' });
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    country: 'India',
    state: 'Karnataka',
    zip: '',
    phone: ''
  });
  const [shippingMethod, setShippingMethod] = useState('');
  const [payment, setPayment] = useState({ cardNumber: '', expiry: '', cvv: '', nameOnCard: '' });

  // Discount code state
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  // Dummy cart items for order summary (replace with your actual cart data)
  const cartItems = [
    { name: 'Item A', quantity: 2, price: 150 },
    { name: 'Item B', quantity: 1, price: 250 },
  ];

  // Shipping cost example
  const shippingCost = 50;

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const totalAmount = discountApplied ? subtotal + shippingCost - 50 : subtotal + shippingCost; // example discount

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleContactChange = (e) => setContact({ ...contact, [e.target.name]: e.target.value });
  const handleShippingAddressChange = (e) => setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  const handleShippingMethodChange = (e) => setShippingMethod(e.target.value);
  const handlePaymentChange = (e) => setPayment({ ...payment, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Order submitted!');
  };

  const handleDiscountCodeChange = (e) => setDiscountCode(e.target.value);
  const applyDiscount = () => {
    if (discountCode.trim().toLowerCase() === 'save50') {
      setDiscountApplied(true);
      alert('Discount applied!');
    } else {
      alert('Invalid discount code');
      setDiscountApplied(false);
    }
  };

  // Function to render the current step form
  const renderCheckoutStep = () => {
    switch (step) {
      case 1:
        return (
          <Contact
            contact={contact}
            onChange={handleContactChange}
            onNext={nextStep}
            showBack={false}
          />
        );
      case 2:
        return (
          <Shipping
            shippingAddress={shippingAddress}
            onChange={handleShippingAddressChange}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <Method
            shippingMethod={shippingMethod}
            onChange={handleShippingMethodChange}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <Payment
            payment={payment}
            onChange={handlePaymentChange}
            onBack={prevStep}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center">MR SINGH MART - Checkout</h1>

      {/* Step Indicator */}
      <div className="mb-4 d-flex justify-content-between">
        {steps.map((label, index) => {
          const stepNum = index + 1;
          const active = stepNum === step;
          const completed = stepNum < step;
          return (
            <div key={label} className="text-center flex-fill">
              <div
                className={`rounded-circle mx-auto mb-1 ${
                  completed ? 'bg-success' : active ? 'bg-primary' : 'bg-light text-muted'
                }`}
                style={{
                  width: '30px',
                  height: '30px',
                  lineHeight: '30px',
                  color: completed ? 'white' : active ? 'white' : '#6c757d',
                  fontWeight: 'bold',
                }}
              >
                {stepNum}
              </div>
              <small className={active ? 'text-primary' : completed ? 'text-success' : 'text-muted'}>
                {label}
              </small>
            </div>
          );
        })}
      </div>

      <div className="row">
        <div className="col-md-8">{renderCheckoutStep()}</div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="fw-bold mb-4">Order Summary</h5>
              <ul className="list-unstyled">
                {cartItems.map((item) => (
                  <li key={item.name} className="d-flex justify-content-between mb-2">
                    <span>
                      {item.quantity} x {item.name}
                    </span>
                    <span>₹{(item.quantity * item.price).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <hr />
              <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Shipping</span>
                <span>₹{shippingCost.toFixed(2)}</span>
              </div>

              <div className="mb-3 mt-3">
                <label htmlFor="discountCode" className="form-label">
                  Discount Code
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    id="discountCode"
                    value={discountCode}
                    onChange={handleDiscountCodeChange}
                    disabled={discountApplied}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    onClick={applyDiscount}
                    disabled={discountApplied}
                  >
                    {discountApplied ? 'Applied' : 'Apply'}
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
                  className="me-2"
                />
                <img
                  src="https://placehold.co/80x80/cccccc/ffffff?text=Trusted"
                  alt="Trusted"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Check } from 'react-bootstrap-icons'; // You're importing this but not using it yet
import StateInformation from '../../common/StateInformation';
import { State } from 'country-state-city';

function MiniAmiPressCheckout() {
  const [step, setStep] = useState(1); // 1: Contact, 2: Shipping, 3: Shipping Method, 4: Payment
  const [contact, setContact] = useState({ email: '' });
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '', lastName: '', address: '', apartment: '', city: '', country: 'India', state: 'Karnataka', zip: '', phone: ''
  });
  const [shippingMethod, setShippingMethod] = useState('');
  const [payment, setPayment] = useState({ cardNumber: '', expiry: '', cvv: '', nameOnCard: '' });
  const [cartItems, setCartItems] = useState([
    { name: 'Shampoo', quantity: 5, price: 10.00 },
    { name: 'Product 2', quantity: 2, price: 5.00 },
  ]);
  const [discountCode, setDiscountCode] = useState('');

   // State for storing states of India
  const [states, setStates] = useState([]);
  
  // State for selected state
  const [selectedState, setSelectedState] = useState(shippingAddress.state);

  const handleStateChange = (e) => {
    const newState = e.target.value;
    setShippingAddress({ ...shippingAddress, state: newState });
    setSelectedState(newState);
    handleShippingAddressChange(e)
  };

  useEffect(() => {
    // Fetch the states of India when the component mounts
    const result = State.getStatesOfCountry('IN');
    setStates(result);
  }, []);
  
  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleContactChange = (e) => setContact({ ...contact, [e.target.name]: e.target.value });
  const handleShippingAddressChange = (e) => setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  const handlePaymentChange = (e) => setPayment({ ...payment, [e.target.name]: e.target.value });
  const handleDiscountCodeChange = (e) => setDiscountCode(e.target.value);

  const calculateSubtotal = () => cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const shippingCost = 5.00;
  const totalAmount = calculateSubtotal() + shippingCost;

  const renderCheckoutStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            {/* ********************************************************** Contact Information ****************************************************************/}
            <h2>Contact Information</h2>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" name="email" value={contact.email} onChange={handleContactChange} required />
            </div>
            <button onClick={nextStep} className="btn btn-primary">Continue to Shipping</button>
          </div>
        );
      case 2:
        return (
          <div>
             {/* ********************************************************** Shipping Address ****************************************************************/}
            <h2>Shipping Address</h2>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input type="text" className="form-control" id="firstName" name="firstName" value={shippingAddress.firstName} onChange={handleShippingAddressChange} required />
              </div>
              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input type="text" className="form-control" id="lastName" name="lastName" value={shippingAddress.lastName} onChange={handleShippingAddressChange} required />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input type="text" className="form-control" id="address" name="address" value={shippingAddress.address} onChange={handleShippingAddressChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="apartment" className="form-label">Apartment, suite, etc. (optional)</label>
              <input type="text" className="form-control" id="apartment" name="apartment" value={shippingAddress.apartment} onChange={handleShippingAddressChange} />
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="city" className="form-label">City</label>
                <input type="text" className="form-control" id="city" name="city" value={shippingAddress.city} onChange={handleShippingAddressChange} required />
              </div>
              <div className="col-md-4">
                <label htmlFor="country" className="form-label">Country</label>
                <select className="form-select" id="country" name="country" value={shippingAddress.country} onChange={handleShippingAddressChange}>
                  <option value="India">India</option>
                  {/* Add more countries */}
                </select>
              </div>
              <div className="col-md-2">
                <label htmlFor="state" className="form-label">State</label>
                <StateInformation
                  states={states}
                  selectedState={selectedState}
                  onChange={handleStateChange}
                  />
              </div>
              <div className="col-md-4">
                <label htmlFor="zip" className="form-label">ZIP code</label>
                <input type="text" className="form-control" id="zip" name="zip" value={shippingAddress.zip} onChange={handleShippingAddressChange} required />
              </div>
              <div className="col-md-4">
                <label htmlFor="phone" className="form-label">Phone (optional)</label>
                <input type="tel" className="form-control" id="phone" name="phone" value={shippingAddress.phone} onChange={handleShippingAddressChange} />
              </div>
            </div>
            <button onClick={prevStep} className="btn btn-secondary me-2">Back</button>
            <button onClick={nextStep} className="btn btn-primary">Continue to Shipping Method</button>
          </div>
        );
        case 3:
          return (
            <div>
            
            {/* ********************************************************** Shipping Method ****************************************************************/}
            <h2>Shipping Method</h2>
            <div className="form-check">
              <input type="radio" className="form-check-input" id="standardShipping" name="shippingMethod" value="standard" checked={shippingMethod === 'standard'} onChange={(e) => setShippingMethod(e.target.value)} />
              <label className="form-check-label" htmlFor="standardShipping">Standard Shipping - ₹5.00</label>
            </div>
            {/* Add more shipping options */}
            <button onClick={prevStep} className="btn btn-secondary me-2">Back</button>
            <button onClick={nextStep} className="btn btn-primary">Continue to Payment</button>
          </div>
        );
        case 4:
          return (
            <div>
              {/* ********************************************************** Payment ****************************************************************/}
            <h2>Payment</h2>
            <div className="mb-3">
              <label htmlFor="cardNumber" className="form-label">Card Number</label>
              <input type="text" className="form-control" id="cardNumber" name="cardNumber" value={payment.cardNumber} onChange={handlePaymentChange} required />
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="expiry" className="form-label">Expiry Date (MM/YY)</label>
                <input type="text" className="form-control" id="expiry" name="expiry" value={payment.expiry} onChange={handlePaymentChange} placeholder="MM/YY" required />
              </div>
              <div className="col-md-6">
                <label htmlFor="cvv" className="form-label">CVV</label>
                <input type="text" className="form-control" id="cvv" name="cvv" value={payment.cvv} onChange={handlePaymentChange} required />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="nameOnCard" className="form-label">Name on Card</label>
              <input type="text" className="form-control" id="nameOnCard" name="nameOnCard" value={payment.nameOnCard} onChange={handlePaymentChange} required />
            </div>
            <button onClick={prevStep} className="btn btn-secondary me-2">Back</button>
            <button type="submit" className="btn btn-primary">Pay now - ₹{totalAmount.toFixed(2)}</button>
          </div>
        );
      default:
        return <div>Checkout Complete!</div>; // Or handle other states
    }
  };

  return (
    <div className="container"> {/* Use Bootstrap container for centering */}
      <header className="py-3 bg-light"> {/* Basic Bootstrap header */}
        {/* Replace with the actual logo */}
        <h1 className="text-center">MR SINGH MART</h1>
      </header>
      <div className="row mt-4">
        <div className="col-md-8"> {/* Left side for checkout steps */}
          <div className="d-flex justify-content-between mb-3">
            <div className={`step-indicator ${step === 1 ? 'active' : (step > 1 ? 'completed' : '')}`}>
              Contact {step > 1 && <Check className="ms-1" />}
            </div>
            <div className={`step-indicator ${step === 2 ? 'active' : (step > 2 ? 'completed' : '')}`}>
              Shipping {step > 2 && <Check className="ms-1" />}
            </div>
            <div className={`step-indicator ${step === 3 ? 'active' : (step > 3 ? 'completed' : '')}`}>
              Shipping Method {step > 3 && <Check className="ms-1" />}
            </div>
            <div className={`step-indicator ${step === 4 ? 'active' : ''}`}>
              Payment
            </div>
          </div>
            <hr className="w-100" />
          <div className="checkout-form">
            {renderCheckoutStep()}
          </div>
        </div>
        <div className="col-md-4"> {/* Right side for order summary */}
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Order Summary</h2>
              <ul className="list-unstyled">
                {cartItems.map(item => (
                  <li key={item.name} className="d-flex justify-content-between align-items-center mb-2">
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
              {/* Discount code input */}
              <div className="mb-3">
                <label htmlFor="discountCode" className="form-label">Discount Code</label>
                <div className="input-group">
                  <input type="text" className="form-control" id="discountCode" value={discountCode} onChange={handleDiscountCodeChange} />
                  <button className="btn btn-outline-secondary" type="button">Apply</button>
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
              <div className="security-badges mt-3">
                {/* Replace with actual security badges */}
                <img src="https://placehold.co/80x80/cccccc/ffffff?text=Secure" alt="Secure" className="me-2" />
                <img src="https://placehold.co/80x80/cccccc/ffffff?text=Trusted" alt="Trusted" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="py-3 mt-4 bg-light text-center">
        <a href="/privacy" className="me-3 text-decoration-none">Privacy Policy</a>
        <a href="/terms" className="me-3 text-decoration-none">Terms of Service</a>
        <a href="/shipping" className="me-3 text-decoration-none">Shipping Policy</a>
        <a href="/refund" className="text-decoration-none">Refund Policy</a>
      </footer>
    </div>
  );
}

export default MiniAmiPressCheckout;
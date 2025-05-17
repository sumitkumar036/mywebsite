import React, { useState } from 'react';
import Contact from './Contact';
import Shipping from './Shipping';
import Method from './Method';
import Payment from './Payment';
import OrderSummary from './OrderSummary';

const steps = ['Contact', 'Shipping', 'Method', 'Payment'];

export default function Checkout({ cartItems }) {
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
  const [payment, setPayment] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    nameOnCard: ''
  });

  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  const shippingCost = 50;

  const formatPrice = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(value);

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const totalAmount = discountApplied
    ? subtotal + shippingCost - 50
    : subtotal + shippingCost;

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleContactChange = (e) => setContact({ ...contact, [e.target.name]: e.target.value });
  const handleShippingAddressChange = (e) => setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  const handleShippingMethodChange = (e) => setShippingMethod(e.target.value);
  const handlePaymentChange = (e) => setPayment({ ...payment, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Order submitted!');
    // You can send data to backend here
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

  // If cart is empty, show message
  if (cartItems.length === 0) {
    return (
      <div className="container text-center py-5">
        <h2>Your cart is empty</h2>
        <a href="#/home" className="btn btn-primary mt-3">Back to Shopping</a>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center">MR SINGH MART - Checkout</h1>

      {/* Step Indicator */}
      <div className="mb-4 d-flex justify-content-between">
      {
        steps.map((label, index) => {
        const stepNum = index + 1;
        const active = stepNum === step;
        const completed = stepNum < step;

        let circleBgClass;
        if (completed) {
          circleBgClass = 'bg-success';
        } else if (active) {
          circleBgClass = 'bg-primary';
        } else {
          circleBgClass = 'bg-light text-muted';
        }

        let circleTextColor;
        if (completed || active) {
          circleTextColor = 'white';
        } else {
          circleTextColor = '#6c757d';
        }

        let labelTextClass;
        if (active) {
          labelTextClass = 'text-primary';
        } else if (completed) {
          labelTextClass = 'text-success';
        } else {
          labelTextClass = 'text-muted';
        }

    return (
      <div key={label} className="text-center flex-fill">
        <div
          className={`rounded-circle mx-auto mb-1 ${circleBgClass}`}
          style={{
            width: '30px',
            height: '30px',
            lineHeight: '30px',
            color: circleTextColor,
            fontWeight: 'bold',
          }}
        >
          {stepNum}
        </div>

        <small className={labelTextClass}>{label}</small>
      </div>
    );
   })}
  </div>

      {/* Order Summary */}
      <div className="row">
        <div className="col-md-8">{renderCheckoutStep()}</div>

       <div className="col-md-4">
          <OrderSummary
            cartItems={cartItems}
            shippingCost={shippingCost}
            discountCode={discountCode}
            onDiscountCodeChange={handleDiscountCodeChange}
            onApplyDiscount={applyDiscount}
            totalAmount={totalAmount}
          />
        </div>
     </div>

    </div>
  );
}

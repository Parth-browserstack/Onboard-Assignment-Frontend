import { useSelector } from 'react-redux';
import { useState } from 'react';

const CheckoutFormPage = () => {
  const cart = useSelector((state) => state.cart);

  // Corrected total calculation accounting for item quantities
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // State for user details
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  const handleInputChange = (e, setFunction) => {
    setFunction((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the payment and order here
    console.log('Shipping Info:', shippingInfo);
    console.log('Payment Info:', paymentInfo);
    alert('Order placed successfully!');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      
      {/* Two Column Layout */}
      <div className="flex flex-wrap lg:flex-nowrap">
        
        {/* Left Section: Shipping Information */}
        <div className="w-full lg:w-2/3 lg:pr-6">
          <form onSubmit={handleSubmit}>
            {/* Shipping Information */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
              <input
                type="text"
                name="name"
                value={shippingInfo.name}
                onChange={(e) => handleInputChange(e, setShippingInfo)}
                placeholder="Full Name"
                className="border p-2 w-full mb-4"
                required
              />
              <input
                type="text"
                name="address"
                value={shippingInfo.address}
                onChange={(e) => handleInputChange(e, setShippingInfo)}
                placeholder="Address"
                className="border p-2 w-full mb-4"
                required
              />
              <input
                type="text"
                name="city"
                value={shippingInfo.city}
                onChange={(e) => handleInputChange(e, setShippingInfo)}
                placeholder="City"
                className="border p-2 w-full mb-4"
                required
              />
              <div className="flex space-x-4">
                <input
                  type="text"
                  name="state"
                  value={shippingInfo.state}
                  onChange={(e) => handleInputChange(e, setShippingInfo)}
                  placeholder="State"
                  className="border p-2 w-full"
                  required
                />
                <input
                  type="text"
                  name="zip"
                  value={shippingInfo.zip}
                  onChange={(e) => handleInputChange(e, setShippingInfo)}
                  placeholder="ZIP Code"
                  className="border p-2 w-full"
                  required
                />
              </div>
            </div>
          </form>
        </div>

        {/* Right Section: Order Summary and Payment Information */}
        <div className="w-full lg:w-1/3">
          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <ul className="mb-4">
              {cart.map((item) => (
                <li key={item.id} className="mb-2 flex justify-between">
                  <span>{item.title} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <h3 className="text-lg font-semibold">Total: ${total.toFixed(2)}</h3>
          </div>

          {/* Payment Information */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Payment Information</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="cardNumber"
                value={paymentInfo.cardNumber}
                onChange={(e) => handleInputChange(e, setPaymentInfo)}
                placeholder="Card Number"
                className="border p-2 w-full mb-4"
                required
              />
              <div className="flex space-x-4 mb-4">
                <input
                  type="text"
                  name="expirationDate"
                  value={paymentInfo.expirationDate}
                  onChange={(e) => handleInputChange(e, setPaymentInfo)}
                  placeholder="MM/YY"
                  className="border p-2 w-full"
                  required
                />
                <input
                  type="text"
                  name="cvv"
                  value={paymentInfo.cvv}
                  onChange={(e) => handleInputChange(e, setPaymentInfo)}
                  placeholder="CVV"
                  className="border p-2 w-full"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded w-full"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutFormPage;

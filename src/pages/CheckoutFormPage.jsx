import { useSelector } from 'react-redux';
import { useState } from 'react';

const CheckoutFormPage = () => {
  const cart = useSelector((state) => state.cart);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  // State for user details (could also use form libraries like react-hook-form)
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
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipping Information */}
        <div>
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

        {/* Payment Information */}
        <div>
          <h2 className="text-xl font-bold mb-4">Payment Information</h2>
          <input
            type="text"
            name="cardNumber"
            value={paymentInfo.cardNumber}
            onChange={(e) => handleInputChange(e, setPaymentInfo)}
            placeholder="Card Number"
            className="border p-2 w-full mb-4"
            required
          />
          <input
            type="text"
            name="expirationDate"
            value={paymentInfo.expirationDate}
            onChange={(e) => handleInputChange(e, setPaymentInfo)}
            placeholder="Expiration Date (MM/YY)"
            className="border p-2 w-full mb-4"
            required
          />
          <input
            type="text"
            name="cvv"
            value={paymentInfo.cvv}
            onChange={(e) => handleInputChange(e, setPaymentInfo)}
            placeholder="CVV"
            className="border p-2 w-full mb-4"
            required
          />
        </div>

        {/* Order Summary */}
        <div className="col-span-full">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <ul className="mb-4">
            {cart.map((item) => (
              <li key={item.id} className="mb-2 flex justify-between">
                <span>{item.title}</span>
                <span>${item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold">Total: ${total.toFixed(2)}</h3>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutFormPage;

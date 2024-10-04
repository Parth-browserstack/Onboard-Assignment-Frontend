import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../features/cartSlice';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CheckoutPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate

  // State for coupon code
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');

  const handleRemove = (item) => {
    dispatch(removeFromCart({ id: item.id }));
  };

  const handleIncrement = (item) => {
    dispatch(incrementQuantity({ id: item.id }));
  };

  const handleDecrement = (item) => {
    dispatch(decrementQuantity({ id: item.id }));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleApplyCoupon = () => {
    if (couponCode === 'DISCOUNT10') {
      setDiscount(0.1);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code.');
      setDiscount(0);
    }
  };

  const handleProceed = () => {
    if (cart.length === 0) {
      alert('Your cart is empty. Please add items to your cart before proceeding to checkout.');
      return; // Stop further execution
    }
    navigate('/checkoutformpage'); // Navigate to checkout form page
  };

  const discountedTotal = total - total * discount;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

      <div className="flex flex-wrap lg:flex-nowrap">
        {/* Left Section - Cart Items */}
        <div className="w-full lg:w-2/3 mb-6 lg:mb-0 lg:mr-6">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center mb-4 border p-4 rounded shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-24 w-24 object-cover rounded mr-4"
                  />
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-gray-600">
                      ${item.price.toFixed(2)} x {item.quantity} = $
                      {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center">
                    {/* Decrease Quantity Button */}
                    <button
                      onClick={() => handleDecrement(item)}
                      className="bg-gray-300 text-black py-1 px-2 rounded hover:bg-gray-400 transition-colors duration-200 mr-2"
                    >
                      -
                    </button>

                    <p>{item.quantity}</p>

                    {/* Increase Quantity Button */}
                    <button
                      onClick={() => handleIncrement(item)}
                      className="bg-gray-300 text-black py-1 px-2 rounded hover:bg-gray-400 transition-colors duration-200 ml-2"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemove(item)}
                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition-colors duration-200 ml-4"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Section - Order Summary */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <p className="mb-2">
            Subtotal: <span className="font-semibold">${total.toFixed(2)}</span>
          </p>

          {/* Coupon Code Section */}
          <div className="mb-4">
            <label htmlFor="couponCode" className="block text-lg font-semibold mb-2">
              Coupon Code:
            </label>
            <input
              type="text"
              id="couponCode"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="Enter coupon code"
            />
            <button
              onClick={handleApplyCoupon}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600 transition-colors duration-200"
            >
              Apply Coupon
            </button>
            {couponError && <p className="text-red-500">{couponError}</p>}
          </div>

          <p className="text-lg font-semibold">
            Total: <span className="font-bold">${discountedTotal.toFixed(2)}</span>
          </p>
          <button onClick={handleProceed} className="bg-green-500 text-white py-2 px-4 rounded mt-4 w-full">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

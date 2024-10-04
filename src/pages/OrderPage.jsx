import React from 'react';
import { useSelector } from 'react-redux';

const OrderPage = () => {
  const orders = useSelector((state) => state.orders);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index} className="mb-4 border p-4 rounded">
              <h2 className="text-xl font-bold">Order #{index + 1}</h2>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>{item.title} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <h3 className="text-lg font-semibold">
                Total: ${order.total.toFixed(2)}
              </h3>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderPage;

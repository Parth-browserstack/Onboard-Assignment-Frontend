// // OrdersPage.js
// import React from 'react';
// import { useSelector } from 'react-redux';

// const OrderPage = () => {
//   const orders = useSelector((state) => state.orders);

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-4">Your Orders</h1>
//       {orders.length === 0 ? (
//         <p>No orders placed yet.</p>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order, index) => (
//             <div key={index} className="bg-white p-4 rounded-lg shadow-md">
//               <h2 className="font-bold">Order #{index + 1}</h2>
//               <p className="text-gray-600">Date: {order.date}</p>
//               <h3 className="text-lg font-semibold">Shipping Info:</h3>
//               <p>{order.shippingInfo.name}</p>
//               <p>{order.shippingInfo.address}</p>
//               <p>{order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zip}</p>
              
//               <h3 className="text-lg font-semibold mt-2">Items:</h3>
//               <ul>
//                 {order.items.map((item) => (
//                   <li key={item.id}>
//                     {item.title} x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
//                   </li>
//                 ))}
//               </ul>
//               <p className="font-semibold">Total: ${order.total.toFixed(2)}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderPage;


// OrdersPage.js
import React from 'react';
import { useSelector } from 'react-redux';

const OrdersPage = () => {
  const orders = useSelector((state) => state.orders);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">Order #</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Shipping Info</th>
              <th className="py-2 px-4 border-b">Total</th>
              <th className="py-2 px-4 border-b">Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{order.date}</td>
                <td className="py-2 px-4">
                  {order.shippingInfo.name}<br />
                  {order.shippingInfo.address}<br />
                  {order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zip}
                </td>
                <td className="py-2 px-4 font-semibold">${order.total.toFixed(2)}</td>
                <td className="py-2 px-4">
                  <ul>
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.title} x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdersPage;

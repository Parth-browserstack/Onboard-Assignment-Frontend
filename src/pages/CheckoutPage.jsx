import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../features/cartSlice';

const CheckoutPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (item) => {
    dispatch(removeFromCart({ id: item.id })); // Pass only the id for removal
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="mb-4 border p-4 rounded">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p>${item.price}</p>
              <button
                onClick={() => handleRemove(item)}
                className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition-colors duration-200"
              >
                Remove
              </button>
            </div>
          ))}
          <h3 className="text-xl font-bold mt-6">Total: ${total.toFixed(2)}</h3>
          <button className="bg-green-500 text-white py-2 px-4 rounded mt-4">Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;

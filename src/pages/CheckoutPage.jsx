import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../features/cartSlice';

const CheckoutPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Checkout</h1>
      <div>
        {cart.map((item) => (
          <div key={item.id}>
            <p>{item.name} - {item.price}</p>
            <button onClick={() => dispatch(removeFromCart(item))}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutPage;
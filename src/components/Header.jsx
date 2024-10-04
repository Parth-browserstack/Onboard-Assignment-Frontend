import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Header = () => {
  const cart = useSelector((state) => state.cart);

  // Calculate the total number of items in the cart by summing up quantities
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">My eCommerce Store</h1>
      </div>

      <div>
        <Link to="/checkout" className="mr-4">
          🛒 Cart ({totalItems}) {/* Total quantity displayed here */}
        </Link>
      </div>
    </header>
  );
};

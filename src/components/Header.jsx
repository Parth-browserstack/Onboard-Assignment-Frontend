import { Link } from "react-router-dom";
import { useSelector} from "react-redux";

export const Header = () => {
    const cart = useSelector((state) => state.cart);
  
    return (
      <header className="bg-gray-800 p-4 text-white flex justify-between">
        <h1 className="text-2xl font-bold">My eCommerce Store</h1>
        <nav>
          <Link to="/checkout" className="mr-4">
            🛒 Cart ({cart.length})
          </Link>
        </nav>
      </header>
    );
  };
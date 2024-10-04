import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Header = () => {
  const cart = useSelector((state) => state.cart);

  
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="flex items-center">
       <Link to='/'><h1 className="text-2xl font-bold">My eCommerce Store</h1> </Link>
      </div>

      <div>
        <Link to="/checkout" className="mr-4">
          🛒 Cart ({totalItems}) 
        </Link>
      </div>
    </header>
  );
};

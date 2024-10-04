import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/userSlice"; // Import logout action
import { useState } from "react"; // Import useState for mobile menu

export const Header = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.user); // Get user info from state

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  // State for mobile menu
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gray-800 p-4 text-white flex justify-between items-center relative">
      <div className="flex items-center">
        <Link to='/'>
          <h1 className="text-2xl font-bold">My eCommerce Store</h1>
        </Link>
      </div>

      <div className="hidden md:flex md:items-center">
        <Link to="/checkout" className="mr-4">
          🛒 Cart ({totalItems})
        </Link>

        {user ? (
          <>
            <Link to="/orders" className="mr-4">
              Orders
            </Link>
            <span className="mr-4">Hello, {user.username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-1 px-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="mr-4">
            Login
          </Link>
        )}
      </div>

      {/* Hamburger menu for mobile devices */}
      <div className="md:hidden flex items-center">
        <button
          className="focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 right-0 w-48 bg-gray-800 text-white shadow-lg rounded-md p-4 z-50">
          <Link to="/checkout" className="block mb-2">🛒 Cart ({totalItems})</Link>
          {user ? (
            <>
              <Link to="/orders" className="block mb-2">Orders</Link>
              <span className="block mb-2">Hello, {user.username}</span>
              <button onClick={handleLogout} className="w-full bg-red-500 text-white py-1 px-2 rounded">Logout</button>
            </>
          ) : (
            <Link to="/login" className="block mb-2">Login</Link>
          )}
        </div>
      )}
    </header>
  );
};

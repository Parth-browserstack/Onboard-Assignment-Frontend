import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/productsSlice';
import { addToCart } from '../features/cartSlice';
import { Header } from '../components/Header';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  // State for filtering
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Define categories based on your data structure
  const categories = ['All', 'Electronics', 'Clothing', 'Home', 'Books'];

  // Handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Handle price changes
  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  // Filter products based on selected category and price range
  const filteredProducts = products.filter(product => {
    const isCategoryMatch = selectedCategory === 'All' || selectedCategory === ''
      ? true
      : product.category === selectedCategory;

    const isMinPriceMatch = minPrice === '' || product.price >= parseFloat(minPrice);
    const isMaxPriceMatch = maxPrice === '' || product.price <= parseFloat(maxPrice);

    return isCategoryMatch && isMinPriceMatch && isMaxPriceMatch;
  });

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="container mx-auto p-6 max-w-screen-xl">
      <Header />
      <h1 className="text-4xl font-bold text-center mb-8">Products</h1>

      <div className="flex flex-wrap justify-between items-center mb-6">
       
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <label htmlFor="category" className="block text-lg font-semibold mb-2">Category:</label>
          <select
            id="category"
            value={selectedCategory} 
            onChange={handleCategoryChange}
            className="border p-2 rounded w-full md:w-64"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Price Filter */}
        <div className="w-full md:w-auto flex space-x-4">
          <div>
            <label htmlFor="minPrice" className="block text-lg font-semibold mb-2">Min Price:</label>
            <input
              type="number"
              id="minPrice"
              value={minPrice}
              onChange={handleMinPriceChange}
              className="border p-2 rounded w-full md:w-32"
              placeholder="0"
            />
          </div>
          <div>
            <label htmlFor="maxPrice" className="block text-lg font-semibold mb-2">Max Price:</label>
            <input
              type="number"
              id="maxPrice"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              className="border p-2 rounded w-full md:w-32"
              placeholder="1000"
            />
          </div>
        </div>
      </div>


      {status === 'loading' && <p className="text-center">Loading...</p>}
      {status === 'failed' && <p className="text-red-500 text-center">Error fetching products: {error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {status === 'succeeded' && Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
              <img
                src={product.image}
                alt={product.title}
                className="h-48 w-full object-cover rounded-md mb-4"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/150'; // placeholder image
                }}
              />
              <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-600 mb-1">${product.price}</p>
              <p className="text-gray-500 mb-3">{product.description}</p>
              <p className="text-yellow-500 mb-3">Rating: {product.rating}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
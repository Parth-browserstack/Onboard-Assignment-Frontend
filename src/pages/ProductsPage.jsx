import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/productsSlice';
import { addToCart } from '../features/cartSlice';
import {Header} from '../components/Header'
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
  const categories = ['All', 'Electronics', 'Clothing', 'Home', 'Books']; // Extend based on your product categories

  // Function to handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Function to handle price change
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

  const handleAddToCart = (product)=>{
    dispatch(addToCart(product));
  };


  

  return (
    <div className="container max-w-full mx-auto p-6">
      <Header />
      <h1 className="text-3xl font-bold text-center mb-8">Products</h1>

      {/* Filter Dropdown */}
      <div className="mb-4">
        <label htmlFor="category" className="mr-2 font-semibold">Filter by Category:</label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange} className="border p-2 rounded">
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="mb-4">
        <label htmlFor="minPrice" className="mr-2 font-semibold">Min Price:</label>
        <input 
          type="number" 
          id="minPrice" 
          value={minPrice} 
          onChange={handleMinPriceChange} 
          className="border p-2 rounded mr-4"
          placeholder="0"
        />
        <label htmlFor="maxPrice" className="mr-2 font-semibold">Max Price:</label>
        <input 
          type="number" 
          id="maxPrice" 
          value={maxPrice} 
          onChange={handleMaxPriceChange} 
          className="border p-2 rounded" 
          placeholder="1000"
        />
      </div>

      {status === 'loading' && <p className="text-center">Loading...</p>}
      {status === 'failed' && <p className="text-red-500 text-center">Error fetching products: {error}</p>}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {status === 'succeeded' && Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="border border-gray-300 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
              <img 
                src={product.image} 
                alt={product.title} 
                className="h-48 w-full object-cover rounded-md mb-4" 
                onError={(e) => { 
                  e.target.onerror = null; // prevents looping 
                  e.target.src = 'https://via.placeholder.com/150'; // placeholder image
                }} 
              />
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-gray-600">${product.price}</p>
              <p className="text-gray-500 mb-2">{product.description}</p>
              <p className="text-yellow-500">Rating: {product.rating}</p>
              <button onClick={()=>handleAddToCart(product)} className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200">
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/productsSlice';
import { addToCart } from '../features/cartSlice';
import { Header } from '../components/Header';
import { Link } from 'react-router-dom'; // **Import Link** from react-router-dom

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

  const categories = ['All', 'smartphones', 'Clothing', 'Home', 'Books'];

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const filteredProducts = products.filter(product => {
    // Make both category and selectedCategory lowercase to avoid case sensitivity issues
    const category = product.category?.toLowerCase(); 
    const selectedCategoryLower = selectedCategory?.toLowerCase();
  
    const isCategoryMatch = selectedCategoryLower === 'all' || selectedCategoryLower === ''
      ? true
      : category === selectedCategoryLower;
  
    // Ensure price is a number and filter based on minPrice and maxPrice
    const productPrice = parseFloat(product.price);
    const isMinPriceMatch = minPrice === '' || productPrice >= parseFloat(minPrice);
    const isMaxPriceMatch = maxPrice === '' || productPrice <= parseFloat(maxPrice);
  
    return isCategoryMatch && isMinPriceMatch && isMaxPriceMatch;
  });
  

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="container mx-auto p-6 max-w-screen-xl">
      <Header />
      <h1 className="text-4xl font-bold text-center mb-8">Products</h1>

      {/* Main layout with sidebar for filters */}
      <div className="flex flex-wrap lg:flex-nowrap">
        {/* Sidebar for filters */}
        <aside className="w-full lg:w-1/4 mb-6 lg:mb-0 lg:mr-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Filters</h2>
            
            {/* Category Filter */}
            <div className="mb-4">
              <label htmlFor="category" className="block text-lg font-semibold mb-2">Category:</label>
              <select
                id="category"
                value={selectedCategory} 
                onChange={handleCategoryChange}
                className="border p-2 rounded w-full"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="flex space-x-4">
              <div>
                <label htmlFor="minPrice" className="block text-lg font-semibold mb-2">Min Price:</label>
                <input
                  type="number"
                  id="minPrice"
                  value={minPrice}
                  onChange={handleMinPriceChange}
                  className="border p-2 rounded w-full"
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
                  className="border p-2 rounded w-full"
                  placeholder="1000"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Products grid */}
        <section className="w-full lg:w-3/4">
          {status === 'loading' && <p className="text-center">Loading...</p>}
          {status === 'failed' && <p className="text-red-500 text-center">Error fetching products: {error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {status === 'succeeded' && Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                  
                  <Link to={`/product/${product.id}`}>
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
                  </Link>
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
        </section>
      </div>
    </div>
  );
};

export default ProductsPage;

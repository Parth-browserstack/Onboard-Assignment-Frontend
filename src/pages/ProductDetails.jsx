import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cartSlice';

const ProductDetails = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  // Find the product by ID
  const product = products.find((product) => product.id === parseInt(id));

  if (!product) {
    return <div className="container mx-auto p-6 max-w-screen-xl">Product not found!</div>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    alert(`${product.title} added to cart!`);
  };

  return (
    <div className="container mx-auto p-6 max-w-screen-xl">
      <div className="flex flex-col lg:flex-row items-center lg:items-start">
        <img src={product.image} alt={product.title} className="h-64 w-64 object-cover mb-4 lg:mb-0 lg:mr-8" />
        <div className="lg:w-2/3">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">${product.price}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <p className="text-yellow-500 mb-3">Rating: {product.rating}</p>

          <button
            onClick={handleAddToCart}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/productsSlice';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log(products)
  return (
    <div>
      <h1>Products</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error fetching products: {error}</p>}
      <div className="product-list">
        {status === 'succeeded' && Array.isArray(products) && products.length > 0 ? (
          products.map((product, index) => (
            <div key={product.id || index}>
              <h2>{product.title}</h2>
              <p>${product.price}</p>
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

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/userSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);
  
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatching login action with user credentials
    dispatch(loginUser(credentials));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">Username:</label>
            <input 
              type="text" 
              name="username" 
              value={credentials.username} 
              onChange={handleChange} 
              required 
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password:</label>
            <input 
              type="password" 
              name="password" 
              value={credentials.password} 
              onChange={handleChange} 
              required 
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
        {status === 'loading' && <p className="mt-4 text-blue-500">Loading...</p>}
        {status === 'failed' && <p className="mt-4 text-red-500">Error: {error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;

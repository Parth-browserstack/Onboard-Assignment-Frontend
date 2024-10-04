import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './store';
import ProductsPage from './pages/ProductsPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderPage from './pages/OrderPage';
import LoginPage from './pages/LoginPage';
import ProductDetails from './pages/ProductDetails';
import CheckoutFormPage from './pages/CheckoutFormPage';
import Footer from './components/Footer';
import { Header } from './components/Header';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrderPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkoutformpage" element={<CheckoutFormPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
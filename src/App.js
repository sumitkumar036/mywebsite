import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './assets/modules/login/Login';
import RegisterForm from './assets/modules/register/RegisterForm';
import Home from './assets/modules/home/Home';
import ProductDescription from './assets/modules/product/form/ProductDescription';
import Layout from './assets/common/Layout';
import Checkout from './assets/modules/checkout/Checkout';
import CartContainer from './assets/modules/cart/CartContainer';

function App() {
  return (
    <div className="App-bg min-vh-100 d-flex flex-column">
      <HashRouter>
        <Routes>
          {/* Common layout for all pages */}
          <Route path="/" element={<Layout />}>
            {/* Nested routes inside Layout */}
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="registration" element={<RegisterForm />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="products/:id" element={<ProductDescription />} />
            <Route path="cart" element={<CartContainer />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

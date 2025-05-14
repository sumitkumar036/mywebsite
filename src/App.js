import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './assets/modules/navbar/navbar';
import LoginForm from './assets/modules/login/Login';
import RegisterForm from './assets/modules/register/RegisterForm';
import CheckoutForm from './assets/modules/checkout/CheckoutForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './assets/modules/home/Home';

function App() {
  return (
    <div className="App-bg min-vh-100 d-flex flex-column">
      <Navbar />
      <Home />
        <HashRouter>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/registration" element={<RegisterForm />} />
            <Route path="/checkout" element={<CheckoutForm />} />
          </Routes>
        </HashRouter>
    
    </div>
  );
}

export default App;

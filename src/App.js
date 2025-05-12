import './App.css';
import { Fragment } from "react";
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './assets/modules/navbar/navbar';
import LoginForm from './assets/modules/login/Login';
import RegisterForm from './assets/modules/register/RegisterForm';

// Create a simple Home component
function Home() {
  return (
    <div>
      <h1>Welcome to the Website</h1>
     <marquee>
        <p>This is the home page.</p>
    </marquee>
    </div>
  );
}

function App() {
  return (
    <Fragment>
      <Navbar />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/registration" element={<RegisterForm />} />
        </Routes>
      </HashRouter>
    </Fragment>
  );
}

export default App;

import './App.css';
import {Fragment} from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
 import Navbar from './assets/modules/navbar/navbar';
 import LoginForm from './assets/modules/login/Login';
 import RegisterForm from './assets/modules/register/RegisterForm';

function App() {
  return (
    <Fragment>
      <Navbar />
      <BrowserRouter>
      <Routes>
         <Route path='/login' element={ <LoginForm />} />
         <Route path='/registration' element={ <RegisterForm />} />
      </Routes>
      </BrowserRouter>

      </Fragment>
      
  );
}

export default App;

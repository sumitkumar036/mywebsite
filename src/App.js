import './App.css';
import {Fragment} from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
 import Navbar from './assets/modules/navbar/navbar';
 import LoginActivity from './assets/modules/login activity/LoginActivity';

function App() {
  return (
    <Fragment>
      <Navbar />


      <BrowserRouter>
      <Routes>
         <Route path='/login-activity' element={ <LoginActivity />} />
      </Routes>
      </BrowserRouter>

      </Fragment>
      
  );
}

export default App;

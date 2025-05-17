import { Outlet } from "react-router-dom";
import NavBar from "../modules/navbar/navbar";
import Header from "../modules/home/Header";
import Footer from "../modules/home/Footer";

const Layout = ({ cartItems, addToCart, removeFromCart, deleteFromCart }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar cartItems={cartItems}/>
      <Header />
      <main className="container py-4">
        <Outlet context={{ cartItems, addToCart, removeFromCart, deleteFromCart }} />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

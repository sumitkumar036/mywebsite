import { Outlet } from "react-router-dom";
import NavBar from "../modules/navbar/navbar";
import Header from "../modules/home/Header";
import Footer from "../modules/home/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <Header />
      <main className="flex-grow p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

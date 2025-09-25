import { Outlet } from "react-router";
import Footer from '../Components/Shared/Footer';
import Navbar from '../Components/Shared/Navbar';

const Root = () => {
  return (
    <div className="font-poppins">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;

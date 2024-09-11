import { Link, NavLink } from "react-router-dom";
import BtnWithOutline from "../CustomHooks/BtnWithOutline";
import UnderlineBtn from "../CustomHooks/UnderlineBtn";

const Header = () => {
  const navLinks = (
    <>
      <NavLink to="/">
        <li className="p-2 hover:text-white">Home</li>
      </NavLink>
      <NavLink to="/spots">
        <li className="p-2 hover:text-white">All Tourists Spot</li>
      </NavLink>
      <NavLink to="/bookings">
        <li className="p-2 hover:text-white">My Bookings</li>
      </NavLink>
    </>
  );

  return (
    <div className="navbar glass sticky top-0 left-0">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content glass rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="text-xl">
          <UnderlineBtn>Travel Media</UnderlineBtn>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        <Link to="" className="">
          <BtnWithOutline>Register</BtnWithOutline>
        </Link>
      </div>
    </div>
  );
};

export default Header;

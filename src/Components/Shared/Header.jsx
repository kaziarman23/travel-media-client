import { Link, NavLink } from "react-router-dom";
import UseUnderlineBtn from "../CustomHooks/UseUnderlineBtn";
import UseBorderBtn from "../CustomHooks/UseBorderBtn";
import UseBorderYBtn from "../CustomHooks/UseBorderYBtn";

const Header = () => {
  const navLinks = (
    <>
      <NavLink to="/">
        <UseUnderlineBtn>
          <li className="p-2 hover:text-white">Home</li>
        </UseUnderlineBtn>
      </NavLink>
      <NavLink to="/PopularSpots">
        <UseUnderlineBtn>
          <li className="p-2 hover:text-white">Popular Spots</li>
        </UseUnderlineBtn>
      </NavLink>
      <NavLink to="/AllTouristSpots">
        <UseUnderlineBtn>
          <li className="p-2 hover:text-white">All Tourist Spots</li>
        </UseUnderlineBtn>
      </NavLink>
      <NavLink to="/bookings">
        <UseUnderlineBtn>
          <li className="p-2 hover:text-white">Bookings</li>
        </UseUnderlineBtn>
      </NavLink>
    </>
  );

  return (
    <div className="navbar glass z-50 fixed top-0 left-0">
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
          {/* <UseUnderlineBtn>Travel Media</UseUnderlineBtn> */}
          <UseBorderYBtn>Travel Media</UseBorderYBtn>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        <Link to="" className="">
          <UseBorderBtn>Register</UseBorderBtn>
        </Link>
      </div>
    </div>
  );
};

export default Header;

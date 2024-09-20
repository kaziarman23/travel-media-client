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

      {/* Parent */}
      <li className="group relative">
        <UseUnderlineBtn>
          <span className="hover:text-white cursor-pointer">My Lists</span>
        </UseUnderlineBtn>

        {/* It will appear when the parent is hovered */}
        <ul className="absolute left-0 mt-[28px] hidden w-60 group-hover:block z-50">
          <li className="hover:text-black hover:glass rounded-xl">
            <NavLink to="/addTouristSpots">
              <UseUnderlineBtn>
                <span>Add Tourist Spots</span>
              </UseUnderlineBtn>
            </NavLink>
          </li>
          <li className="hover:text-white hover:glass rounded-xl">
            <NavLink to="/myTouristSpots">
              <UseUnderlineBtn>
                <span>My Tourist Spots</span>
              </UseUnderlineBtn>
            </NavLink>
          </li>
        </ul>
      </li>
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
          <UseBorderYBtn>Travel Media</UseBorderYBtn>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        <Link to="/register" className="">
          <UseBorderBtn>Register</UseBorderBtn>
        </Link>
      </div>
    </div>
  );
};

export default Header;
{
  /*  
  <li className="group relative">
  <UseUnderlineBtn>
    <span className=" hover:text-white cursor-pointer">My Spots</span>
  </UseUnderlineBtn>

  
  <ul className="absolute top-7 left-0 mt-2 hidden w-80 group-hover:block space-y-3">
    <li className="p-2 hover:text-white glass">
      <NavLink to="/addTouristSpots">
        <UseUnderlineBtn>
          <span>Add Tourist spots</span>
        </UseUnderlineBtn>
      </NavLink>
    </li>
    <li className="p-2 hover:text-white glass">
      <NavLink to="/myTouristSpots">
        <UseUnderlineBtn>
          <span>My Tourist spots</span>
        </UseUnderlineBtn>
      </NavLink>
    </li>
  </ul>
</li>*/
}

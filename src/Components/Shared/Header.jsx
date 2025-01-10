import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import UseUnderlineBtn from "../CustomHooks/UseUnderlineBtn";
import UseBorderBtn from "../CustomHooks/UseBorderBtn";
import UseBorderYBtn from "../CustomHooks/UseBorderYBtn";
import UseLogoutBtn from "../CustomHooks/UseLogoutBtn";
import Swal from "sweetalert2";
import { BsAirplaneEnginesFill } from "react-icons/bs";

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser().then(() => {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Logout successfull",
      });
      navigate("/");
    });
  };

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
    <div className="navbar glass z-50 sticky top-0 left-0">
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
        <Link to="/" className="text-sm">
          <UseBorderYBtn size={"text-xs md:text-sm lg:text-base"}>
            <span className="flex items-center gap-1">
              <BsAirplaneEnginesFill />
              Travel Media
            </span>
          </UseBorderYBtn>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <UseLogoutBtn onClick={handleLogout} />
        ) : (
          <Link to="/register">
            <UseBorderBtn>Register</UseBorderBtn>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;

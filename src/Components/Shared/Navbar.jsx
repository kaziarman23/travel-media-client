import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsAirplaneEnginesFill } from "react-icons/bs";
import {
  FaUser,
  FaChevronDown,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaPlus,
  FaList,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { gsap } from "gsap";
import { logoutUser } from '../../Redux/features/userSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userSlice);

  // Refs for animations
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const navLinksRef = useRef([]);
  const mobileMenuRef = useRef(null);
  const userMenuRef = useRef(null);
  const dropdownRef = useRef(null);

  // States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMyListsOpen, setIsMyListsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);

      gsap.to(headerRef.current, {
        backdropFilter: isScrolled ? "blur(20px)" : "blur(10px)",
        backgroundColor: isScrolled
          ? "rgba(17, 24, 39, 0.95)"
          : "rgba(17, 24, 39, 0.8)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Entrance animations
  useEffect(() => {
    const tl = gsap.timeline();

    gsap.set(headerRef.current, { y: -100, opacity: 0 });
    gsap.set(logoRef.current, { scale: 0, rotation: -180 });
    gsap.set(navLinksRef.current, { y: -20, opacity: 0 });

    tl.to(headerRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "back.out(1.7)",
    })
      .to(
        logoRef.current,
        { scale: 1, rotation: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" },
        "-=0.4"
      )
      .to(
        navLinksRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.3"
      );

    return () => tl.kill();
  }, []);

  // Animations for dropdowns
  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.7)" }
      );
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isUserMenuOpen && userMenuRef.current) {
      gsap.fromTo(
        userMenuRef.current,
        { opacity: 0, y: -10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.7)" }
      );
    }
  }, [isUserMenuOpen]);

  useEffect(() => {
    if (isMyListsOpen && dropdownRef.current) {
      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: -10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.7)" }
      );
    }
  }, [isMyListsOpen]);

  // Logout handler
  const handleLogout = async () => {
    gsap.to(headerRef.current, {
      scale: 1.02,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.out",
      onComplete: async () => {
        try {
          await dispatch(logoutUser()).unwrap();
          toast.success("Logout successful");
          navigate("/");
          setIsUserMenuOpen(false);
        } catch (err) {
          toast.error("Logout failed: ", err);
        }
      },
    });
  };

  // Hover effect for nav links
  const handleNavHover = (element, isHover) => {
    gsap.to(element, {
      scale: isHover ? 1.05 : 1,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMyListsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigationItems = [
    { to: "/", label: "Home" },
    { to: "/PopularSpots", label: "Popular Spots" },
    { to: "/AllTouristSpots", label: "All Tourist Spots" },
    { to: "/bookings", label: "Bookings" },
  ];

  const myListsItems = [
    { to: "/addTouristSpots", label: "Add Tourist Spots", icon: FaPlus },
    { to: "/myTouristSpots", label: "My Tourist Spots", icon: FaList },
  ];

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50"
          : "bg-gray-900/80 backdrop-blur-lg"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 group"
              ref={logoRef}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <BsAirplaneEnginesFill className="text-white text-xl" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              <span className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                Travel Media
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <NavLink
                key={item.to}
                to={item.to}
                ref={(el) => (navLinksRef.current[index] = el)}
                className={({ isActive }) =>
                  `relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-blue-400"
                      : "text-gray-300 hover:text-white"
                  }`
                }
                onMouseEnter={(e) => handleNavHover(e.target, true)}
                onMouseLeave={(e) => handleNavHover(e.target, false)}
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400 rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}

            {/* My Lists Dropdown */}
            {user && (
              <div
                className="relative"
                onMouseEnter={() => setIsMyListsOpen(true)}
                onMouseLeave={() => setIsMyListsOpen(false)}
              >
                <button
                  ref={(el) => (navLinksRef.current[4] = el)}
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-all duration-300"
                  onMouseEnter={(e) => handleNavHover(e.target, true)}
                  onMouseLeave={(e) => handleNavHover(e.target, false)}
                >
                  <span>My Lists</span>
                  <FaChevronDown
                    className={`text-xs transition-transform duration-300 ${
                      isMyListsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isMyListsOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute top-full left-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl overflow-hidden"
                  >
                    {myListsItems.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200"
                      >
                        <item.icon className="text-blue-400" />
                        <span>{item.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <FaUser className="text-white text-sm" />
                    )}
                  </div>
                  <span className="text-white text-sm hidden sm:block">
                    {user.displayName || "User"}
                  </span>
                  <FaChevronDown
                    className={`text-xs text-gray-400 transition-transform duration-300 ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-700">
                      <p className="text-sm text-white font-medium">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200"
                    >
                      <FaSignOutAlt className="text-red-400" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/register"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Register
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="text-xl" />
              ) : (
                <FaBars className="text-xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="lg:hidden border-t border-gray-800 bg-gray-900/95 backdrop-blur-xl"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                      isActive
                        ? "text-blue-400 bg-gray-800"
                        : "text-gray-300 hover:text-white hover:bg-gray-800"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              {user && (
                <div className="border-t border-gray-800 pt-2 mt-2">
                  <p className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    My Lists
                  </p>
                  {myListsItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200"
                    >
                      <item.icon className="text-blue-400" />
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

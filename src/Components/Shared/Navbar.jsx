import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsAirplaneEnginesFill } from "react-icons/bs";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { gsap } from "gsap";
import { logoutUser } from "../../Redux/features/userSlice";
import { signOut } from "firebase/auth";
import auth from "../../Firebase/firebase.config";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userEmail } = useSelector((state) => state.userSlice);

  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const navLinksRef = useRef([]);
  const mobileMenuRef = useRef(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigationItems = [
    { to: "/", label: "Home" },
    { to: "/PopularSpots", label: "Popular Spots" },
    { to: "/AllTouristSpots", label: "All Tourist Spots" },
    { to: "/bookings", label: "Bookings" },
    { to: "/paymentHistory", label: "Payment History" },
    { to: "/addTouristSpots", label: "Add-Spots" },
    { to: "/myTouristSpots", label: "All-Spots" },
  ];

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

  // Entrance animation
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
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
        "-=0.3"
      );

    return () => tl.kill();
  }, []);

  const handleLogout = async () => {
    gsap.to(headerRef.current, {
      scale: 1.02,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.out",
      onComplete: async () => {
        await signOut(auth);
        await dispatch(logoutUser());
        toast.success("Logout successful");
        navigate("/");
      },
    });
  };

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
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <BsAirplaneEnginesFill className="text-white text-xl" />
              </div>
              <span className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                Travel Media
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <NavLink
                key={item.to}
                to={item.to}
                ref={(el) => (navLinksRef.current[index] = el)}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-blue-400"
                      : "text-gray-300 hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {userEmail ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
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
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

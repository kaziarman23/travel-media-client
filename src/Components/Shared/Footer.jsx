import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { BsAirplaneEnginesFill } from "react-icons/bs";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowUp,
  FaHeart
} from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  // Refs for animations
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const sectionsRef = useRef([]);
  const socialRef = useRef([]);
  const bottomRef = useRef(null);
  const backToTopRef = useRef(null);

  // Animation setup
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer entrance animation
      gsap.fromTo(footerRef.current, 
        { 
          opacity: 0,
          y: 100 
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            end: "bottom 100%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Logo animation
      gsap.fromTo(logoRef.current,
        {
          scale: 0,
          rotation: -180
        },
        {
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Stagger sections
      gsap.fromTo(sectionsRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Social icons animation
      gsap.fromTo(socialRef.current,
        {
          opacity: 0,
          scale: 0,
          rotation: 180
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Bottom section slide up
      gsap.fromTo(bottomRef.current,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Back to top button
      gsap.fromTo(backToTopRef.current,
        {
          opacity: 0,
          scale: 0
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 50%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, footerRef);

    return () => ctx.revert();
  }, []);

  // Hover animations for social icons
  const handleSocialHover = (element, isHover) => {
    gsap.to(element, {
      scale: isHover ? 1.2 : 1,
      rotation: isHover ? 10 : 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  // Hover animations for links
  const handleLinkHover = (element, isHover) => {
    gsap.to(element, {
      x: isHover ? 5 : 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  // Back to top functionality
  const scrollToTop = () => {
    gsap.to(window, {
      scrollTo: { y: 0 },
      duration: 1.5,
      ease: "power2.inOut"
    });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaFacebookF, href: "#", color: "hover:text-blue-500", label: "Facebook" },
    { icon: FaTwitter, href: "#", color: "hover:text-blue-400", label: "Twitter" },
    { icon: FaInstagram, href: "#", color: "hover:text-pink-500", label: "Instagram" },
    { icon: FaLinkedinIn, href: "#", color: "hover:text-blue-600", label: "LinkedIn" },
    { icon: FaYoutube, href: "#", color: "hover:text-red-500", label: "YouTube" }
  ];

  const quickLinks = [
    { label: "Home", to: "/" },
    { label: "Popular Spots", to: "/PopularSpots" },
    { label: "All Tourist Spots", to: "/AllTouristSpots" },
    { label: "Bookings", to: "/bookings" },
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" }
  ];

  const services = [
    { label: "Tour Planning", to: "/services/planning" },
    { label: "Hotel Booking", to: "/services/hotels" },
    { label: "Flight Booking", to: "/services/flights" },
    { label: "Car Rental", to: "/services/cars" },
    { label: "Travel Insurance", to: "/services/insurance" },
    { label: "24/7 Support", to: "/support" }
  ];

  return (
    <footer 
      ref={footerRef}
      className="relative bg-gray-900 border-t border-gray-800 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-4 h-full">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-r border-gray-700 h-full" />
          ))}
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-10 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div 
            ref={el => sectionsRef.current[0] = el}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div 
                ref={logoRef}
                className="relative"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <BsAirplaneEnginesFill className="text-white text-2xl" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
              </div>
              <span className="text-2xl font-bold text-white">
                Travel Media
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Your trusted travel companion since 2018. We help you discover amazing destinations and create unforgettable memories around the world.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-blue-400" />
                <span>123 Travel Street, Adventure City</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-blue-400" />
                <span>info@travelmedia.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaPhone className="text-blue-400" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div 
            ref={el => sectionsRef.current[1] = el}
            className="lg:col-span-1"
          >
            <h3 className="text-white font-semibold text-lg mb-4 relative">
              Quick Links
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-blue-500 rounded-full" />
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-white transition-all duration-300 text-sm flex items-center"
                    onMouseEnter={(e) => handleLinkHover(e.target, true)}
                    onMouseLeave={(e) => handleLinkHover(e.target, false)}
                  >
                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div 
            ref={el => sectionsRef.current[2] = el}
            className="lg:col-span-1"
          >
            <h3 className="text-white font-semibold text-lg mb-4 relative">
              Our Services
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-purple-500 rounded-full" />
            </h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to={service.to}
                    className="text-gray-400 hover:text-white transition-all duration-300 text-sm flex items-center"
                    onMouseEnter={(e) => handleLinkHover(e.target, true)}
                    onMouseLeave={(e) => handleLinkHover(e.target, false)}
                  >
                    <span className="w-1 h-1 bg-purple-400 rounded-full mr-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div 
            ref={el => sectionsRef.current[3] = el}
            className="lg:col-span-1"
          >
            <h3 className="text-white font-semibold text-lg mb-4 relative">
              Stay Connected
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-green-500 rounded-full" />
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Follow us on social media for the latest travel updates and inspiration.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-3 mb-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  ref={el => socialRef.current[index] = el}
                  href={social.href}
                  aria-label={social.label}
                  className={`w-10 h-10 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center text-gray-400 transition-all duration-300 ${social.color} hover:border-current`}
                  onMouseEnter={(e) => handleSocialHover(e.currentTarget, true)}
                  onMouseLeave={(e) => handleSocialHover(e.currentTarget, false)}
                >
                  <social.icon className="text-sm" />
                </a>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <h4 className="text-white font-medium text-sm">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors duration-300"
                />
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg transition-colors duration-300">
                  <FaEnvelope className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div 
          ref={bottomRef}
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="flex items-center space-x-4 text-gray-400 text-sm">
            <span>© {currentYear} Travel Media. All rights reserved.</span>
            <span className="hidden md:block">|</span>
            <div className="flex items-center space-x-1">
              <span>Made with</span>
              <FaHeart className="text-red-500 text-xs animate-pulse" />
              <span>for travelers</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link 
              to="/privacy" 
              className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
            >
              Terms of Service
            </Link>
            <Link 
              to="/cookies" 
              className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        ref={backToTopRef}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center z-20 hover:scale-110"
        aria-label="Back to top"
      >
        <FaArrowUp className="text-sm" />
      </button>
    </footer>
  );
};

export default Footer;
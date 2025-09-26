import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 flex flex-col justify-center items-center text-center px-4">
      {/* Animated 404 */}
      <h1 className="text-8xl md:text-9xl font-extrabold text-white animate-bounce">
        404
      </h1>

      <h2 className="text-3xl md:text-4xl text-gray-300 font-semibold mb-4">
        Oops! Page Not Found
      </h2>

      <p className="text-gray-400 max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        <FaArrowLeft />
        Go Back Home
      </Link>

      {/* Subtle floating dots animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default NotFoundPage;

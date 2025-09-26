import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaDollarSign,
  FaUser,
  FaEnvelope,
  FaGlobe,
  FaSun,
  FaPlane,
  FaCheck,
  FaTimes,
  FaArrowLeft,
  FaUsers,
  FaShieldAlt,
} from "react-icons/fa";
// import Loader from "../CustomHooks/Loader";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useAddBookingMutation } from "../../Redux/features/api/bookingsApi";

const Booking = () => {
  // redux state
  const { userName, userEmail } = useSelector((state) => state.userSlice);
  // RTK Query mutation
  const [addBooking, { isLoading: isSubmitting }] = useAddBookingMutation();

  // States
  const navigate = useNavigate();
  const location = useLocation();
  const { spotData } = location.state || {};
  const [travelSpot, setTravelspot] = useState("");
  const [travelCountry, setTravelCountry] = useState("");
  const [travelCost, setTravelCost] = useState("");
  const [travelSeason, setTravelSeason] = useState("");
  const [travelName, setTravelName] = useState(userName || "");
  const [travelEmail, setTravelEmail] = useState(userEmail || "");
  const [travelDate, setTravelDate] = useState("");
  const [travelDuration, setTravelDuration] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (spotData) {
      setTravelspot(spotData.spot);
      setTravelCountry(spotData.country);
      setTravelCost(spotData.average_cost);
      setTravelSeason(spotData.seasonality);
    }
    setTimeout(() => setIsLoaded(true), 200);
  }, [spotData]);

  if (!spotData) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <div className="text-center text-white animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">No Booking Data Found</h2>
          <p className="text-gray-400 mb-6">
            Please select a destination to book your trip.
          </p>
          <div className="space-y-4">
            <Link
              to="/AllTouristSpots"
              className="block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 hover:scale-105"
            >
              Browse Destinations
            </Link>
            <Link
              to="/bookings"
              className="block px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-300 hover:scale-105"
            >
              View Your Bookings
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingInfo = {
      travelSpot,
      travelCountry,
      travelCost,
      travelSeason,
      travelName,
      travelEmail,
      travelDate,
      travelDuration,
    };

    try {
      await addBooking(bookingInfo).unwrap();
      clearInputs();
      navigate(-2);
      toast.success("Booking Added Successfully!");
    } catch (error) {
      console.error("Error in booking:", error);
      toast.error("Failed to create booking. Please try again.");
    }
  };

  const handleCancel = () => {
    clearInputs();
    navigate(-2);
  };

  const clearInputs = () => {
    setTravelspot("");
    setTravelCountry("");
    setTravelCost("");
    setTravelSeason("");
    setTravelName("");
    setTravelEmail("");
    setTravelDate("");
    setTravelDuration(1);
  };

  // Calculate total cost
  const calculateTotalCost = () => {
    const baseCost = parseFloat(travelCost.replace(/[^0-9.-]+/g, "")) || 0;
    return (baseCost * travelDuration).toLocaleString();
  };

  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-6 h-full">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-r border-gray-800 h-full" />
          ))}
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-white rounded-full animate-float ${
              i % 3 === 0
                ? "opacity-30"
                : i % 3 === 1
                ? "opacity-20"
                : "opacity-10"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Book Your
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              Dream Adventure
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Complete your booking details below and get ready for an
            unforgettable journey to {spotData.spot}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Destination Summary */}
          <div
            className={`lg:col-span-1 transition-all duration-1000 delay-200 ${
              isLoaded
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm hover:border-gray-700 transition-all duration-300">
              <div className="relative mb-6">
                <img
                  src={spotData.image}
                  alt={spotData.spot}
                  className="w-full h-48 object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white font-bold text-lg">
                    {spotData.spot}
                  </h3>
                  <div className="flex items-center space-x-1 mt-1">
                    <FaMapMarkerAlt className="text-blue-400 text-sm" />
                    <span className="text-gray-300 text-sm">
                      {spotData.country}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <FaDollarSign className="text-green-400" />
                    <span className="text-gray-300">Base Cost</span>
                  </div>
                  <span className="text-white font-semibold">
                    {spotData.average_cost}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <FaSun className="text-yellow-400" />
                    <span className="text-gray-300">Best Season</span>
                  </div>
                  <span className="text-white font-semibold">
                    {spotData.seasonality}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <FaUsers className="text-purple-400" />
                    <span className="text-gray-300">Duration</span>
                  </div>
                  <span className="text-white font-semibold">
                    {travelDuration} day{travelDuration > 1 ? "s" : ""}
                  </span>
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <div className="flex items-center justify-between p-3 bg-blue-600/20 border border-blue-500/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <FaDollarSign className="text-blue-400" />
                      <span className="text-white font-semibold">
                        Total Cost
                      </span>
                    </div>
                    <span className="text-blue-400 font-bold text-lg">
                      ${calculateTotalCost()}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <h4 className="text-white font-semibold">
                    What&#39;s Included:
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center space-x-2">
                      <FaCheck className="text-green-400" />
                      <span className="text-gray-300">Professional guide</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaCheck className="text-green-400" />
                      <span className="text-gray-300">Transportation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaCheck className="text-green-400" />
                      <span className="text-gray-300">Travel insurance</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaCheck className="text-green-400" />
                      <span className="text-gray-300">24/7 support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div
            className={`lg:col-span-2 transition-all duration-1000 delay-400 ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <FaPlane className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Booking Details
                  </h2>
                  <p className="text-gray-400">
                    Fill in your travel information
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Destination Info Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-white font-medium">
                      <FaMapMarkerAlt className="text-blue-400" />
                      <span>Travel Destination</span>
                    </label>
                    <input
                      type="text"
                      value={travelSpot}
                      readOnly
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors duration-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-white font-medium">
                      <FaGlobe className="text-green-400" />
                      <span>Country</span>
                    </label>
                    <input
                      type="text"
                      value={travelCountry}
                      readOnly
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors duration-200"
                    />
                  </div>
                </div>

                {/* Cost and Season Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-white font-medium">
                      <FaDollarSign className="text-yellow-400" />
                      <span>Cost per Day</span>
                    </label>
                    <input
                      type="text"
                      value={travelCost}
                      readOnly
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors duration-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-white font-medium">
                      <FaSun className="text-orange-400" />
                      <span>Best Season</span>
                    </label>
                    <input
                      type="text"
                      value={travelSeason}
                      readOnly
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors duration-200"
                    />
                  </div>
                </div>

                {/* Personal Info Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-white font-medium">
                      <FaUser className="text-purple-400" />
                      <span>Full Name</span>
                    </label>
                    <input
                      type="text"
                      value={travelName}
                      onChange={(e) => setTravelName(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-white font-medium">
                      <FaEnvelope className="text-red-400" />
                      <span>Email Address</span>
                    </label>
                    <input
                      type="email"
                      value={travelEmail}
                      readOnly
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors duration-200"
                    />
                  </div>
                </div>

                {/* Date and Duration Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-white font-medium">
                      <FaCalendarAlt className="text-blue-400" />
                      <span>Travel Date</span>
                    </label>
                    <input
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-white font-medium">
                      <FaClock className="text-green-400" />
                      <span>Duration (Days)</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={travelDuration}
                      onChange={(e) =>
                        setTravelDuration(parseInt(e.target.value))
                      }
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <FaShieldAlt className="text-blue-400 mt-1" />
                    <div className="text-sm text-gray-300">
                      <p className="font-semibold text-white mb-2">
                        Terms & Conditions
                      </p>
                      <ul className="space-y-1">
                        <li>
                          • Booking confirmation will be sent within 24 hours
                        </li>
                        <li>
                          • Cancellation policy: 48 hours before travel date
                        </li>
                        <li>• Travel insurance is included in the package</li>
                        <li>• Valid ID/passport required for travel</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/30 ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <FaCheck />
                        <span>Confirm Booking</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 flex items-center justify-center space-x-3 px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <FaTimes />
                    <span>Cancel</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div
          className={`text-center mt-12 transition-all duration-1000 delay-600 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link
            to="/AllTouristSpots"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Destinations</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Booking;

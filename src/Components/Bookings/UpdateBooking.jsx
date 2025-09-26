import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClock,
  FaEdit,
  FaCheck,
  FaTimes,
  FaArrowLeft,
  FaMapMarkerAlt,
  FaDollarSign,
  FaUser,
  FaGlobe,
  FaSun,
  FaPlane,
  FaExclamationTriangle,
} from "react-icons/fa";
import toast from "react-hot-toast";
import {
  useGetBookingByIdQuery,
  useUpdateBookingMutation,
} from "../../Redux/features/api/bookingsApi";
import Loader from "../CustomHooks/Loader";

const UpdateBooking = () => {
  // States
  const { id } = useParams();
  const navigate = useNavigate();
  const [travelDate, setTravelDate] = useState("");
  const [travelDuration, setTravelDuration] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  // RTK Query & Mutation
  const {
    data: booking,
    isLoading,
    isError,
    error,
  } = useGetBookingByIdQuery(id);
  const [updateBooking, { isLoading: isSubmitting }] =
    useUpdateBookingMutation();

  useEffect(() => {
    if (booking) {
      setTravelDate(booking.travelDate || "");
      setTravelDuration(booking.travelDuration || 1);
    }
    setTimeout(() => setIsLoaded(true), 200);
  }, [booking]);

  // Check if booking data exists
  if (!booking) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <div className="text-center text-white animate-fade-in">
          <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaExclamationTriangle className="text-3xl text-red-400" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Booking Not Found</h2>
          <p className="text-gray-400 mb-6">
            The booking you&#39;re trying to update could not be found.
          </p>
          <Link
            to="/bookings"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 hover:scale-105"
          >
            Back to Bookings
          </Link>
        </div>
      </div>
    );
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateBooking({ id, travelDate, travelDuration }).unwrap();
      toast.success("Booking updated successfully!");
      navigate("/bookings");
    } catch (error) {
      console.error("Error updating booking:", error);
      toast.error("Failed to update booking. Please try again.");
    }
  };

  const handleCancel = () => {
    clearInputs();
    navigate("/bookings");
  };

  const clearInputs = () => {
    setTravelDate("");
    setTravelDuration(1);
  };

  // Calculate new total cost
  const calculateNewCost = () => {
    const baseCost =
      parseFloat(booking.travelCost?.replace(/[^0-9.-]+/g, "")) || 0;
    return (baseCost * travelDuration).toLocaleString();
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return <Loader>Loading All Bookings Data</Loader>;
  }

  if (isError) {
    console.log("Error when fetching bookings data: ", error);
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load tourist Bookings
      </div>
    );
  }

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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaEdit className="text-3xl text-blue-400" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Update Your
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              Travel Booking
            </span>
          </h1>

          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Modify your travel dates and duration for your trip to{" "}
            {booking.travelSpot}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Summary */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isLoaded
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm hover:border-gray-700 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                <FaPlane className="text-blue-400" />
                <span>Current Booking Details</span>
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FaMapMarkerAlt className="text-blue-400" />
                    <div>
                      <div className="text-white font-semibold">
                        Destination
                      </div>
                      <div className="text-gray-400 text-sm">
                        {booking.travelSpot}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FaGlobe className="text-green-400" />
                    <div>
                      <div className="text-white font-semibold">Country</div>
                      <div className="text-gray-400 text-sm">
                        {booking.travelCountry}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FaUser className="text-purple-400" />
                    <div>
                      <div className="text-white font-semibold">Traveler</div>
                      <div className="text-gray-400 text-sm">
                        {booking.travelName}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FaDollarSign className="text-yellow-400" />
                    <div>
                      <div className="text-white font-semibold">
                        Cost per Day
                      </div>
                      <div className="text-gray-400 text-sm">
                        {booking.travelCost}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FaSun className="text-orange-400" />
                    <div>
                      <div className="text-white font-semibold">
                        Best Season
                      </div>
                      <div className="text-gray-400 text-sm">
                        {booking.travelSeason}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Updated Cost Preview */}
                <div className="border-t border-gray-700 pt-4">
                  <div className="p-4 bg-blue-600/20 border border-blue-500/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FaDollarSign className="text-blue-400" />
                        <span className="text-white font-semibold">
                          New Total Cost
                        </span>
                      </div>
                      <span className="text-blue-400 font-bold text-lg">
                        ${calculateNewCost()}
                      </span>
                    </div>
                    <div className="text-gray-400 text-sm mt-1">
                      Based on {travelDuration} day
                      {travelDuration > 1 ? "s" : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Update Form */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <FaEdit className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Update Details
                  </h2>
                  <p className="text-gray-400">
                    Modify your travel information
                  </p>
                </div>
              </div>

              <form onSubmit={handleUpdate} className="space-y-6">
                {/* Current vs New Comparison */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-6">
                  <h4 className="text-white font-semibold mb-3">
                    Current Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <FaCalendarAlt className="text-blue-400" />
                      <span className="text-gray-300">
                        Date:{" "}
                        {booking.travelDate
                          ? formatDate(booking.travelDate)
                          : "Not set"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaClock className="text-purple-400" />
                      <span className="text-gray-300">
                        Duration: {booking.travelDuration} day
                        {booking.travelDuration > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Travel Date */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-white font-medium">
                    <FaCalendarAlt className="text-blue-400" />
                    <span>New Travel Date</span>
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    required
                  />
                  <p className="text-gray-400 text-sm">
                    Current:{" "}
                    {booking.travelDate
                      ? formatDate(booking.travelDate)
                      : "Not set"}
                  </p>
                </div>

                {/* Travel Duration */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-white font-medium">
                    <FaClock className="text-green-400" />
                    <span>New Duration (Days)</span>
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
                  <p className="text-gray-400 text-sm">
                    Current: {booking.travelDuration} day
                    {booking.travelDuration > 1 ? "s" : ""}
                  </p>
                </div>

                {/* Cost Impact */}
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <FaDollarSign className="text-yellow-400 mt-1" />
                    <div className="text-sm">
                      <p className="font-semibold text-white mb-2">
                        Cost Impact
                      </p>
                      <p className="text-gray-300">
                        Changing duration from {booking.travelDuration} to{" "}
                        {travelDuration} day{travelDuration > 1 ? "s" : ""} will
                        {travelDuration > booking.travelDuration
                          ? " increase"
                          : travelDuration < booking.travelDuration
                          ? " decrease"
                          : " not change"}
                        your total cost.
                      </p>
                      <p className="text-yellow-400 font-semibold mt-2">
                        New Total: ${calculateNewCost()}
                      </p>
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
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <FaCheck />
                        <span>Update Booking</span>
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
            to="/bookings"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Bookings</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UpdateBooking;

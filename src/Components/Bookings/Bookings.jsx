import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaDollarSign,
  FaMapMarkerAlt,
  FaUser,
  FaEdit,
  FaTrash,
  FaPlus,
  FaArrowLeft,
  FaGlobe,
  FaTicketAlt,
  FaSearch,
  FaSort,
  FaMoneyBill,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Loader from "../CustomHooks/Loader";
import {
  useDeleteBookingMutation,
  useGetBookingsQuery,
} from "../../Redux/features/api/bookingsApi";
import { useGetPaymentsQuery } from "../../Redux/features/api/paymentApi";

const Bookings = () => {
  // redux state
  const { userName, userEmail } = useSelector((state) => state.userSlice);

  // RTK Query
  const {
    data: loadedData = [],
    isLoading,
    isError,
    error,
  } = useGetBookingsQuery();
  const [deleteBooking] = useDeleteBookingMutation();
  const { data: payments = [] } = useGetPaymentsQuery();

  // States
  const [remainingData, setRemainingData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [isLoaded, setIsLoaded] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (userEmail) {
      const remain = loadedData.filter(
        (data) => data.travelEmail === userEmail
      );
      setRemainingData(remain);
      setFilteredData(remain);
    }
    setTimeout(() => setIsLoaded(true), 200);
  }, [loadedData, userEmail]);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...remainingData];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (booking) =>
          booking.travelSpot.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.travelCountry
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          booking.travelName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.travelDate) - new Date(a.travelDate);
        case "name":
          return a.travelName.localeCompare(b.travelName);
        case "spot":
          return a.travelSpot.localeCompare(b.travelSpot);
        case "cost":
          return (
            parseFloat(b.travelCost.replace(/[^0-9.-]+/g, "")) -
            parseFloat(a.travelCost.replace(/[^0-9.-]+/g, ""))
          );
        default:
          return 0;
      }
    });

    setFilteredData(filtered);
  }, [searchTerm, sortBy, remainingData]);

  const handleDelete = async (_id) => {
    setDeletingId(_id);

    try {
      const response = await deleteBooking(_id).unwrap();

      if (response.deletedCount > 0) {
        const currentDatas = remainingData.filter((datas) => datas._id !== _id);
        setRemainingData(currentDatas);
        toast.success("Booking deleted successfully! 🗑️");
      }
    } catch (error) {
      console.log("Failed to delete booking: ", error);
      toast.error("Failed to delete booking");
    } finally {
      setDeletingId(null);
    }
  };

  // Calculate total spent
  const calculateTotalSpent = () => {
    return remainingData
      .reduce((total, booking) => {
        const cost =
          parseFloat(booking.travelCost.replace(/[^0-9.-]+/g, "")) || 0;
        const duration = parseInt(booking.travelDuration) || 1;
        return total + cost * duration;
      }, 0)
      .toLocaleString();
  };

  // Get upcoming bookings
  const getUpcomingBookings = () => {
    const today = new Date();
    return remainingData.filter(
      (booking) => new Date(booking.travelDate) >= today
    ).length;
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Check if booking is upcoming
  const isUpcoming = (dateString) => {
    return new Date(dateString) >= new Date();
  };

  // helper function to check if paid
  const isPaid = (bookingId) =>
    payments.some((payment) => payment.bookingId === bookingId);

  if (!remainingData || remainingData.length === 0) {
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

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center text-white animate-fade-in max-w-2xl px-6">
            <div className="w-24 h-24 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
              <FaTicketAlt className="text-4xl text-blue-400" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              No Bookings Yet!
            </h1>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Your adventure awaits! Start exploring amazing destinations and
              create your first booking. Discover breathtaking places around the
              world and make unforgettable memories.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/AllTouristSpots"
                className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/30"
              >
                <FaPlus />
                <span>Create Your First Booking</span>
              </Link>

              <Link
                to="/PopularSpots"
                className="flex items-center space-x-3 px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <FaGlobe />
                <span>Explore Popular Destinations</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const stats = [
    {
      icon: FaTicketAlt,
      number: remainingData.length,
      label: "Total Bookings",
      color: "text-blue-400",
    },
    {
      icon: FaCalendarAlt,
      number: getUpcomingBookings(),
      label: "Upcoming Trips",
      color: "text-green-400",
    },
    {
      icon: FaDollarSign,
      number: `$${calculateTotalSpent()}`,
      label: "Total Spent",
      color: "text-yellow-400",
    },
    {
      icon: FaGlobe,
      number: new Set(remainingData.map((b) => b.travelCountry)).size,
      label: "Countries Visited",
      color: "text-purple-400",
    },
  ];

  const sortOptions = [
    { value: "date", label: "Travel Date" },
    { value: "name", label: "Name" },
    { value: "spot", label: "Destination" },
    { value: "cost", label: "Cost" },
  ];

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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {userEmail ? (
              <>
                Welcome back,{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {userName}
                </span>
                !
              </>
            ) : (
              "Your Travel Bookings"
            )}
          </h1>
          <p className="text-gray-300 text-lg">
            Manage your travel bookings and explore new destinations
          </p>
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 transition-all duration-1000 delay-200 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm hover:border-gray-700 hover:scale-105 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center space-x-3">
                <stat.icon className={`text-2xl ${stat.color}`} />
                <div>
                  <div className={`text-2xl font-bold ${stat.color}`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <div
          className={`mb-8 transition-all duration-1000 delay-400 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FaSort className="text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-all duration-300"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      Sort by {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <Link
                to="/AllTouristSpots"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
              >
                <FaPlus />
                <span>New Booking</span>
              </Link>
            </div>
          </div>

          <div className="mt-4 text-gray-400 text-sm">
            Showing {filteredData.length} of {remainingData.length} bookings
          </div>
        </div>

        {/* Bookings Grid/Table */}
        <div
          className={`transition-all duration-1000 delay-600 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Mobile Cards View */}
          <div className="block md:hidden space-y-4">
            {filteredData.map((booking, index) => (
              <div
                key={booking._id}
                className={`bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm hover:border-gray-700 transition-all duration-300 animate-fade-in-up ${
                  isUpcoming(booking.travelDate)
                    ? "border-green-500/30 bg-green-500/5"
                    : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">
                      {booking.travelSpot}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {booking.travelCountry}
                    </p>
                  </div>
                  {isUpcoming(booking.travelDate) && (
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                      Upcoming
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <FaCalendarAlt className="text-blue-400" />
                    <span className="text-gray-300 text-sm">
                      {formatDate(booking.travelDate)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaClock className="text-purple-400" />
                    <span className="text-gray-300 text-sm">
                      {booking.travelDuration} day
                      {booking.travelDuration > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaDollarSign className="text-yellow-400" />
                    <span className="text-gray-300 text-sm">
                      {booking.travelCost}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaUser className="text-green-400" />
                    <span className="text-gray-300 text-sm">
                      {booking.travelName}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  {isPaid(booking._id) ? (
                    <button
                      disabled
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg cursor-not-allowed"
                    >
                      <FaMoneyBill />
                      <span>Paid</span>
                    </button>
                  ) : (
                    <Link
                      to={`/payment/${booking._id}`}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                    >
                      <FaMoneyBill />
                      <span>Pay Now</span>
                    </Link>
                  )}
                  <Link
                    to={`/updateBooking/${booking._id}`}
                    className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-orange-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 ${
                      isPaid(booking._id)
                        ? "opacity-50 cursor-not-allowed pointer-events-none"
                        : "hover:bg-orange-700"
                    }`}
                  >
                    <FaEdit />
                    <span>Update</span>
                  </Link>

                  <button
                    onClick={() => handleDelete(booking._id)}
                    disabled={deletingId === booking._id || isPaid(booking._id)}
                    className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 ${
                      deletingId === booking._id || isPaid(booking._id)
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-red-700"
                    }`}
                  >
                    {deletingId === booking._id ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FaTrash />
                    )}
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block bg-gray-900/30 border border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800/50 border-b border-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      #
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      Traveler
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      Destination
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      Cost
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      Travel Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      Duration
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      Status
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((booking, index) => (
                    <tr
                      key={booking._id}
                      className={`border-b border-gray-800 hover:bg-gray-800/30 transition-colors duration-200 animate-fade-in-up ${
                        isUpcoming(booking.travelDate)
                          ? "bg-green-500/5 border-green-500/20"
                          : ""
                      }`}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      {/* index */}
                      <td className="px-6 py-4 text-gray-300">{index + 1}</td>
                      {/* traveler */}
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                            <FaUser className="text-white text-sm" />
                          </div>
                          <div>
                            <div className="text-white font-medium">
                              {booking.travelName}
                            </div>
                            <div className="text-gray-400 text-sm">
                              {booking.travelEmail}
                            </div>
                          </div>
                        </div>
                      </td>
                      {/* destination */}
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <FaMapMarkerAlt className="text-blue-400" />
                          <div>
                            <div className="text-white font-medium">
                              {booking.travelSpot}
                            </div>
                            <div className="text-gray-400 text-sm">
                              {booking.travelCountry}
                            </div>
                          </div>
                        </div>
                      </td>
                      {/* cost */}
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-1">
                          <FaDollarSign className="text-yellow-400" />
                          <span className="text-white font-medium">
                            {booking.travelCost}
                          </span>
                        </div>
                      </td>
                      {/* travele date */}
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <FaCalendarAlt className="text-green-400" />
                          <span className="text-gray-300">
                            {formatDate(booking.travelDate)}
                          </span>
                        </div>
                      </td>
                      {/* duration */}
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-1">
                          <FaClock className="text-purple-400" />
                          <span className="text-gray-300 text-xs">
                            {booking.travelDuration} day
                            {booking.travelDuration > 1 ? "s" : ""}
                          </span>
                        </div>
                      </td>
                      {/* status */}
                      <td className="px-6 py-4">
                        {isUpcoming(booking.travelDate) ? (
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full font-medium">
                            Upcoming
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-full font-medium">
                            Completed
                          </span>
                        )}
                      </td>
                      {/* actions */}
                      <td className="px-6 py-4">
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center space-x-2">
                            {isPaid(booking._id) ? (
                              <button
                                disabled
                                className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white font-medium rounded-lg cursor-not-allowed"
                              >
                                <FaMoneyBill className="text-sm" />
                                <span>Paid</span>
                              </button>
                            ) : (
                              <Link
                                to={`/payment/${booking._id}`}
                                className="flex items-center space-x-1 px-3 py-2 bg-yellow-600 hover:bg-yellow-500 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105"
                              >
                                <FaMoneyBill className="text-sm" />
                                <span>Pay Now</span>
                              </Link>
                            )}

                            <Link
                              to={`/updateBooking/${booking._id}`}
                              className={`flex items-center space-x-1 px-3 py-2 bg-orange-600 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 ${
                                isPaid(booking._id)
                                  ? "opacity-50 cursor-not-allowed pointer-events-none"
                                  : "hover:bg-orange-700"
                              }`}
                            >
                              <FaEdit className="text-sm" />
                              <span>Update</span>
                            </Link>

                            <button
                              onClick={() => handleDelete(booking._id)}
                              disabled={
                                deletingId === booking._id ||
                                isPaid(booking._id)
                              }
                              className={`flex items-center space-x-1 px-3 py-2 bg-red-600 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 ${
                                deletingId === booking._id ||
                                isPaid(booking._id)
                                  ? "opacity-50 cursor-not-allowed"
                                  : "hover:bg-red-700"
                              }`}
                            >
                              {deletingId === booking._id ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <FaTrash className="text-sm" />
                              )}
                              <span>Delete</span>
                            </button>
                          </div>
                        </td>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div
          className={`text-center mt-12 transition-all duration-1000 delay-800 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Bookings;

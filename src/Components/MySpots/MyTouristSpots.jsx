import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaArrowLeft,
  FaDollarSign,
  FaGlobe,
  FaUsers,
  FaHeart,
  FaShare,
  FaSearch,
  FaSort,
  FaTh,
  FaList,
  FaCalendarAlt,
} from "react-icons/fa";
import Loader from "../CustomHooks/Loader";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  useDeleteSpotMutation,
  useGetAllSpotsByEmailQuery,
} from "../../Redux/features/api/allSpotsApi";
import Swal from "sweetalert2";

const MyTouristSpots = () => {
  const [filteredSpots, setFilteredSpots] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [deletingId, setDeletingId] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { userEmail } = useSelector((state) => state.userSlice);

  const {
    data: touristSpots = [],
    isLoading: selectedDataLoading,
    isError,
    error,
  } = useGetAllSpotsByEmailQuery(userEmail);

  const [deleteSpot] = useDeleteSpotMutation();

  // Filter & Search
  useEffect(() => {
    let filtered = [...touristSpots];

    if (searchTerm) {
      filtered = filtered.filter(
        (spot) =>
          spot.spot.toLowerCase().includes(searchTerm.toLowerCase()) ||
          spot.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case "oldest":
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        case "name":
          return a.spot.localeCompare(b.spot);
        case "country":
          return a.country.localeCompare(b.country);
        case "cost":
          return (
            parseFloat(b.average_cost.replace(/[^0-9.-]+/g, "")) -
            parseFloat(a.average_cost.replace(/[^0-9.-]+/g, ""))
          );
        default:
          return 0;
      }
    });

    setFilteredSpots(filtered);
  }, [searchTerm, sortBy, touristSpots]);

  // Trigger animations after load
  useEffect(() => {
    if (!selectedDataLoading) {
      const timer = setTimeout(() => setIsLoaded(true), 200);
      return () => clearTimeout(timer);
    }
  }, [selectedDataLoading]);

  // Delete spot
  const handleDelete = async (spotId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        setDeletingId(spotId);
        await deleteSpot(spotId).unwrap();
        toast.success("Tourist spot deleted successfully!");
        setDeletingId(null);
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete spot. Please try again.");
        setDeletingId(null);
      }
    }
  };

  const handleShare = (spot) => {
    if (navigator.share) {
      navigator.share({
        title: spot.spot,
        text: `Check out ${spot.spot} in ${spot.country}!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`${spot.spot} - ${window.location.href}`);
      toast.success("Link copied to clipboard!");
    }
  };

  if (selectedDataLoading) {
    return <Loader>Loading your amazing destinations...</Loader>;
  }

  if (isError) {
    console.error("Error fetching tourist spots: ", error);
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load tourist spots.
      </div>
    );
  }

  if (!touristSpots || touristSpots.length === 0) {
    return (
      <div className="text-center py-20 text-white">
        No destinations added yet.
      </div>
    );
  }

  // Stats
  const stats = [
    {
      icon: FaMapMarkerAlt,
      number: touristSpots.length,
      label: "Your Destinations",
      color: "text-blue-400",
    },
    {
      icon: FaGlobe,
      number: new Set(touristSpots.map((s) => s.country)).size,
      label: "Countries",
      color: "text-green-400",
    },
    {
      icon: FaDollarSign,
      number: `$${Math.round(
        touristSpots.reduce(
          (sum, s) =>
            sum + parseFloat(s.average_cost.replace(/[^0-9.-]+/g, "")),
          0
        ) / touristSpots.length || 0
      )}`,
      label: "Avg Cost",
      color: "text-yellow-400",
    },
    { icon: FaHeart, number: "100%", label: "Passion", color: "text-red-400" },
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "name", label: "Name" },
    { value: "country", label: "Country" },
    { value: "cost", label: "Cost" },
  ];

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
            selectedDataLoading
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Personal
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              Travel Collection
            </span>
          </h1>

          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-2">
            Here are the amazing destinations you&#39;ve shared with the world.
            Each spot represents your unique travel experiences and
            recommendations for fellow explorers.
          </p>

          <p className="text-blue-400 font-semibold">
            You&#39;ve contributed {touristSpots.length} incredible destination
            {touristSpots.length !== 1 ? "s" : ""} to our community!
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
                placeholder="Search your destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              />
            </div>

            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 transition-all duration-300 ${
                    viewMode === "grid"
                      ? "bg-blue-600 text-white scale-110"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                  title="Grid View"
                >
                  <FaTh />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 transition-all duration-300 ${
                    viewMode === "list"
                      ? "bg-blue-600 text-white scale-110"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                  title="List View"
                >
                  <FaList />
                </button>
              </div>

              {/* Sort */}
              <div className="flex items-center space-x-2">
                <FaSort className="text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-all duration-300"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Add New Button */}
              <Link
                to="/AddTouristSpots"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
              >
                <FaPlus />
                <span>Add New</span>
              </Link>
            </div>
          </div>

          <div className="mt-4 text-gray-400 text-sm">
            Showing {filteredSpots.length} of {touristSpots.length} destinations
          </div>
        </div>

        {/* Tourist Spots Grid */}
        <div
          className={`grid gap-8 mb-16 ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          } transition-all duration-1000 delay-600 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {filteredSpots.map((spot, index) => (
            <div
              key={spot._id}
              className={`group cursor-pointer animate-fade-in-up hover:scale-105 transition-all duration-500 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              style={{
                animationDelay: `${index * 0.1 + 0.7}s`,
                transitionDelay: `${index * 0.05}s`,
              }}
            >
              <div
                className={`relative bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl hover:border-gray-600 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 transform-gpu ${
                  viewMode === "list" ? "flex" : ""
                }`}
              >
                {/* Image Container */}
                <div
                  className={`relative overflow-hidden ${
                    viewMode === "list" ? "w-80 h-48" : "h-64"
                  }`}
                >
                  <img
                    src={spot.image}
                    alt={spot.spot}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                  {/* Hover Actions */}
                  <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <Link
                      to={`/updateTouristSpot/${spot._id}`}
                      className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-all duration-300 hover:scale-110"
                      title="Edit"
                    >
                      <FaEdit />
                    </Link>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleShare(spot);
                      }}
                      className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white hover:bg-green-700 transition-all duration-300 hover:scale-110"
                      title="Share"
                    >
                      <FaShare />
                    </button>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(spot._id);
                      }}
                      disabled={deletingId === spot._id}
                      className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-all duration-300 hover:scale-110"
                      title="Delete"
                    >
                      {deletingId === spot._id ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <FaTrash />
                      )}
                    </button>
                  </div>

                  {/* Creator Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-blue-600/80 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                      Your Creation
                    </div>
                  </div>

                  {/* Price Tag */}
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                      {spot.average_cost}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`p-6 space-y-4 ${
                    viewMode === "list" ? "flex-1" : ""
                  }`}
                >
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                      {spot.spot}
                    </h3>
                    <div className="flex items-center space-x-2 text-gray-400 mb-3">
                      <FaMapMarkerAlt className="text-blue-400 text-sm" />
                      <span className="text-sm">{spot.country}</span>
                    </div>
                    {spot.description && (
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
                        {spot.description}
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {spot.seasonality && (
                      <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700 hover:border-orange-500 transition-colors duration-200">
                        <FaCalendarAlt className="inline mr-1" />
                        {spot.seasonality}
                      </span>
                    )}
                    {spot.travel_time && (
                      <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700 hover:border-purple-500 transition-colors duration-200">
                        {spot.travel_time}
                      </span>
                    )}
                    {spot.totalVisitorsPerYear && (
                      <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700 hover:border-green-500 transition-colors duration-200">
                        <FaUsers className="inline mr-1" />
                        {spot.totalVisitorsPerYear}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-gray-800 flex space-x-2">
                    <Link
                      to={`/allTouristSpots/touristSpot/${spot._id}`}
                      className="flex-1 inline-flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 group/btn"
                    >
                      <FaEye />
                      <span>View Details</span>
                    </Link>

                    <Link
                      to={`/updateTouristSpot/${spot._id}`}
                      className="flex items-center justify-center px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                      title="Edit Spot"
                    >
                      <FaEdit />
                    </Link>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredSpots.length === 0 && searchTerm && (
          <div className="text-center py-16 animate-fade-in">
            <div className="text-6xl text-gray-600 mb-4 animate-bounce">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              No destinations found
            </h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search terms to find your destinations.
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Back Button */}
        <div
          className={`text-center transition-all duration-1000 delay-800 ${
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

export default MyTouristSpots;

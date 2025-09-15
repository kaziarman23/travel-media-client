import { Link, useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  FaMapMarkerAlt, 
  FaStar, 
  FaEye,
  FaHeart,
  FaFilter,
  FaSearch,
  FaSort,
  FaTh,
  FaList,
  FaArrowLeft,
  FaDollarSign,
  FaClock,
  FaUsers,
  FaShare,
  FaBookmark
} from "react-icons/fa";

const AllTouristSpots = () => {
  const loadedData = useLoaderData();

  // State
  const [filteredData, setFilteredData] = useState(loadedData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [favoritePlaces, setFavoritePlaces] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation trigger
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...loadedData];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.spot.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.country && item.country.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (filterBy !== "all") {
      filtered = filtered.filter(item => 
        item.category?.toLowerCase() === filterBy.toLowerCase()
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.spot.localeCompare(b.spot);
        case "price":
          return parseFloat(a.average_cost.replace(/[^0-9.-]+/g, "")) - 
                 parseFloat(b.average_cost.replace(/[^0-9.-]+/g, ""));
        case "rating":
          return (b.rating || 4.5) - (a.rating || 4.5);
        case "popularity":
          return (b.visitors || Math.random() * 1000) - (a.visitors || Math.random() * 1000);
        default:
          return 0;
      }
    });

    setFilteredData(filtered);
  }, [searchTerm, sortBy, filterBy, loadedData]);

  // Toggle favorite
  const toggleFavorite = (spotId) => {
    const newFavorites = new Set(favoritePlaces);
    if (newFavorites.has(spotId)) {
      newFavorites.delete(spotId);
    } else {
      newFavorites.add(spotId);
    }
    setFavoritePlaces(newFavorites);
  };

  // Share function
  const handleShare = (spot) => {
    if (navigator.share) {
      navigator.share({
        title: spot.spot,
        text: `Check out ${spot.spot} - an amazing destination!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // Generate star rating
  const generateStars = (rating = 4.5) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-600'} text-sm transition-colors duration-200`}
      />
    ));
  };

  // Stats data
  const stats = [
    { icon: FaMapMarkerAlt, number: loadedData.length, label: "Destinations", color: "text-blue-400" },
    { icon: FaUsers, number: "50K+", label: "Travelers", color: "text-green-400" },
    { icon: FaStar, number: "4.8", label: "Avg Rating", color: "text-yellow-400" },
    { icon: FaHeart, number: "98%", label: "Satisfaction", color: "text-red-400" }
  ];

  const categories = ["all", "beach", "mountain", "city", "historical", "nature", "adventure"];
  const sortOptions = [
    { value: "name", label: "Name" },
    { value: "price", label: "Price" },
    { value: "rating", label: "Rating" },
    { value: "popularity", label: "Popularity" }
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
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-white rounded-full animate-float ${
              i % 4 === 0 ? 'opacity-40' : i % 4 === 1 ? 'opacity-25' : i % 4 === 2 ? 'opacity-15' : 'opacity-10'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Discover the World's
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              Best Destinations
            </span>
          </h1>
          
          <div className="max-w-4xl mx-auto mb-8">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              At Travel Media, we bring you closer to the world's most breathtaking tourist spots. 
              From serene beaches and majestic mountains to vibrant cities and ancient wonders, 
              we have curated an extensive collection of must-see destinations for every type of traveler.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`flex items-center justify-center space-x-3 p-4 bg-gray-900/50 border border-gray-800 rounded-lg backdrop-blur-sm hover:border-gray-700 hover:scale-105 transition-all duration-300 animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <stat.icon className={`text-2xl ${stat.color}`} />
                <div>
                  <div className={`text-2xl font-bold ${stat.color}`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters and Search */}
        <div className={`mb-12 space-y-6 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search destinations..."
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
                      ? 'bg-blue-600 text-white scale-110' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                  title="Grid View"
                >
                  <FaTh />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 transition-all duration-300 ${
                    viewMode === "list" 
                      ? 'bg-blue-600 text-white scale-110' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                  title="List View"
                >
                  <FaList />
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-400" />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-all duration-300"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <FaSort className="text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-all duration-300"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    Sort by {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="text-gray-400 text-sm">
              Showing {filteredData.length} of {loadedData.length} destinations
            </div>
          </div>
        </div>

        {/* Tourist Spots Grid */}
        <div className={`grid gap-8 mb-16 ${
          viewMode === "grid" 
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1"
        }`}>
          {filteredData.map((data, index) => (
            <div
              key={data._id || index}
              className={`group cursor-pointer animate-fade-in-up hover:scale-105 transition-all duration-500 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ 
                animationDelay: `${(index * 0.1) + 0.5}s`,
                transitionDelay: `${index * 0.05}s`
              }}
            >
              <div className={`relative bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl hover:border-gray-600 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 transform-gpu ${
                viewMode === "list" ? "flex" : ""
              }`}>
                {/* Image Container */}
                <div className={`relative overflow-hidden ${
                  viewMode === "list" ? "w-80 h-48" : "h-64"
                }`}>
                  <img
                    src={data.image}
                    alt={data.spot}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  
                  {/* Hover Actions */}
                  <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(data._id);
                      }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                        favoritePlaces.has(data._id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/20 text-white hover:bg-red-500'
                      }`}
                    >
                      <FaHeart />
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleShare(data);
                      }}
                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-green-500 transition-all duration-300 hover:scale-110"
                    >
                      <FaShare />
                    </button>
                    
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                      <FaEye />
                    </div>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                      <div className="flex space-x-1">
                        {generateStars(data.rating)}
                      </div>
                      <span className="text-white text-sm font-medium ml-2">
                        {(data.rating || 4.5).toFixed(1)}
                      </span>
                    </div>
                  </div>

                  {/* Price Tag */}
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                      {data.average_cost}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`p-6 space-y-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                      {data.spot}
                    </h3>
                    <div className="flex items-center space-x-2 text-gray-400 mb-3">
                      <FaMapMarkerAlt className="text-blue-400 text-sm" />
                      <span className="text-sm">{data.location || data.country}</span>
                    </div>
                    {data.description && (
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
                        {data.description}
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {data.seasonality && (
                      <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700 hover:border-blue-500 transition-colors duration-200">
                        <FaClock className="inline mr-1" />
                        {data.seasonality}
                      </span>
                    )}
                    {data.travel_time && (
                      <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700 hover:border-green-500 transition-colors duration-200">
                        {data.travel_time}
                      </span>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 border-t border-gray-800">
                    <Link
                      to={`/allTouristSpots/touristSpot/${data._id}`}
                      className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg group/btn"
                    >
                      <FaEye />
                      <span>View Details</span>
                      <FaArrowLeft className="rotate-180 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredData.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="text-6xl text-gray-600 mb-4 animate-bounce">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No destinations found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search terms or filters to find more destinations.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterBy("all");
                setSortBy("name");
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Back Button */}
        <div className={`text-center transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link
            to="/"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Go Back Home</span>
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border border-gray-800 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 border border-gray-700 rounded-lg opacity-15 rotate-45 animate-spin-slow"></div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default AllTouristSpots;
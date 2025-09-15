import { Link, useLoaderData, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
  FaMapMarkerAlt, 
  FaStar, 
  FaCalendarAlt,
  FaClock,
  FaDollarSign,
  FaUsers,
  FaHeart,
  FaShare,
  FaCamera,
  FaArrowLeft,
  FaBookmark,
  FaSun,
  FaPlane,
  FaHotel,
  FaCar,
  FaUmbrella,
  FaGlobe,
  FaPhone,
  FaEnvelope,
  FaFlag,
  FaEye
} from "react-icons/fa";
import Loader from "../CustomHooks/Loader";

const TouristSpot = () => {
  const { _id } = useParams();
  const loadedData = useLoaderData();
  
  // State
  const [spotData, setSpotData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Find spot data
  useEffect(() => {
    const spot = loadedData.find((place) => place._id === _id);
    setSpotData(spot);
    setLoading(false);
    setTimeout(() => setIsLoaded(true), 200);
  }, [loadedData, _id]);

  // Toggle favorite
  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  // Toggle bookmark
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  // Share function
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: spotData.spot,
        text: `Check out ${spotData.spot} - an amazing destination!`,
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
        className={`${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-600'} text-lg transition-colors duration-200`}
      />
    ));
  };

  if (loading) {
    return <Loader>Loading spot data...</Loader>;
  }

  if (!spotData) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center text-white animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">Destination Not Found</h2>
          <p className="text-gray-400 mb-6">The requested destination could not be found.</p>
          <Link
            to="/AllTouristSpots"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 hover:scale-105"
          >
            Browse All Destinations
          </Link>
        </div>
      </div>
    );
  }

  const stats = [
    { icon: FaDollarSign, label: "Average Cost", value: spotData.average_cost, color: "text-green-400" },
    { icon: FaUsers, label: "Annual Visitors", value: spotData.totalVisitorsPerYear || "500K+", color: "text-blue-400" },
    { icon: FaClock, label: "Travel Time", value: spotData.travel_time, color: "text-purple-400" },
    { icon: FaSun, label: "Best Season", value: spotData.seasonality, color: "text-yellow-400" }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaGlobe },
    { id: 'details', label: 'Details', icon: FaMapMarkerAlt },
    { id: 'booking', label: 'Booking', icon: FaPlane }
  ];

  // Mock additional images
  const images = [
    spotData.image,
    spotData.image,
    spotData.image
  ];

  return (
    <section className="relative w-full min-h-screen bg-slate-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-10 gap-8 h-full">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="border-r border-gray-700 h-full" />
          ))}
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-3 h-3 bg-white rounded-full animate-float ${
              i % 3 === 0 ? 'opacity-40' : i % 3 === 1 ? 'opacity-25' : 'opacity-15'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${12 + Math.random() * 8}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className={`text-center mb-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <FaFlag className="text-blue-400" />
            <span className="text-gray-300">{spotData.country}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight animate-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {spotData.spot}
          </h1>
          
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-blue-400" />
              <span className="text-gray-300">{spotData.country}</span>
            </div>
            <div className="flex items-center space-x-1">
              {generateStars(spotData.rating || 4.5)}
              <span className="text-gray-300 ml-2">({(spotData.rating || 4.5).toFixed(1)}/5)</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <button
              onClick={toggleFavorite}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-300 hover:scale-105 ${
                isFavorited 
                  ? 'bg-red-500 border-red-500 text-white animate-pulse' 
                  : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-red-500 hover:text-red-500'
              }`}
            >
              <FaHeart className={`transition-transform duration-300 ${isFavorited ? 'animate-bounce' : ''}`} />
              <span>{isFavorited ? 'Favorited' : 'Add to Favorites'}</span>
            </button>

            <button
              onClick={toggleBookmark}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-300 hover:scale-105 ${
                isBookmarked 
                  ? 'bg-blue-500 border-blue-500 text-white animate-pulse' 
                  : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-blue-500 hover:text-blue-500'
              }`}
            >
              <FaBookmark className={`transition-transform duration-300 ${isBookmarked ? 'animate-bounce' : ''}`} />
              <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg hover:border-green-500 hover:text-green-500 transition-all duration-300 hover:scale-105"
            >
              <FaShare className="hover:animate-spin" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative group">
              <img
                src={images[currentImageIndex]}
                alt={spotData.spot}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
              
              {/* Image Navigation */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                        index === currentImageIndex 
                          ? 'bg-white scale-125 animate-pulse' 
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Photo Counter */}
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                <FaCamera className="inline mr-1" />
                {currentImageIndex + 1} / {images.length}
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                <FaEye className="text-white text-3xl animate-pulse" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`bg-gray-900/50 border border-gray-800 rounded-lg p-4 backdrop-blur-sm hover:border-gray-700 hover:scale-105 transition-all duration-300 animate-slide-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-3">
                    <stat.icon className={`text-2xl ${stat.color} animate-pulse`} />
                    <div>
                      <div className="text-white font-semibold">{stat.value}</div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-800">
              <div className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-3 border-b-2 transition-all duration-300 hover:scale-105 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-400 animate-pulse'
                        : 'border-transparent text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    <tab.icon />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-64">
              {activeTab === 'overview' && (
                <div className="space-y-6 text-gray-300 animate-fade-in">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">About {spotData.spot}</h3>
                    <p className="leading-relaxed">
                      {spotData.description || `Discover the breathtaking beauty of ${spotData.spot}, located in ${spotData.country}. This magnificent destination offers an unforgettable experience for travelers seeking adventure, culture, and natural beauty. With its stunning landscapes and rich heritage, ${spotData.spot} promises memories that will last a lifetime.`}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 animate-slide-in-left">
                      <h4 className="font-semibold text-white">Highlights</h4>
                      <ul className="space-y-1 text-sm">
                        <li className="hover:text-blue-400 transition-colors duration-200">• Stunning natural landscapes</li>
                        <li className="hover:text-blue-400 transition-colors duration-200">• Rich cultural heritage</li>
                        <li className="hover:text-blue-400 transition-colors duration-200">• Perfect for photography</li>
                        <li className="hover:text-blue-400 transition-colors duration-200">• Family-friendly activities</li>
                      </ul>
                    </div>
                    <div className="space-y-2 animate-slide-in-right">
                      <h4 className="font-semibold text-white">What to Expect</h4>
                      <ul className="space-y-1 text-sm">
                        <li className="hover:text-green-400 transition-colors duration-200">• Professional guide services</li>
                        <li className="hover:text-green-400 transition-colors duration-200">• Safe and secure environment</li>
                        <li className="hover:text-green-400 transition-colors duration-200">• Multiple viewing points</li>
                        <li className="hover:text-green-400 transition-colors duration-200">• Local cuisine options</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                        <FaMapMarkerAlt className="text-blue-400" />
                        <div>
                          <div className="font-semibold text-white">Location</div>
                          <div className="text-sm">{spotData.country}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                        <FaSun className="text-yellow-400" />
                        <div>
                          <div className="font-semibold text-white">Best Time to Visit</div>
                          <div className="text-sm">{spotData.seasonality}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                        <FaClock className="text-purple-400" />
                        <div>
                          <div className="font-semibold text-white">Recommended Duration</div>
                          <div className="text-sm">{spotData.travel_time}</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                        <FaUsers className="text-green-400" />
                        <div>
                          <div className="font-semibold text-white">Annual Visitors</div>
                          <div className="text-sm">{spotData.totalVisitorsPerYear || "500,000+"}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                        <FaDollarSign className="text-green-400" />
                        <div>
                          <div className="font-semibold text-white">Average Cost</div>
                          <div className="text-sm">{spotData.average_cost}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                        <FaUmbrella className="text-blue-400" />
                        <div>
                          <div className="font-semibold text-white">Travel Insurance</div>
                          <div className="text-sm">Recommended</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'booking' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg p-6 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300">
                    <h3 className="text-xl font-bold text-white mb-4">Ready to Book Your Adventure?</h3>
                    <p className="text-gray-300 mb-6">
                      Book your trip to {spotData.spot} now and experience the adventure of a lifetime. 
                      Our professional team will ensure you have an unforgettable journey.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-blue-500 hover:scale-105 transition-all duration-300">
                        <FaPlane className="text-2xl text-blue-400 mx-auto mb-2 animate-bounce" />
                        <div className="text-white font-semibold">Flight Included</div>
                        <div className="text-gray-400 text-sm">Round trip</div>
                      </div>
                      
                      <div className="text-center p-4 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-green-500 hover:scale-105 transition-all duration-300">
                        <FaHotel className="text-2xl text-green-400 mx-auto mb-2 animate-bounce" style={{animationDelay: '0.2s'}} />
                        <div className="text-white font-semibold">Accommodation</div>
                        <div className="text-gray-400 text-sm">4-star hotels</div>
                      </div>
                      
                      <div className="text-center p-4 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-purple-500 hover:scale-105 transition-all duration-300">
                        <FaCar className="text-2xl text-purple-400 mx-auto mb-2 animate-bounce" style={{animationDelay: '0.4s'}} />
                        <div className="text-white font-semibold">Transportation</div>
                        <div className="text-gray-400 text-sm">Local transfers</div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400 mb-2 animate-pulse">{spotData.average_cost}</div>
                      <div className="text-gray-400 text-sm mb-6">per person (all inclusive)</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link
            to="/booking"
            state={{ spotData }}
            className="w-full sm:w-auto flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/30 group"
          >
            <FaCalendarAlt className="group-hover:animate-bounce" />
            <span>Book Now</span>
          </Link>

          <div className="flex space-x-4">
            <a
              href={`tel:+1234567890`}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white rounded-lg transition-all duration-300 hover:scale-105"
            >
              <FaPhone className="hover:animate-pulse" />
              <span>Call Us</span>
            </a>
            
            <a
              href={`mailto:info@travelmedia.com?subject=Inquiry about ${spotData.spot}`}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white rounded-lg transition-all duration-300 hover:scale-105"
            >
              <FaEnvelope className="hover:animate-pulse" />
              <span>Email</span>
            </a>
          </div>
        </div>

        {/* Back Button */}
        <div className={`text-center transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link
            to="/AllTouristSpots"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to All Destinations</span>
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border border-gray-700 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 border border-gray-600 rounded-lg opacity-15 rotate-45 animate-spin-slow"></div>

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
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
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
        
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
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
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default TouristSpot;
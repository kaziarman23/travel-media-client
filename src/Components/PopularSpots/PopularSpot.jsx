import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
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
  FaFlag
} from "react-icons/fa";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Loader from "../CustomHooks/Loader";

const PopularSpot = () => {
  const { popularSpots } = useContext(AuthContext);
  const { country, spot_id } = useParams();

  // State
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Refs for animations
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef([]);
  const tabsRef = useRef(null);
  const actionsRef = useRef(null);
  const backgroundRef = useRef(null);
  const floatingElementsRef = useRef([]);

  // Find data
  const countryData = popularSpots?.find((spot) => spot.name === country);
  const spotData = countryData?.plases?.find(
    (place) => place.spot_id === Number(spot_id)
  );

  // Check data availability
  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      if (!popularSpots || !popularSpots.length) {
        setLoading(false);
        return;
      }
      if (!countryData || !spotData) {
        setLoading(false);
        return;
      }
      setLoading(false);
    }, 500);
  }, [popularSpots, countryData, spotData]);

  // GSAP Animations
  useEffect(() => {
    if (!loading && spotData) {
      const ctx = gsap.context(() => {
        // Set initial states
        gsap.set([headerRef.current, imageRef.current, contentRef.current, tabsRef.current, actionsRef.current], {
          opacity: 0,
          y: 60,
          scale: 0.9
        });

        gsap.set(statsRef.current, {
          opacity: 0,
          x: -40,
          scale: 0.9
        });

        gsap.set(floatingElementsRef.current, {
          opacity: 0,
          scale: 0,
          rotation: 180
        });

        // Main timeline
        const tl = gsap.timeline({
          delay: 0.5
        });

        // Background animation
        tl.to(backgroundRef.current, {
          background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(15, 23, 42, 0.95) 100%)",
          duration: 1.5,
          ease: "power2.out"
        })
        // Header animation
        .to(headerRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)"
        }, "-=1")
        // Image animation with scale
        .to(imageRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "elastic.out(1, 0.6)"
        }, "-=0.5")
        // Content animation
        .to(contentRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.6")
        // Stats stagger
        .to(statsRef.current, {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }, "-=0.4")
        // Tabs animation
        .to(tabsRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)"
        }, "-=0.3")
        // Actions animation
        .to(actionsRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)"
        }, "-=0.2")
        // Floating elements
        .to(floatingElementsRef.current, {
          opacity: 0.6,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.5)"
        }, "-=0.5");

        // Floating elements continuous animation
        floatingElementsRef.current.forEach((element, index) => {
          if (element) {
            gsap.to(element, {
              y: "random(-30, 30)",
              x: "random(-25, 25)",
              rotation: "random(-360, 360)",
              duration: "random(12, 20)",
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: index * 0.6
            });
          }
        });

      }, sectionRef);

      return () => ctx.revert();
    }
  }, [loading, spotData]);

  // Toggle favorite
  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    gsap.to(".heart-icon", {
      scale: 1.3,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.out"
    });
  };

  // Toggle bookmark
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    gsap.to(".bookmark-icon", {
      scale: 1.3,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.out"
    });
  };

  // Share function
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: spotData.spot,
        text: `Check out ${spotData.spot} - an amazing destination in ${country}!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
    gsap.to(".share-icon", {
      scale: 1.3,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.out"
    });
  };

  // Generate star rating
  const generateStars = (rating = 4.5) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-600'} text-lg`}
      />
    ));
  };

  // Loading state
  if (loading) {
    return <Loader>Loading popular spot data...</Loader>;
  }

  // Error states
  if (!popularSpots || !popularSpots.length) {
    return <Loader>Loading spot data...</Loader>;
  }

  if (!countryData) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Country Not Found</h2>
          <p className="text-gray-400 mb-6">The requested country data could not be found.</p>
          <Link
            to="/PopularSpots"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300"
          >
            Browse All Countries
          </Link>
        </div>
      </div>
    );
  }

  if (!spotData) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Spot Not Found</h2>
          <p className="text-gray-400 mb-6">The requested spot data could not be found.</p>
          <Link
            to={`/popularSpots/${country}`}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300"
          >
            Back to {country}
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
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden py-8"
    >
      {/* Animated Background */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-slate-900"
      />

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
            ref={el => floatingElementsRef.current[i] = el}
            className={`absolute w-3 h-3 bg-white rounded-full ${
              i % 3 === 0 ? 'opacity-40' : i % 3 === 1 ? 'opacity-25' : 'opacity-15'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div 
          ref={headerRef}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <FaFlag className="text-blue-400" />
            <span className="text-gray-300">{country}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
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
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                isFavorited 
                  ? 'bg-red-500 border-red-500 text-white' 
                  : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-red-500 hover:text-red-500'
              }`}
            >
              <FaHeart className="heart-icon" />
              <span>{isFavorited ? 'Favorited' : 'Add to Favorites'}</span>
            </button>

            <button
              onClick={toggleBookmark}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                isBookmarked 
                  ? 'bg-blue-500 border-blue-500 text-white' 
                  : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-blue-500 hover:text-blue-500'
              }`}
            >
              <FaBookmark className="bookmark-icon" />
              <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg hover:border-green-500 hover:text-green-500 transition-all duration-300"
            >
              <FaShare className="share-icon" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Image Gallery */}
          <div 
            ref={imageRef}
            className="space-y-4"
          >
            <div className="relative group">
              <img
                src={images[currentImageIndex]}
                alt={spotData.spot}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
              
              {/* Image Navigation */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentImageIndex 
                          ? 'bg-white scale-125' 
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
            </div>
          </div>

          {/* Content */}
          <div 
            ref={contentRef}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  ref={el => statsRef.current[index] = el}
                  className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 backdrop-blur-sm hover:border-gray-700 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <stat.icon className={`text-2xl ${stat.color}`} />
                    <div>
                      <div className="text-white font-semibold">{stat.value}</div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div 
              ref={tabsRef}
              className="border-b border-gray-800"
            >
              <div className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-3 border-b-2 transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-400'
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
                <div className="space-y-6 text-gray-300">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">About {spotData.spot}</h3>
                    <p className="leading-relaxed">
                      {spotData.description || `Discover the breathtaking beauty of ${spotData.spot}, a stunning destination in ${spotData.country}. This magnificent location offers an unforgettable experience for travelers seeking adventure, culture, and natural beauty. With its unique charm and rich heritage, ${spotData.spot} promises memories that will last a lifetime.`}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-white">Highlights</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Stunning natural landscapes</li>
                        <li>• Rich cultural heritage</li>
                        <li>• Perfect for photography</li>
                        <li>• Popular tourist destination</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-white">What to Expect</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Guided tour options</li>
                        <li>• Safe travel environment</li>
                        <li>• Multiple viewpoints</li>
                        <li>• Local cuisine nearby</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <FaMapMarkerAlt className="text-blue-400" />
                        <div>
                          <div className="font-semibold text-white">Location</div>
                          <div className="text-sm">{spotData.country}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <FaSun className="text-yellow-400" />
                        <div>
                          <div className="font-semibold text-white">Best Time to Visit</div>
                          <div className="text-sm">{spotData.seasonality}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <FaClock className="text-purple-400" />
                        <div>
                          <div className="font-semibold text-white">Recommended Duration</div>
                          <div className="text-sm">{spotData.travel_time}</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <FaUsers className="text-green-400" />
                        <div>
                          <div className="font-semibold text-white">Annual Visitors</div>
                          <div className="text-sm">{spotData.totalVisitorsPerYear || "250,000+"}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <FaDollarSign className="text-green-400" />
                        <div>
                          <div className="font-semibold text-white">Average Cost</div>
                          <div className="text-sm">{spotData.average_cost}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
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
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Ready to Book Your Adventure?</h3>
                    <p className="text-gray-300 mb-6">
                      Book your trip to {spotData.spot} now and experience this amazing destination in {country}. 
                      Our team will ensure you have an unforgettable journey.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
                        <FaPlane className="text-2xl text-blue-400 mx-auto mb-2" />
                        <div className="text-white font-semibold">Flight Included</div>
                        <div className="text-gray-400 text-sm">Round trip</div>
                      </div>
                      
                      <div className="text-center p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
                        <FaHotel className="text-2xl text-green-400 mx-auto mb-2" />
                        <div className="text-white font-semibold">Accommodation</div>
                        <div className="text-gray-400 text-sm">Quality hotels</div>
                      </div>
                      
                      <div className="text-center p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
                        <FaCar className="text-2xl text-purple-400 mx-auto mb-2" />
                        <div className="text-white font-semibold">Transportation</div>
                        <div className="text-gray-400 text-sm">Local transfers</div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400 mb-2">{spotData.average_cost}</div>
                      <div className="text-gray-400 text-sm mb-6">per person (all inclusive)</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div 
          ref={actionsRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link
            to="/booking"
            state={{ spotData }}
            className="w-full sm:w-auto flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <FaCalendarAlt />
            <span>Book Now</span>
          </Link>

          <div className="flex space-x-4">
            <a
              href={`tel:+1234567890`}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white rounded-lg transition-all duration-300"
            >
              <FaPhone />
              <span>Call Us</span>
            </a>
            
            <a
              href={`mailto:info@travelmedia.com?subject=Inquiry about ${spotData.spot}`}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white rounded-lg transition-all duration-300"
            >
              <FaEnvelope />
              <span>Email</span>
            </a>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link
            to={`/popularSpots/${country}`}
            className="inline-flex items-center space-x-3 px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <FaArrowLeft />
            <span>Back to {country}</span>
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border border-gray-700 rounded-full opacity-20" />
      <div className="absolute bottom-20 left-20 w-24 h-24 border border-gray-600 rounded-lg opacity-15 rotate-45" />
    </section>
  );
};

export default PopularSpot;
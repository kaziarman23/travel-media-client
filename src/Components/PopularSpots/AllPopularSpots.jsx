import { useContext, useEffect, useState, useRef } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  FaGlobe,
  FaCamera,
  FaShare,
  FaBookmark
} from "react-icons/fa";
import Loader from "../CustomHooks/Loader";
import { AuthContext } from "../../AuthProvider/AuthProvider";

gsap.registerPlugin(ScrollTrigger);

const AllPopularSpots = () => {
  const { country } = useParams();
  const loadedData = useLoaderData();
  
  // State
  const [loading, setLoading] = useState(true);
  const [filteredSpots, setFilteredSpots] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");
  const [favoritePlaces, setFavoritePlaces] = useState(new Set());
  const [hoveredCard, setHoveredCard] = useState(null);

  const { popularSpots, setPopularSpots } = useContext(AuthContext);

  // Refs for animations
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const countryInfoRef = useRef(null);
  const filtersRef = useRef(null);
  const cardsRef = useRef([]);
  const backButtonRef = useRef(null);
  const backgroundRef = useRef(null);
  const floatingElementsRef = useRef([]);
  const statsRef = useRef([]);

  // Filter and search data
  useEffect(() => {
    const currentData = loadedData.filter((spot) => spot.name === country);
    setPopularSpots(currentData);
    
    if (currentData.length > 0 && currentData[0].plases) {
      let filtered = [...currentData[0].plases];

      // Search filter
      if (searchTerm) {
        filtered = filtered.filter(place =>
          place.spot.toLowerCase().includes(searchTerm.toLowerCase()) ||
          place.country.toLowerCase().includes(searchTerm.toLowerCase())
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
          default:
            return 0;
        }
      });

      setFilteredSpots(filtered);
    }
    
    setLoading(false);
  }, [loadedData, country, setPopularSpots, searchTerm, sortBy]);

  // GSAP Animations
  useEffect(() => {
    if (!loading && popularSpots.length > 0) {
      const ctx = gsap.context(() => {
        // Set initial states
        gsap.set([titleRef.current, descriptionRef.current, countryInfoRef.current, filtersRef.current, backButtonRef.current], {
          opacity: 0,
          y: 60,
          scale: 0.9
        });

        gsap.set(cardsRef.current, {
          opacity: 0,
          y: 100,
          scale: 0.8,
          rotation: 5
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
          delay: 0.3
        });

        // Background animation
        tl.to(backgroundRef.current, {
          background: "linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(15, 23, 42, 0.9) 50%, rgba(0, 0, 0, 0.95) 100%)",
          duration: 1.5,
          ease: "power2.out"
        })
        // Header animations
        .to(titleRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)"
        }, "-=1")
        .to(descriptionRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.4")
        .to(countryInfoRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)"
        }, "-=0.3")
        .to(statsRef.current, {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }, "-=0.3")
        .to(filtersRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)"
        }, "-=0.3")
        .to(cardsRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "elastic.out(1, 0.6)"
        }, "-=0.4")
        .to(floatingElementsRef.current, {
          opacity: 0.6,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.5)"
        }, "-=0.6")
        .to(backButtonRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)"
        }, "-=0.2");

        // Floating elements animation
        floatingElementsRef.current.forEach((element, index) => {
          if (element) {
            gsap.to(element, {
              y: "random(-30, 30)",
              x: "random(-25, 25)",
              rotation: "random(-360, 360)",
              duration: "random(10, 18)",
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: index * 0.5
            });
          }
        });

        // Parallax effect
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.to(cardsRef.current, {
              y: progress * -20,
              duration: 0.3,
              ease: "none"
            });
          }
        });

      }, sectionRef);

      return () => ctx.revert();
    }
  }, [loading, popularSpots]);

  // Card hover animations
  const handleCardHover = (cardElement, isHover, index) => {
    setHoveredCard(isHover ? index : null);
    
    const tl = gsap.timeline();
    
    if (isHover) {
      tl.to(cardElement, {
        scale: 1.05,
        y: -10,
        rotationY: 5,
        boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.3)",
        duration: 0.4,
        ease: "power2.out"
      })
      .to(cardElement.querySelector('.card-image'), {
        scale: 1.1,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
      .to(cardElement.querySelector('.card-overlay'), {
        opacity: 0.8,
        duration: 0.3,
        ease: "power2.out"
      }, "-=0.6")
      .to(cardElement.querySelector('.card-actions'), {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "back.out(1.7)"
      }, "-=0.2");
    } else {
      tl.to(cardElement, {
        scale: 1,
        y: 0,
        rotationY: 0,
        boxShadow: "0 10px 25px -3px rgba(0, 0, 0, 0.3)",
        duration: 0.4,
        ease: "power2.out"
      })
      .to(cardElement.querySelector('.card-image'), {
        scale: 1,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
      .to(cardElement.querySelector('.card-overlay'), {
        opacity: 0.6,
        duration: 0.3,
        ease: "power2.out"
      }, "-=0.6")
      .to(cardElement.querySelector('.card-actions'), {
        opacity: 0,
        y: 10,
        duration: 0.2,
        ease: "power2.in"
      }, "-=0.4");
    }
  };

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

  // Generate star rating
  const generateStars = (rating = 4.5) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-600'} text-sm`}
      />
    ));
  };

  // Share function
  const handleShare = (spot) => {
    if (navigator.share) {
      navigator.share({
        title: spot.spot,
        text: `Check out ${spot.spot} - an amazing destination in ${country}!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading || !popularSpots.length) {
    return <Loader>Loading popular spots...</Loader>;
  }

  const countryData = popularSpots[0];
  const spots = filteredSpots;

  // Stats data
  const stats = [
    { icon: FaMapMarkerAlt, number: spots.length, label: "Popular Spots", color: "text-blue-400" },
    { icon: FaUsers, number: "1M+", label: "Annual Visitors", color: "text-green-400" },
    { icon: FaStar, number: "4.8", label: "Avg Rating", color: "text-yellow-400" },
    { icon: FaGlobe, number: country, label: "Country", color: "text-purple-400" }
  ];

  const sortOptions = [
    { value: "name", label: "Name" },
    { value: "price", label: "Price" },
    { value: "rating", label: "Rating" }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden py-20"
    >
      {/* Animated Background */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-black"
      />

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
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            ref={el => floatingElementsRef.current[i] = el}
            className={`absolute w-2 h-2 bg-white rounded-full ${
              i % 4 === 0 ? 'opacity-40' : i % 4 === 1 ? 'opacity-25' : i % 4 === 2 ? 'opacity-15' : 'opacity-10'
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
        <div className="text-center mb-16">
          <h1 
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            {countryData.title}
          </h1>
          
          <div className="max-w-4xl mx-auto mb-8">
            <p 
              ref={descriptionRef}
              className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6"
            >
              {countryData.description}
            </p>
            
            <h2 
              ref={countryInfoRef}
              className="text-2xl md:text-3xl font-bold text-white mb-4"
            >
              Popular Tourist Spots in 
              <span className="block mt-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {countryData.name}
              </span>
            </h2>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                ref={el => statsRef.current[index] = el}
                className="flex items-center justify-center space-x-3 p-4 bg-gray-900/50 border border-gray-800 rounded-lg backdrop-blur-sm"
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
        <div 
          ref={filtersRef}
          className="mb-12 space-y-6"
        >
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search spots..."
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
                      ? 'bg-blue-600 text-white' 
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
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
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
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      Sort by {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center text-gray-400 text-sm">
            Showing {spots.length} popular destinations in {country}
          </div>
        </div>

        {/* Tourist Spots Grid */}
        <div className={`grid gap-8 mb-16 ${
          viewMode === "grid" 
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1"
        }`}>
          {spots.map((place, index) => (
            <div
              key={place.spot_id || index}
              ref={el => cardsRef.current[index] = el}
              className="group cursor-pointer perspective-1000"
              onMouseEnter={(e) => handleCardHover(e.currentTarget, true, index)}
              onMouseLeave={(e) => handleCardHover(e.currentTarget, false, index)}
            >
              <div className={`relative bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl hover:border-gray-600 transition-all duration-500 transform-gpu ${
                viewMode === "list" ? "flex" : ""
              }`}>
                {/* Image Container */}
                <div className={`relative overflow-hidden ${
                  viewMode === "list" ? "w-80 h-48" : "h-64"
                }`}>
                  <img
                    src={place.image}
                    alt={place.spot}
                    className="card-image w-full h-full object-cover transition-transform duration-700"
                  />
                  <div className="card-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300" />
                  
                  {/* Hover Actions */}
                  <div className="card-actions absolute top-4 right-4 space-y-2 opacity-0 translate-y-2 transition-all duration-300">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(place.spot_id);
                      }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${
                        favoritePlaces.has(place.spot_id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/20 text-white hover:bg-red-500'
                      }`}
                    >
                      <FaHeart />
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleShare(place);
                      }}
                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-green-500 transition-all duration-300"
                    >
                      <FaShare />
                    </button>
                    
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                      <FaCamera />
                    </div>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                      <div className="flex space-x-1">
                        {generateStars(place.rating || 4.5)}
                      </div>
                      <span className="text-white text-sm font-medium ml-2">
                        {(place.rating || 4.5).toFixed(1)}
                      </span>
                    </div>
                  </div>

                  {/* Price Tag */}
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {place.average_cost}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`p-6 space-y-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                      {place.spot}
                    </h3>
                    <div className="flex items-center space-x-2 text-gray-400 mb-3">
                      <FaMapMarkerAlt className="text-blue-400 text-sm" />
                      <span className="text-sm">{place.country}</span>
                    </div>
                    {place.description && (
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
                        {place.description}
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700">
                      <FaDollarSign className="inline mr-1" />
                      {place.average_cost}
                    </span>
                    <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700">
                      Popular Destination
                    </span>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 border-t border-gray-800">
                    <Link
                      to={`/popularSpots/${place.country}/popularSpot/${place.spot_id}`}
                      className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <FaEye />
                      <span>View Details</span>
                    </Link>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {spots.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl text-gray-600 mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No spots found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search terms to find more destinations.
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Back Button */}
        <div 
          ref={backButtonRef}
          className="text-center"
        >
          <Link
            to="/PopularSpots"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <FaArrowLeft />
            <span>Back to All Countries</span>
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border border-gray-800 rounded-full opacity-20" />
      <div className="absolute bottom-20 left-20 w-24 h-24 border border-gray-700 rounded-lg opacity-15 rotate-45" />
    </section>
  );
};

export default AllPopularSpots;
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { 
  FaGlobe, 
  FaCompass, 
  FaMapMarkerAlt, 
  FaStar,
  FaUsers,
  FaCamera,
  FaArrowDown,
  FaPlay,
  FaPause
} from "react-icons/fa";
import FlatEarth from "../CustomHooks/FlatEarth";
import CountryCards from "./CountryCards";

const PopularSpots = () => {
  // Refs for animations
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const globeRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const statsRef = useRef([]);
  const scrollIndicatorRef = useRef(null);
  const backgroundRef = useRef(null);
  const floatingElementsRef = useRef([]);
  const countriesRef = useRef(null);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, descriptionRef.current, scrollIndicatorRef.current], {
        opacity: 0,
        y: 60,
        scale: 0.9
      });

      gsap.set(globeRef.current, {
        opacity: 0,
        scale: 0.8,
        rotation: -10
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

      gsap.set(countriesRef.current, {
        opacity: 0,
        y: 100
      });

      // Main timeline - triggers automatically
      const tl = gsap.timeline({
        delay: 0.5
      });

      // Background animation
      tl.to(backgroundRef.current, {
        background: "linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 30, 48, 0.8) 50%, rgba(36, 59, 85, 0.9) 100%)",
        duration: 2,
        ease: "power2.out"
      })
      // Globe animation
      .to(globeRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.6)"
      }, "-=1.5")
      // Title animation
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.8")
      // Description animation
      .to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
      // Stats animation
      .to(statsRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.3")
      // Scroll indicator
      .to(scrollIndicatorRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
      }, "-=0.2")
      // Countries section
      .to(countriesRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.1")
      // Floating elements
      .to(floatingElementsRef.current, {
        opacity: 0.4,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.5)"
      }, "-=1");

      // Floating elements continuous animation
      floatingElementsRef.current.forEach((element, index) => {
        if (element) {
          gsap.to(element, {
            y: "random(-40, 40)",
            x: "random(-30, 30)",
            rotation: "random(-360, 360)",
            duration: "random(10, 20)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.3
          });
        }
      });

      // Scroll indicator bounce animation
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: 2
      });

      // Globe rotation animation
      gsap.to(globeRef.current, {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: "none"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Stats data
  const stats = [
    { icon: FaGlobe, number: "195", label: "Countries", color: "text-blue-400" },
    { icon: FaMapMarkerAlt, number: "2K+", label: "Destinations", color: "text-green-400" },
    { icon: FaUsers, number: "1M+", label: "Happy Travelers", color: "text-purple-400" },
    { icon: FaStar, number: "4.9", label: "Average Rating", color: "text-yellow-400" }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen"
    >
      {/* Animated Background */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-black"
      />

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
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            ref={el => floatingElementsRef.current[i] = el}
            className={`absolute w-2 h-2 bg-white rounded-full ${
              i % 4 === 0 ? 'opacity-30' : i % 4 === 1 ? 'opacity-20' : i % 4 === 2 ? 'opacity-15' : 'opacity-10'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="relative z-10 w-full min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div 
            ref={heroRef}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Globe Section */}
            <div className="flex justify-center items-center">
              <div 
                ref={globeRef}
                className="relative w-full max-w-md aspect-square"
              >
                {/* Globe Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
                
                {/* Globe Container */}
                <div className="relative w-full h-full bg-gray-900/50 border border-gray-700 rounded-full backdrop-blur-sm overflow-hidden">
                  <FlatEarth />
                  
                  {/* Orbit Rings */}
                  <div className="absolute inset-4 border border-blue-400/30 rounded-full animate-pulse"></div>
                  <div className="absolute inset-8 border border-purple-400/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  
                  {/* Floating Icons */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500/80 rounded-full flex items-center justify-center">
                    <FaCamera className="text-white text-sm" />
                  </div>
                  <div className="absolute bottom-8 left-8 w-8 h-8 bg-green-500/80 rounded-full flex items-center justify-center">
                    <FaCompass className="text-white text-sm" />
                  </div>
                  <div className="absolute top-1/2 left-4 w-8 h-8 bg-purple-500/80 rounded-full flex items-center justify-center">
                    <FaMapMarkerAlt className="text-white text-sm" />
                  </div>
                </div>

                {/* Pulsing Effect */}
                <div className="absolute inset-0 border-2 border-blue-400/50 rounded-full animate-ping"></div>
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-8 text-white">
              <div>
                <h1 
                  ref={titleRef}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
                >
                  Discover Your Next
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Adventure
                  </span>
                  <span className="block text-3xl md:text-4xl lg:text-5xl mt-2">
                    with Travel Media
                  </span>
                </h1>
                
                <p 
                  ref={descriptionRef}
                  className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl"
                >
                  We're passionate about turning your travel dreams into reality. Whether you're seeking 
                  a tranquil getaway, a thrilling adventure, or a cultural deep dive, our expert team 
                  crafts unforgettable experiences tailored to your desires.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    ref={el => statsRef.current[index] = el}
                    className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 backdrop-blur-sm hover:border-gray-700 hover:bg-gray-900/70 transition-all duration-300 group"
                  >
                    <div className="flex flex-col items-center text-center space-y-2">
                      <stat.icon className={`text-2xl ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                      <div className={`text-xl font-bold ${stat.color}`}>
                        {stat.number}
                      </div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <FaGlobe className="text-white text-sm" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Global Reach</div>
                    <div className="text-gray-400 text-sm">Worldwide destinations</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <FaStar className="text-white text-sm" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Expert Service</div>
                    <div className="text-gray-400 text-sm">5-star experience</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <FaUsers className="text-white text-sm" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Personalized</div>
                    <div className="text-gray-400 text-sm">Tailored journeys</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div 
            ref={scrollIndicatorRef}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 text-white/60"
          >
            <span className="text-sm font-medium">Explore Destinations</span>
            <div className="w-6 h-10 border border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
            </div>
            <FaArrowDown className="text-sm animate-bounce" />
          </div>
        </div>
      </div>

      {/* Countries Section */}
      <div 
        ref={countriesRef}
        className="relative z-10 bg-gradient-to-r from-[#141E30] to-[#243B55] py-20"
      >
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Popular 
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {" "}Destinations
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              From pristine beaches to bustling city escapes, we connect you with the world's 
              most iconic destinations and hidden gems. Your perfect vacation is just a click away.
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-blue-400"></div>
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></div>
              <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
              <div className="w-12 h-0.5 bg-gradient-to-r from-purple-400 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Countries Cards */}
        <div className="relative">
          {/* Background Pattern for Countries Section */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-8 gap-6 h-full">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="border-r border-gray-600 h-full" />
              ))}
            </div>
          </div>
          
          <CountryCards />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border border-gray-800 rounded-full opacity-20"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 border border-gray-700 rounded-lg opacity-15 rotate-45"></div>
      
      {/* Additional Floating Decorations */}
      <div className="absolute top-1/4 left-10 w-4 h-4 bg-blue-500/30 rounded-full animate-pulse"></div>
      <div className="absolute top-3/4 right-16 w-3 h-3 bg-purple-500/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-green-500/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default PopularSpots;
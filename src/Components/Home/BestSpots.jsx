import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaArrowRight,
  FaMapMarkerAlt,
  FaStar,
  FaHeart,
  FaPlay,
  FaPause,
  FaEye,
} from "react-icons/fa";
import { useGetBestSpotsQuery } from "../../Redux/features/api/bestSpotsApi";
import Loader from "../CustomHooks/Loader";

gsap.registerPlugin(ScrollTrigger);

const BestSpots = () => {
  // State
  const [isPlaying, setIsPlaying] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  // RTK Query
  const {
    data: cards = [],
    isLoading,
    isError,
    error,
  } = useGetBestSpotsQuery();

  // Refs for animations
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardsRef = useRef([]);
  const backgroundRef = useRef(null);
  const floatingElementsRef = useRef([]);

  // GSAP Animations
  useEffect(() => {
    if (!cards || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, descriptionRef.current, ctaRef.current], {
        opacity: 0,
        y: 60,
        scale: 0.9,
      });

      gsap.set(cardsContainerRef.current, {
        opacity: 0,
        y: 40,
      });

      gsap.set(floatingElementsRef.current, {
        opacity: 0,
        scale: 0,
        rotation: 180,
      });

      // Main timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Background animation
      tl.to(backgroundRef.current, {
        background:
          "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(15, 23, 42, 0.95) 100%)",
        duration: 1,
        ease: "power2.out",
      })
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.7"
        )
        .to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        )
        .to(
          cardsContainerRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.2"
        )
        .to(
          floatingElementsRef.current,
          {
            opacity: 0.4,
            scale: 1,
            rotation: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.5)",
          },
          "-=0.5"
        );

      // Auto-scroll animation for cards
      if (cards.length > 0) {
        const scrollAnimation = gsap.to(cardsRef.current, {
          x: () => -(cardsRef.current.length * 320 + 100),
          duration: cards.length * 8,
          ease: "none",
          repeat: -1,
          paused: !isPlaying,
        });

        return () => scrollAnimation.kill();
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [cards, isPlaying]);

  // Card animations
  useEffect(() => {
    if (!cards || cards.length === 0) return;

    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });
  }, [cards]);

  // Button hover animation
  const handleButtonHover = (element, isHover) => {
    gsap.to(element, {
      scale: isHover ? 1.05 : 1,
      y: isHover ? -2 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  // Card hover animation
  const handleCardHover = (cardElement, isHover, index) => {
    setHoveredCard(isHover ? index : null);

    gsap.to(cardElement, {
      scale: isHover ? 1.05 : 1,
      y: isHover ? -10 : 0,
      duration: 0.4,
      ease: "power2.out",
    });

    const image = cardElement.querySelector(".card-image");
    const overlay = cardElement.querySelector(".card-overlay");

    if (image && overlay) {
      gsap.to(image, {
        scale: isHover ? 1.1 : 1,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.to(overlay, {
        opacity: isHover ? 0.8 : 0.6,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  // Toggle auto-scroll
  const toggleAutoScroll = () => {
    setIsPlaying(!isPlaying);
  };

  if (isLoading) {
    <Loader>Loading data...</Loader>;
  }

  if (isError) {
    console.log("something went wrong when fetching best spot data: ", error);
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden py-20"
    >
      {/* Animated Background */}
      <div ref={backgroundRef} className="absolute inset-0 bg-slate-900" />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-10 gap-4 h-full">
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
            ref={(el) => (floatingElementsRef.current[i] = el)}
            className={`absolute w-2 h-2 bg-white rounded-full ${
              i % 4 === 0
                ? "opacity-40"
                : i % 4 === 1
                ? "opacity-25"
                : i % 4 === 2
                ? "opacity-15"
                : "opacity-10"
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
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Discover the World&#39;s
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Hidden Treasures
            </span>
          </h2>

          <div className="max-w-4xl mx-auto space-y-6">
            <p
              ref={descriptionRef}
              className="text-lg md:text-xl text-gray-300 leading-relaxed"
            >
              At Travel Media, we believe that every journey should be an
              unforgettable adventure. Our mission is to connect you with the
              most breathtaking and culturally rich destinations across the
              globe.
            </p>

            <p className="text-gray-400 leading-relaxed">
              Whether you&#39;re seeking serene beaches, bustling cities, or
              off-the-beaten-path wonders, we curate experiences tailored to
              your unique travel dreams.
            </p>
          </div>

          {/* CTA Section */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          >
            <Link
              to="/PopularSpots"
              className="group flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg"
              onMouseEnter={(e) => handleButtonHover(e.target, true)}
              onMouseLeave={(e) => handleButtonHover(e.target, false)}
            >
              <span>View All Tourist Spots</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            <button
              onClick={toggleAutoScroll}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white rounded-lg transition-all duration-300"
              onMouseEnter={(e) => handleButtonHover(e.target, true)}
              onMouseLeave={(e) => handleButtonHover(e.target, false)}
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
              <span>{isPlaying ? "Pause" : "Play"} Slideshow</span>
            </button>
          </div>
        </div>

        {/* Cards Carousel */}
        <div ref={cardsContainerRef} className="relative overflow-hidden py-8">
          {cards.length > 0 ? (
            <div
              className="flex flex-nowrap gap-6"
              style={{ whiteSpace: "nowrap" }}
            >
              {/* Duplicate cards for seamless loop */}
              {[...cards, ...cards].map((card, index) => (
                <div
                  key={card._id + "-" + index}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="flex-shrink-0 w-80 group cursor-pointer"
                  onMouseEnter={(e) =>
                    handleCardHover(e.currentTarget, true, index)
                  }
                  onMouseLeave={(e) =>
                    handleCardHover(e.currentTarget, false, index)
                  }
                >
                  <div className="flex flex-col h-full relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 hover:border-gray-600 transition-all duration-500">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden flex-shrink-0">
                      <img
                        src={card.img}
                        alt={card.title}
                        className="card-image w-full h-full object-cover transition-transform duration-700"
                      />
                      <div className="card-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300" />

                      {/* Hover Overlay */}
                      <div
                        className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
                          hoveredCard === index ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <div className="absolute top-4 right-4">
                          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <FaEye className="text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Rating Badge */}
                      <div className="absolute top-4 left-4">
                        <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                          <FaStar className="text-yellow-400 text-sm" />
                          <span className="text-white text-sm font-medium">
                            4.8
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                          {card.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                          {card.description}
                        </p>
                      </div>

                      {/* Location */}
                      <div className="flex items-center space-x-2 text-gray-500">
                        <FaMapMarkerAlt className="text-blue-400" />
                        <span className="text-sm">
                          {card.location || "Exotic Location"}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                        <div className="flex items-center space-x-4">
                          <button className="text-gray-400 hover:text-red-500 transition-colors duration-200">
                            <FaHeart />
                          </button>
                          <span className="text-gray-500 text-sm">
                            256 likes
                          </span>
                        </div>

                        <Link
                          to={`/alltouristspots/touristspot/${card._id}`}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
                        >
                          Explore
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-gray-400">Loading amazing destinations...</p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-8 border-t border-gray-800">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-1">150+</div>
            <div className="text-gray-400 text-sm">Destinations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">50K+</div>
            <div className="text-gray-400 text-sm">Happy Travelers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-1">4.9</div>
            <div className="text-gray-400 text-sm">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-1">24/7</div>
            <div className="text-gray-400 text-sm">Support</div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 border border-gray-700 rounded-full opacity-20" />
      <div className="absolute bottom-20 right-20 w-24 h-24 border border-gray-600 rounded-lg opacity-15 rotate-45" />
    </section>
  );
};

export default BestSpots;

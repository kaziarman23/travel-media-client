import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaStar,
  FaQuoteLeft,
  FaQuoteRight,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaThumbsUp,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { useGetReviewsQuery } from "../../Redux/features/api/reviewsApi";

gsap.registerPlugin(ScrollTrigger);

const Review = () => {
  // Redux RTK Query
  const {
    data: reviews = [],
    isLoading,
    isError,
    error,
  } = useGetReviewsQuery();

  // State for current featured review
  const [currentIndex, setCurrentIndex] = useState(0);

  // Refs for animations
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const cardsRef = useRef([]);
  const backgroundRef = useRef(null);
  const floatingElementsRef = useRef([]);
  const statsRef = useRef([]);
  const controlsRef = useRef(null);

  // GSAP Animations
  useEffect(() => {
    if (reviews.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(
        [titleRef.current, descriptionRef.current, controlsRef.current],
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
        }
      );

      gsap.set(cardsRef.current, {
        opacity: 0,
        y: 100,
        scale: 0.8,
        rotationX: 30,
      });

      gsap.set(statsRef.current, {
        opacity: 0,
        x: -40,
        scale: 0.9,
      });

      gsap.set(floatingElementsRef.current, {
        opacity: 0,
        scale: 0,
        rotation: 180,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(backgroundRef.current, {
        background:
          "linear-gradient(135deg, rgba(15, 12, 41, 0.95) 0%, rgba(48, 43, 99, 0.8) 35%, rgba(36, 36, 62, 0.9) 100%)",
        duration: 2,
        ease: "power2.out",
      })
        .to(
          titleRef.current,
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
          "-=1.5"
        )
        .to(
          descriptionRef.current,
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        )
        .to(
          statsRef.current,
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        )
        .to(
          cardsRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 1,
            stagger: 0.2,
            ease: "elastic.out(1, 0.6)",
          },
          "-=0.4"
        )
        .to(
          controlsRef.current,
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
          "-=0.3"
        )
        .to(
          floatingElementsRef.current,
          {
            opacity: 0.6,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.5)",
          },
          "-=0.6"
        );

      // Floating elements continuous animation
      floatingElementsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          y: "random(-35, 35)",
          x: "random(-30, 30)",
          rotation: "random(-360, 360)",
          duration: "random(12, 20)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.6,
        });
      });

      // Parallax effect
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          gsap.to(cardsRef.current, {
            y: self.progress * -30,
            rotationX: self.progress * 5,
            duration: 0.3,
            ease: "none",
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reviews]);

  // Auto-scroll featured review
  useEffect(() => {
    if (reviews.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  // GSAP hover animations (no state needed)
  const handleCardHover = (cardElement, isHover) => {
    const tl = gsap.timeline();

    if (isHover) {
      tl.to(cardElement, {
        scale: 1.05,
        y: -15,
        rotationY: 3,
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
        duration: 0.4,
        ease: "power2.out",
      })
        .to(
          cardElement.querySelector(".quote-icon"),
          {
            scale: 1.2,
            rotation: 10,
            color: "#60A5FA",
            duration: 0.3,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        )
        .to(
          cardElement.querySelector(".star-rating"),
          { scale: 1.1, duration: 0.3, ease: "power2.out" },
          "-=0.3"
        );
    } else {
      tl.to(cardElement, {
        scale: 1,
        y: 0,
        rotationY: 0,
        boxShadow: "0 10px 25px -3px rgba(0,0,0,0.3)",
        duration: 0.4,
        ease: "power2.out",
      })
        .to(
          cardElement.querySelector(".quote-icon"),
          {
            scale: 1,
            rotation: 0,
            color: "#9CA3AF",
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          cardElement.querySelector(".star-rating"),
          { scale: 1, duration: 0.3, ease: "power2.out" },
          "-=0.3"
        );
    }
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const generateStars = (rating = 5) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`${
          i < rating ? "text-yellow-400" : "text-gray-600"
        } transition-colors duration-200`}
      />
    ));
  };

  const stats = [
    { number: 1500, label: "Happy Travelers", suffix: "+" },
    { number: 4.9, label: "Average Rating", suffix: "", decimal: true },
    { number: 98, label: "Satisfaction Rate", suffix: "%" },
    { number: 150, label: "Destinations", suffix: "+" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-300">Loading amazing reviews...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    console.log("error when fetching reviews data: ", error);
    return <p className="text-red-500 text-center">Failed to load reviews.</p>;
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden py-20"
    >
      {/* Animated Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]"
      />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 gap-8 h-full">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="border-r border-purple-500 h-full" />
          ))}
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (floatingElementsRef.current[i] = el)}
            className={`absolute w-3 h-3 bg-white rounded-full ${
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
            What Our{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Travelers
            </span>
            <span className="block">Are Saying</span>
          </h2>

          <div className="max-w-4xl mx-auto">
            <p
              ref={descriptionRef}
              className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8"
            >
              At Travel Media, our greatest reward is the satisfaction of our
              customers. We take pride in creating unforgettable travel
              experiences that leave a lasting impact. Real adventures. Real
              memories. Real reviews.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                ref={(el) => (statsRef.current[index] = el)}
                className="text-center p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg"
              >
                <div className="text-3xl font-bold text-blue-400 mb-1">
                  {stat.decimal ? stat.number.toFixed(1) : stat.number}
                  <span>{stat.suffix}</span>
                </div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-gray-300">Loading amazing reviews...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Main Featured Review */}
            {reviews.length > 0 && (
              <div className="mb-16">
                <div className="max-w-4xl mx-auto">
                  <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
                    {/* Quote Icons */}
                    <div className="absolute top-6 left-6">
                      <FaQuoteLeft className="text-4xl text-blue-400 opacity-50" />
                    </div>
                    <div className="absolute bottom-6 right-6">
                      <FaQuoteRight className="text-4xl text-purple-400 opacity-50" />
                    </div>

                    {/* Review Content */}
                    <div className="text-center space-y-6">
                      <div className="star-rating flex justify-center space-x-1 text-2xl">
                        {generateStars(reviews[currentIndex]?.rating)}
                      </div>

                      <blockquote className="text-xl md:text-2xl text-white leading-relaxed italic">
                        <q>{reviews[currentIndex]?.message}</q>
                      </blockquote>

                      <div className="flex items-center justify-center space-x-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white/30">
                          <img
                            src={reviews[currentIndex]?.img}
                            alt={reviews[currentIndex]?.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <h4 className="text-xl font-bold text-white">
                            {reviews[currentIndex]?.name}
                          </h4>
                          <div className="flex items-center space-x-2 text-gray-300">
                            <FaMapMarkerAlt className="text-sm text-blue-400" />
                            <span className="text-sm">
                              {reviews[currentIndex]?.location ||
                                "Verified Traveler"}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-400">
                            <FaCalendarAlt className="text-xs" />
                            <span className="text-xs">
                              {reviews[currentIndex]?.date || "Recent"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Review Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {reviews.slice(0, 6).map((review, index) => (
                <div
                  key={review.id || index}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="group cursor-pointer perspective-1000"
                  onMouseEnter={(e) =>
                    handleCardHover(e.currentTarget, true, index)
                  }
                  onMouseLeave={(e) =>
                    handleCardHover(e.currentTarget, false, index)
                  }
                >
                  <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl hover:border-white/30 transition-all duration-500 transform-gpu h-full">
                    {/* Quote Icon */}
                    <div className="quote-icon absolute top-4 right-4 text-2xl text-gray-400 transition-all duration-300">
                      <FaQuoteLeft />
                    </div>

                    {/* Star Rating */}
                    <div className="star-rating flex space-x-1 mb-4 text-lg">
                      {generateStars(review.rating)}
                    </div>

                    {/* Review Text */}
                    <blockquote className="text-white mb-6 leading-relaxed italic">
                      <q>{review.message}</q>
                    </blockquote>

                    {/* Author Info */}
                    <div className="flex items-center space-x-3 mt-auto">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30">
                        <img
                          src={review.img}
                          alt={review.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">
                          {review.name}
                        </h4>
                        <p className="text-gray-300 text-sm">
                          {review.destination || "Adventure Seeker"}
                        </p>
                      </div>
                    </div>

                    {/* Like Button */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors duration-200">
                        <FaThumbsUp className="text-sm" />
                        <span className="text-xs">
                          {review.likes || Math.floor(Math.random() * 50) + 10}
                        </span>
                      </button>
                    </div>

                    {/* Hover Effect Border */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Controls */}
            <div
              ref={controlsRef}
              className="flex items-center justify-center space-x-4"
            >
              <button
                onClick={goToPrevious}
                className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
              >
                <FaArrowLeft />
              </button>

              <div className="flex space-x-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-blue-400 scale-125"
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
              >
                <FaArrowRight />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 border border-purple-500/30 rounded-full opacity-30" />
      <div className="absolute bottom-20 right-20 w-24 h-24 border border-blue-500/30 rounded-lg opacity-20 rotate-45" />
    </section>
  );
};

export default Review;

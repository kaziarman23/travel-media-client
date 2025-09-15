import { useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { 
  FaArrowLeft, 
  FaArrowRight, 
  FaGlobeAmericas, 
  FaUsers, 
  FaHeart,
  FaPlay,
  FaPause
} from "react-icons/fa";
import AboutOne from "../../assets/HomePageImages/AboutOne.jpg";
import AboutTwo from "../../assets/HomePageImages/AboutTwo.jpg";
import AboutThree from "../../assets/HomePageImages/AboutThree.jpg";
import AboutFour from "../../assets/HomePageImages/AboutFour.jpg";
import AboutFive from "../../assets/HomePageImages/AboutFive.jpg";
import AboutSix from "../../assets/HomePageImages/AboutSix.jpg";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  // Refs for animations
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const carouselRef = useRef(null);
  const contentRef = useRef(null);
  const featuresRef = useRef([]);
  const statsRef = useRef([]);
  const backgroundRef = useRef(null);
  const floatingElementsRef = useRef([]);

  // Embla carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    dragFree: true,
    containScroll: "trimSnaps"
  }, [
    Autoplay({ 
      stopOnMouseEnter: true, 
      stopOnInteraction: false, 
      delay: 4000 
    }),
  ]);

  // Animation setup
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, carouselRef.current, contentRef.current], {
        opacity: 0,
        y: 60,
        scale: 0.9
      });

      gsap.set(featuresRef.current, {
        opacity: 0,
        y: 40,
        scale: 0.8
      });

      gsap.set(statsRef.current, {
        opacity: 0,
        x: -30,
        scale: 0.9
      });

      gsap.set(floatingElementsRef.current, {
        opacity: 0,
        scale: 0,
        rotation: 180
      });

      // Main timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      });

      // Background animation
      tl.to(backgroundRef.current, {
        background: "radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.08) 0%, rgba(147, 51, 234, 0.04) 50%, transparent 100%)",
        duration: 1.5,
        ease: "power2.out"
      })
      // Title animation
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=1")
      // Carousel animation
      .to(carouselRef.current, {
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
      // Features stagger
      .to(featuresRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(1.7)"
      }, "-=0.4")
      // Stats animation
      .to(statsRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.3")
      // Floating elements
      .to(floatingElementsRef.current, {
        opacity: 0.6,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.5)"
      }, "-=0.5");

      // Parallax effect on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(carouselRef.current, {
            y: progress * -30,
            duration: 0.3,
            ease: "none"
          });
          gsap.to(contentRef.current, {
            y: progress * 20,
            duration: 0.3,
            ease: "none"
          });
        }
      });

      // Floating elements continuous animation
      floatingElementsRef.current.forEach((element, index) => {
        if (element) {
          gsap.to(element, {
            y: "random(-20, 20)",
            x: "random(-15, 15)",
            rotation: "random(-180, 180)",
            duration: "random(6, 12)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.3
          });
        }
      });

      // Stats counter animation
      statsRef.current.forEach((stat) => {
        if (stat) {
          const number = stat.querySelector('.stat-number');
          if (number) {
            const finalValue = parseInt(number.textContent);
            gsap.fromTo(number, 
              { textContent: 0 },
              {
                textContent: finalValue,
                duration: 2,
                ease: "power2.out",
                snap: { textContent: 1 },
                scrollTrigger: {
                  trigger: stat,
                  start: "top 80%",
                  toggleActions: "play none none none"
                }
              }
            );
          }
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Carousel controls
  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      // Add click animation
      gsap.to(carouselRef.current, {
        scale: 0.98,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.out"
      });
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      // Add click animation
      gsap.to(carouselRef.current, {
        scale: 0.98,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.out"
      });
    }
  }, [emblaApi]);

  // Button hover animation
  const handleButtonHover = (element, isHover) => {
    gsap.to(element, {
      scale: isHover ? 1.05 : 1,
      y: isHover ? -2 : 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const imgArray = [
    { id: 1, img: AboutOne, title: "Mountain Adventures" },
    { id: 2, img: AboutTwo, title: "City Explorations" },
    { id: 3, img: AboutThree, title: "Beach Getaways" },
    { id: 4, img: AboutFour, title: "Cultural Journeys" },
    { id: 5, img: AboutFive, title: "Nature Escapes" },
    { id: 6, img: AboutSix, title: "Urban Discoveries" },
  ];

  const features = [
    {
      icon: FaGlobeAmericas,
      title: "Global Reach",
      description: "Destinations across 6 continents",
      color: "text-blue-400"
    },
    {
      icon: FaUsers,
      title: "Expert Team",
      description: "Passionate travel professionals",
      color: "text-green-400"
    },
    {
      icon: FaHeart,
      title: "Personalized",
      description: "Tailored experiences for you",
      color: "text-red-400"
    }
  ];

  const stats = [
    { number: 150, label: "Countries", suffix: "+" },
    { number: 50000, label: "Happy Travelers", suffix: "+" },
    { number: 15, label: "Years Experience", suffix: "" },
    { number: 98, label: "Satisfaction Rate", suffix: "%" }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen bg-black overflow-hidden py-20"
    >
      {/* Animated Background */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-black"
      />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-8 gap-6 h-full">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="border-r border-gray-800 h-full" />
          ))}
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            ref={el => floatingElementsRef.current[i] = el}
            className={`absolute w-3 h-3 bg-white rounded-full ${
              i % 3 === 0 ? 'opacity-30' : i % 3 === 1 ? 'opacity-20' : 'opacity-10'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div 
          ref={titleRef}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            About <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Us</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Carousel Section */}
          <div 
            ref={carouselRef}
            className="relative order-2 lg:order-1"
          >
            <div className="relative group">
              {/* Carousel Container */}
              <div className="embla w-full overflow-hidden rounded-2xl shadow-2xl">
                <div className="embla__viewport" ref={emblaRef}>
                  <div className="embla__container flex">
                    {imgArray.map((item) => (
                      <div key={item.id} className="embla__slide relative flex-shrink-0 w-full">
                        <div className="relative overflow-hidden">
                          <img
                            src={item.img}
                            alt={item.title}
                            className="w-full h-80 md:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="text-xl font-semibold">{item.title}</h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Carousel Controls */}
              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={scrollPrev}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white rounded-lg transition-all duration-300 group"
                  onMouseEnter={(e) => handleButtonHover(e.target, true)}
                  onMouseLeave={(e) => handleButtonHover(e.target, false)}
                >
                  <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
                  <span>Previous</span>
                </button>

                <div className="flex space-x-2">
                  {imgArray.map((_, index) => (
                    <div
                      key={index}
                      className="w-2 h-2 bg-gray-600 rounded-full transition-all duration-300"
                    />
                  ))}
                </div>

                <button
                  onClick={scrollNext}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white rounded-lg transition-all duration-300 group"
                  onMouseEnter={(e) => handleButtonHover(e.target, true)}
                  onMouseLeave={(e) => handleButtonHover(e.target, false)}
                >
                  <span>Next</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div 
            ref={contentRef}
            className="space-y-8 order-1 lg:order-2"
          >
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Travel Media: Your Gateway to 
                <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Adventure
                </span>
              </h3>

              <p className="text-lg text-gray-400 leading-relaxed">
                At Travel Media, we are passionate explorers, storytellers, and digital creators, 
                dedicated to inspiring your next adventure. Our platform was founded with one simple goal: 
                to help travelers discover the beauty of the world, one destination at a time.
              </p>

              <p className="text-gray-500 leading-relaxed">
                Whether you're looking for off-the-beaten-path journeys or well-loved landmarks, 
                our mission is to provide insightful and engaging content that caters to all types of travelers.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  ref={el => featuresRef.current[index] = el}
                  className="p-4 bg-gray-900/50 border border-gray-800 rounded-lg backdrop-blur-sm hover:border-gray-700 transition-all duration-300"
                >
                  <feature.icon className={`text-2xl ${feature.color} mb-2`} />
                  <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  ref={el => statsRef.current[index] = el}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-1">
                    <span className="stat-number">{stat.number}</span>
                    <span>{stat.suffix}</span>
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              to="/aboutus"
              className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg group"
              onMouseEnter={(e) => handleButtonHover(e.target, true)}
              onMouseLeave={(e) => handleButtonHover(e.target, false)}
            >
              <span>Learn More About Us</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border border-gray-800 rounded-full opacity-20" />
      <div className="absolute bottom-20 left-20 w-24 h-24 border border-gray-700 rounded-lg opacity-15 rotate-45" />
    </section>
  );
};

export default AboutUs;
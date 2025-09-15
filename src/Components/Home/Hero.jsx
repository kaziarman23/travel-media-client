import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import Earth from "../CustomHooks/Earth";
import { 
  FaPlay, 
  FaArrowDown, 
  FaGlobeAmericas, 
  FaMapMarkerAlt, 
  FaUsers, 
  FaStar 
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const Hero = () => {
  // Refs for animations
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const earthRef = useRef(null);
  const statsRef = useRef([]);
  const particlesRef = useRef([]);
  const scrollIndicatorRef = useRef(null);
  const gradientRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current, descriptionRef.current, buttonsRef.current], {
        opacity: 0,
        y: 60,
        scale: 0.9
      });
      
      gsap.set(earthRef.current, {
        opacity: 0,
        scale: 0.5,
        rotation: -180
      });

      gsap.set(statsRef.current, {
        opacity: 0,
        y: 40,
        scale: 0.8
      });

      gsap.set(particlesRef.current, {
        opacity: 0,
        scale: 0,
        rotation: 180
      });

      gsap.set(scrollIndicatorRef.current, {
        opacity: 0,
        y: 20
      });

      // Create main timeline
      const tl = gsap.timeline({
        delay: 0.5
      });

      // Background gradient animation
      tl.to(gradientRef.current, {
        background: "radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.05) 50%, transparent 100%)",
        duration: 2,
        ease: "power2.out"
      })
      // Title animation with typing effect
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)"
      })
      .to(titleRef.current, {
        text: {
          value: "Discover the World",
          delimiter: ""
        },
        duration: 1.5,
        ease: "none"
      }, "-=0.5")
      // Subtitle
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.8")
      // Description with stagger
      .to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4")
      // Earth animation
      .to(earthRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)"
      }, "-=0.6")
      // Buttons
      .to(buttonsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)"
      }, "-=0.4")
      // Stats animation
      .to(statsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.3")
      // Particles
      .to(particlesRef.current, {
        opacity: 0.6,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.5)"
      }, "-=0.5")
      // Scroll indicator
      .to(scrollIndicatorRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.2");

      // Floating particles animation
      particlesRef.current.forEach((particle, index) => {
        if (particle) {
          gsap.to(particle, {
            y: "random(-30, 30)",
            x: "random(-20, 20)",
            rotation: "random(-360, 360)",
            duration: "random(8, 15)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.5
          });
        }
      });

      // Continuous scroll indicator animation
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });

      // Parallax effect on scroll
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(earthRef.current, {
            y: progress * 100,
            rotation: progress * 180,
            duration: 0.3,
            ease: "none"
          });
          gsap.to(titleRef.current, {
            y: progress * -50,
            opacity: 1 - progress * 0.5,
            duration: 0.3,
            ease: "none"
          });
        }
      });

      // Stats counter animation
      statsRef.current.forEach((stat, index) => {
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

    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Button hover animations
  const handleButtonHover = (element, isHover) => {
    gsap.to(element, {
      scale: isHover ? 1.05 : 1,
      y: isHover ? -2 : 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const stats = [
    { icon: FaGlobeAmericas, number: 150, label: "Destinations", color: "text-blue-400" },
    { icon: FaUsers, number: 10000, label: "Happy Travelers", color: "text-green-400" },
    { icon: FaMapMarkerAlt, number: 500, label: "Tour Packages", color: "text-purple-400" },
    { icon: FaStar, number: 4.9, label: "Rating", color: "text-yellow-400", decimal: true }
  ];

  return (
    <section 
      ref={heroRef}
      className="relative w-full min-h-screen bg-black overflow-hidden flex items-center"
    >
      {/* Animated Background */}
      <div 
        ref={gradientRef}
        className="absolute inset-0 bg-black"
      />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-4 h-full">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-r border-gray-800 h-full" />
          ))}
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            ref={el => particlesRef.current[i] = el}
            className={`absolute w-2 h-2 bg-white rounded-full ${
              i % 3 === 0 ? 'opacity-40' : i % 3 === 1 ? 'opacity-20' : 'opacity-10'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div 
        id="Hero" 
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Text Content */}
          <div className="space-y-8 text-white order-2 lg:order-1">
            {/* Main Title */}
            <div className="space-y-4">
              <h1 
                ref={titleRef}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              >
                {/* Text will be animated with TextPlugin */}
              </h1>
              <h2 
                ref={subtitleRef}
                className="text-2xl md:text-3xl font-light text-gray-300"
              >
                with Travel Media
              </h2>
            </div>

            {/* Description */}
            <p 
              ref={descriptionRef}
              className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl"
            >
              At Travel Media, we bring the world closer to you. Whether you're seeking breathtaking adventures, serene escapes, or cultural discoveries, our expert team curates personalized travel experiences to suit your every desire.
            </p>

            {/* Action Buttons */}
            <div 
              ref={buttonsRef}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                className="group flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg"
                onMouseEnter={(e) => handleButtonHover(e.target, true)}
                onMouseLeave={(e) => handleButtonHover(e.target, false)}
              >
                <span>Start Your Journey</span>
                <FaArrowDown className="transform group-hover:translate-y-1 transition-transform duration-300" />
              </button>
              
              <button
                className="group flex items-center justify-center space-x-3 px-8 py-4 border-2 border-gray-700 hover:border-white text-white font-semibold rounded-lg transition-all duration-300"
                onMouseEnter={(e) => handleButtonHover(e.target, true)}
                onMouseLeave={(e) => handleButtonHover(e.target, false)}
              >
                <FaPlay className="text-sm" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  ref={el => statsRef.current[index] = el}
                  className="text-center space-y-2"
                >
                  <div className="flex justify-center">
                    <stat.icon className={`text-2xl ${stat.color}`} />
                  </div>
                  <div className={`text-2xl font-bold ${stat.color}`}>
                    <span className="stat-number">
                      {stat.decimal ? stat.number.toFixed(1) : stat.number}
                    </span>
                    {!stat.decimal && stat.number >= 1000 && <span>+</span>}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Earth Component */}
          <div 
            ref={earthRef}
            className="flex justify-center items-center order-1 lg:order-2"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl scale-150" />
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                <Earth />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 text-gray-400"
        >
          <span className="text-sm uppercase tracking-wider">Scroll</span>
          <FaArrowDown className="text-xl animate-bounce" />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 border border-gray-800 rounded-full opacity-30" />
      <div className="absolute bottom-20 right-20 w-24 h-24 border border-gray-700 rounded-lg opacity-20 rotate-45" />
      <div className="absolute top-1/2 right-10 w-16 h-16 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full" />
    </section>
  );
};

export default Hero;
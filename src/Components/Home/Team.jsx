import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
import toast from "react-hot-toast";
import { 
  FaLinkedin, 
  FaTwitter, 
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaQuoteLeft,
  FaStar,
  FaUsers
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Team = () => {
  // State
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredMember, setHoveredMember] = useState(null);

  // Refs for animations
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const cardsRef = useRef([]);
  const backgroundRef = useRef(null);
  const floatingElementsRef = useRef([]);
  const statsRef = useRef([]);

  // Fetch team data
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://travel-media-server.vercel.app/team");
        if (response.data) {
          setTeam(response.data);
        }
      } catch (error) {
        toast.error("Failed to load team data");
        console.error("Error fetching team:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, descriptionRef.current], {
        opacity: 0,
        y: 60,
        scale: 0.9
      });

      gsap.set(cardsRef.current, {
        opacity: 0,
        y: 80,
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

      // Main timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Background animation
      tl.to(backgroundRef.current, {
        background: "radial-gradient(circle at 50% 30%, rgba(59, 130, 246, 0.08) 0%, rgba(147, 51, 234, 0.04) 50%, transparent 100%)",
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
      // Cards stagger animation
      .to(cardsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "elastic.out(1, 0.6)"
      }, "-=0.4")
      // Floating elements
      .to(floatingElementsRef.current, {
        opacity: 0.6,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.5)"
      }, "-=0.6");

      // Floating elements continuous animation
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
  }, [team]);

  // Card hover animations
  const handleCardHover = (cardElement, isHover, index) => {
    setHoveredMember(isHover ? index : null);
    
    const tl = gsap.timeline();
    
    if (isHover) {
      tl.to(cardElement, {
        scale: 1.05,
        y: -10,
        rotationY: 5,
        duration: 0.4,
        ease: "power2.out"
      })
      .to(cardElement.querySelector('.card-image'), {
        scale: 1.1,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
      .to(cardElement.querySelector('.card-overlay'), {
        opacity: 0.9,
        duration: 0.3,
        ease: "power2.out"
      }, "-=0.6")
      .to(cardElement.querySelector('.social-links'), {
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
        duration: 0.4,
        ease: "power2.out"
      })
      .to(cardElement.querySelector('.card-image'), {
        scale: 1,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
      .to(cardElement.querySelector('.card-overlay'), {
        opacity: 0.7,
        duration: 0.3,
        ease: "power2.out"
      }, "-=0.6")
      .to(cardElement.querySelector('.social-links'), {
        opacity: 0,
        y: 10,
        duration: 0.2,
        ease: "power2.in"
      }, "-=0.4");
    }
  };

  // Stats data
  const stats = [
    { icon: FaUsers, number: 25, label: "Team Members", color: "text-blue-400" },
    { icon: FaStar, number: 15, label: "Years Experience", color: "text-yellow-400" },
    { icon: FaMapMarkerAlt, number: 50, label: "Countries Visited", color: "text-green-400" }
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
        {[...Array(10)].map((_, i) => (
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
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Meet the <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Dream Team</span>
            <span className="block text-3xl md:text-4xl lg:text-5xl mt-2">
              Behind Your Perfect Getaway
            </span>
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <p 
              ref={descriptionRef}
              className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8"
            >
              At Travel Media, we believe that every journey begins with a passion for exploration 
              and a team of dedicated professionals who make your travel dreams a reality. Our team 
              is a diverse group of seasoned travel experts, passionate adventurers, and meticulous 
              planners, all united by a single mission: to craft unforgettable experiences tailored just for you.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  ref={el => statsRef.current[index] = el}
                  className="flex items-center justify-center space-x-3 p-4 bg-gray-900/50 border border-gray-800 rounded-lg backdrop-blur-sm"
                >
                  <stat.icon className={`text-2xl ${stat.color}`} />
                  <div>
                    <div className={`text-2xl font-bold ${stat.color}`}>
                      {stat.number}+
                    </div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Cards */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-gray-400">Loading our amazing team...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={member.id || index}
                ref={el => cardsRef.current[index] = el}
                className="group cursor-pointer perspective-1000"
                onMouseEnter={(e) => handleCardHover(e.currentTarget, true, index)}
                onMouseLeave={(e) => handleCardHover(e.currentTarget, false, index)}
              >
                <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 hover:border-gray-600 transition-all duration-500 transform-gpu">
                  {/* Image Container */}
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="card-image w-full h-full object-cover transition-transform duration-700"
                    />
                    <div className="card-overlay absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 transition-opacity duration-300" />
                    
                    {/* Social Links Overlay */}
                    <div className="social-links absolute top-4 right-4 space-y-2 opacity-0 translate-y-2 transition-all duration-300">
                      <a 
                        href={`mailto:${member.mail}`}
                        className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-blue-500 transition-all duration-300"
                      >
                        <FaEnvelope />
                      </a>
                      <a 
                        href="#"
                        className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-blue-600 transition-all duration-300"
                      >
                        <FaLinkedin />
                      </a>
                      <a 
                        href="#"
                        className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-blue-400 transition-all duration-300"
                      >
                        <FaTwitter />
                      </a>
                    </div>

                    {/* Quote Bubble */}
                    <div className="absolute top-4 left-4">
                      <div className="w-8 h-8 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <FaQuoteLeft className="text-white text-xs" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-blue-400 font-medium text-lg mb-2">
                        {member.post}
                      </p>
                      <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
                        <FaEnvelope className="text-xs" />
                        <span>{member.mail}</span>
                      </div>
                    </div>

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap justify-center gap-2 pt-4">
                      {member.expertise?.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700"
                        >
                          {skill}
                        </span>
                      )) || (
                        <>
                          <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700">
                            Travel Expert
                          </span>
                          <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700">
                            Adventure Guide
                          </span>
                        </>
                      )}
                    </div>

                    {/* Bio or Quote */}
                    <div className="text-center pt-2">
                      <p className="text-gray-400 text-sm italic">
                        "{member.quote || 'Turning travel dreams into unforgettable adventures'}"
                      </p>
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
        )}

        {/* Call to Action */}
        <div className="text-center mt-16 pt-8 border-t border-gray-800">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Start Your Adventure?
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Our team is here to help you plan the perfect getaway. 
            Get in touch and let's make your travel dreams come true!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:team@travelmedia.com"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              <FaEnvelope />
              <span>Contact Our Team</span>
            </a>
            <a
              href="tel:+1234567890"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold rounded-lg transition-all duration-300"
            >
              <FaPhone />
              <span>Call Us Now</span>
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border border-gray-800 rounded-full opacity-20" />
      <div className="absolute bottom-20 left-20 w-24 h-24 border border-gray-700 rounded-lg opacity-15 rotate-45" />
    </section>
  );
};

export default Team;
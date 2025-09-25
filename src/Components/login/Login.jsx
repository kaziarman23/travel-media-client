import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser, googleSignIn } from "../../Redux/features/userSlice";
import { useState, useEffect, useRef } from "react";
import {
  FaGoogle,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
  FaTimes,
  FaCheck,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { gsap } from "gsap";

const Login = () => {
  // refs for GSAP animations
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const fieldsRef = useRef([]);
  const buttonsRef = useRef([]);
  const dotsRef = useRef([]);
  const validationRef = useRef([]);

  // states
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  // Redux Hook
  const dispatch = useDispatch();

  // Validation functions
  const validateEmail = (email) => {
    if (!email) return { isValid: false, message: "Email is required" };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return { isValid: false, message: "Invalid email format" };
    return { isValid: true, message: "Valid email" };
  };

  const validatePassword = (password) => {
    if (!password) return { isValid: false, message: "Password is required" };
    if (password.length < 6)
      return {
        isValid: false,
        message: "Password must be at least 6 characters",
      };
    return { isValid: true, message: "Valid password" };
  };

  // Get validation states
  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);

  // GSAP animations
  useEffect(() => {
    const tl = gsap.timeline();

    // Set initial states
    gsap.set([formRef.current, titleRef.current], {
      opacity: 0,
      y: 60,
      scale: 0.9,
    });
    gsap.set(fieldsRef.current, { opacity: 0, x: -40, rotation: -3 });
    gsap.set(buttonsRef.current, { opacity: 0, scale: 0.7, y: 20 });
    gsap.set(dotsRef.current, { opacity: 0, scale: 0, rotation: 180 });

    // Container entrance with breathing effect
    tl.fromTo(
      containerRef.current,
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
    )
      // Form container entrance with elastic bounce
      .to(
        formRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "elastic.out(1, 0.6)",
        },
        "-=0.4"
      )
      // Title animation with rotation
      .to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.6"
      )
      // Stagger form fields with rotation
      .to(
        fieldsRef.current,
        {
          opacity: 1,
          x: 0,
          rotation: 0,
          duration: 0.6,
          stagger: 0.25,
          ease: "back.out(1.2)",
        },
        "-=0.4"
      )
      // Buttons animation with bounce
      .to(
        buttonsRef.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.15,
          ease: "elastic.out(1, 0.4)",
        },
        "-=0.3"
      )
      // Floating dots with spin
      .to(
        dotsRef.current,
        {
          opacity: 0.4,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.5)",
        },
        "-=0.5"
      );

    // Continuous floating animation for dots
    dotsRef.current.forEach((dot, index) => {
      if (dot) {
        gsap.to(dot, {
          y: "random(-25, 25)",
          x: "random(-20, 20)",
          rotation: "random(-360, 360)",
          duration: "random(8, 15)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.5,
        });
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  // Enhanced form field animations
  const handleFieldFocus = (index, fieldName) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));

    // Scale and glow effect
    gsap.to(fieldsRef.current[index], {
      scale: 1.03,
      duration: 0.3,
      ease: "power2.out",
    });

    // Validation indicator animation
    if (validationRef.current[index]) {
      gsap.to(validationRef.current[index], {
        opacity: 1,
        x: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleFieldBlur = (index) => {
    gsap.to(fieldsRef.current[index], {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  // Enhanced button hover animations
  const handleButtonHover = (buttonRef, isHover) => {
    gsap.to(buttonRef, {
      scale: isHover ? 1.05 : 1,
      y: isHover ? -3 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  // Error animation with shake effect
  useEffect(() => {
    if (loginError) {
      gsap.fromTo(
        ".error-message",
        { opacity: 0, x: -30, scale: 0.8 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        }
      );

      // Shake animation for form
      gsap.to(formRef.current, {
        x: [-15, 15, -12, 12, -8, 8, 0],
        duration: 0.8,
        ease: "power2.out",
      });
    }
  }, [loginError]);

  // Success animation
  const playSuccessAnimation = () => {
    gsap.to(formRef.current, {
      scale: 1.05,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(formRef.current, {
          y: -30,
          opacity: 0.7,
          duration: 0.6,
          ease: "power2.in",
        });
      },
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");

    // Mark all fields as touched
    setTouched({
      email: true,
      password: true,
    });

    // Validate all fields
    if (!emailValidation.isValid || !passwordValidation.isValid) {
      setIsLoading(false);
      setLoginError("Please fix all validation errors before proceeding.");
      return;
    }

    // Loading animation
    gsap.to(buttonsRef.current[0], {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });

    try {
      await dispatch(
        loginUser({ userEmail: email, userPassword: password })
      ).unwrap();

      // Success animation
      playSuccessAnimation();

      // clearing the form
      clearingForm();
      setIsLoading(false);

      // navigating the user
      setTimeout(() => {
        navigate(location?.state ? location?.state : "/");
      }, 600);

      // showing alert
      toast.success("Signed in successfully");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setLoginError(
        error.message || "Invalid email or password. Please try again."
      );
    }
  };

  // Login with Google
  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Loading animation
    gsap.to(buttonsRef.current[1], {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });

    try {
      await dispatch(googleSignIn()).unwrap();

      // Success animation
      playSuccessAnimation();

      // clearing the form
      clearingForm();
      setLoginError("");
      setIsLoading(false);

      // navigating the user
      setTimeout(() => {
        navigate(location?.state ? location?.state : "/");
      }, 600);

      // showing alert
      toast.success("Signed in with Google successfully");
    } catch (error) {
      setIsLoading(false);
      setLoginError(
        error.message || "Google sign-in failed. Please try again."
      );
    }
  };

  const clearingForm = () => {
    setEmail("");
    setPassword("");
    setTouched({
      email: false,
      password: false,
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-black overflow-hidden flex items-center justify-center p-4"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Dots */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (dotsRef.current[i] = el)}
            className={`absolute w-3 h-3 bg-white rounded-full ${
              i % 3 === 0
                ? "opacity-40"
                : i % 3 === 1
                ? "opacity-25"
                : "opacity-15"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Geometric Grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-6 gap-12 h-full">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border-r border-gray-800 h-full" />
            ))}
          </div>
          <div className="absolute inset-0 grid grid-rows-6 gap-12">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border-b border-gray-800 w-full" />
            ))}
          </div>
        </div>

        {/* Corner Elements */}
        <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-gray-800 rounded-tl-lg" />
        <div className="absolute top-8 right-8 w-24 h-24 border-r-2 border-t-2 border-gray-800 rounded-tr-lg" />
        <div className="absolute bottom-8 left-8 w-24 h-24 border-l-2 border-b-2 border-gray-800 rounded-bl-lg" />
        <div className="absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-gray-800 rounded-br-lg" />
      </div>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-md">
        <form
          ref={formRef}
          onSubmit={handleLogin}
          className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl backdrop-blur-sm"
        >
          {/* Title Section */}
          <div ref={titleRef} className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700 shadow-lg">
                <FaSignInAlt className="text-white text-lg" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
            </div>
            <h1 className="text-3xl ml-4 font-bold text-white">Welcome Back</h1>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Email Field */}
            <div
              ref={(el) => (fieldsRef.current[0] = el)}
              className="relative group"
            >
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  className={`w-full px-4 py-3 pr-10 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                    touched.email
                      ? emailValidation.isValid
                        ? "border-green-500 focus:border-green-400 focus:ring-2 focus:ring-green-500/20"
                        : "border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20"
                      : "border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  }`}
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => handleFieldFocus(0, "email")}
                  onBlur={() => handleFieldBlur(0)}
                />
                {touched.email && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {emailValidation.isValid ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </div>
                )}
              </div>
              {touched.email && !emailValidation.isValid && (
                <p
                  ref={(el) => (validationRef.current[0] = el)}
                  className="text-red-400 text-xs mt-1 opacity-0"
                >
                  {emailValidation.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div
              ref={(el) => (fieldsRef.current[1] = el)}
              className="relative group"
            >
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  className={`w-full px-4 py-3 pr-20 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                    touched.password
                      ? passwordValidation.isValid
                        ? "border-green-500 focus:border-green-400 focus:ring-2 focus:ring-green-500/20"
                        : "border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20"
                      : "border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  }`}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => handleFieldFocus(1, "password")}
                  onBlur={() => handleFieldBlur(1)}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  {touched.password && (
                    <div>
                      {passwordValidation.isValid ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </div>
                  )}
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-300 transition-colors duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              {touched.password && !passwordValidation.isValid && (
                <p
                  ref={(el) => (validationRef.current[1] = el)}
                  className="text-red-400 text-xs mt-1 opacity-0"
                >
                  {passwordValidation.message}
                </p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-500 hover:text-blue-400 transition-colors duration-200 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          {/* Error Message */}
          {loginError && (
            <div className="error-message mt-6 p-4 bg-red-900/30 border border-red-700/50 rounded-lg">
              <p className="text-red-300 text-sm flex items-center">
                <FaTimes className="mr-2 flex-shrink-0" />
                {loginError}
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-8 space-y-4">
            {/* Login Button */}
            <button
              ref={(el) => (buttonsRef.current[0] = el)}
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-lg"
              onMouseEnter={(e) => handleButtonHover(e.target, true)}
              onMouseLeave={(e) => handleButtonHover(e.target, false)}
            >
              <span className="flex items-center justify-center">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <FaSignInAlt className="mr-2" />
                    Sign In
                  </>
                )}
              </span>
            </button>

            {/* Google Login Button */}
            <button
              ref={(el) => (buttonsRef.current[1] = el)}
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-500/50 shadow-lg"
              onMouseEnter={(e) => handleButtonHover(e.target, true)}
              onMouseLeave={(e) => handleButtonHover(e.target, false)}
            >
              <span className="flex items-center justify-center">
                <FaGoogle className="mr-2" />
                Continue with Google
              </span>
            </button>
          </div>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don&#39;t have an account?{" "}
              <Link
                to="/register"
                className="text-blue-500 hover:text-blue-400 font-semibold transition-colors duration-200 hover:underline"
              >
                Create one
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

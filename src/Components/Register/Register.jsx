import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { FaGoogle, FaEye, FaEyeSlash, FaCheck, FaTimes } from "react-icons/fa";
import { gsap } from "gsap";

// Import Redux Hooks
import { useDispatch } from "react-redux";
import { createUser, googleSignIn } from "../../Redux/features/userSlice";
import { useAddUserMutation } from "../../Redux/features/api/usersApi";

const Register = () => {
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  // Initialize Redux/RTK Query hooks
  const dispatch = useDispatch();
  const [addUser] = useAddUserMutation();

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) return { isValid: false, message: "Name is required" };
    if (name.trim().length < 2)
      return { isValid: false, message: "Name must be at least 2 characters" };
    if (!/^[a-zA-Z\s]+$/.test(name))
      return {
        isValid: false,
        message: "Name can only contain letters and spaces",
      };
    return { isValid: true, message: "Valid name" };
  };

  const validateEmail = (email) => {
    if (!email) return { isValid: false, message: "Email is required" };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return { isValid: false, message: "Invalid email format" };
    return { isValid: true, message: "Valid email" };
  };

  const validatePassword = (password) => {
    const validations = [];
    if (password.length < 6) validations.push("At least 6 characters");
    if (!/[A-Z]/.test(password)) validations.push("One uppercase letter");
    if (!/[a-z]/.test(password)) validations.push("One lowercase letter");
    if (!/[0-9]/.test(password)) validations.push("One number");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      validations.push("One special character");

    return {
      isValid: validations.length === 0,
      message: validations.length === 0 ? "Strong password" : validations,
      strength: Math.max(0, 5 - validations.length) * 20,
    };
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword)
      return { isValid: false, message: "Please confirm your password" };
    if (confirmPassword !== password)
      return { isValid: false, message: "Passwords do not match" };
    return { isValid: true, message: "Passwords match" };
  };

  // Get validation states
  const nameValidation = validateName(name);
  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);
  const confirmPasswordValidation = validateConfirmPassword(
    confirmPassword,
    password
  );

  // GSAP animations
  useEffect(() => {
    const tl = gsap.timeline();

    // Set initial states
    gsap.set([formRef.current, titleRef.current], {
      opacity: 0,
      y: 60,
      scale: 0.9,
    });
    gsap.set(fieldsRef.current, { opacity: 0, x: -40, rotation: -2 });
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
          stagger: 0.2,
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
          y: "random(-20, 20)",
          x: "random(-15, 15)",
          rotation: "random(-360, 360)",
          duration: "random(6, 12)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.4,
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
      y: isHover ? -2 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  // Error animation with shake effect
  useEffect(() => {
    if (registerError) {
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
        x: [-10, 10, -8, 8, -5, 5, 0],
        duration: 0.6,
        ease: "power2.out",
      });
    }
  }, [registerError]);

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
          y: -20,
          opacity: 0.8,
          duration: 0.5,
          ease: "power2.in",
        });
      },
    });
  };

  // handle register
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setRegisterError("");

    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    if (
      !nameValidation.isValid ||
      !emailValidation.isValid ||
      !passwordValidation.isValid ||
      !confirmPasswordValidation.isValid
    ) {
      setIsLoading(false);
      setRegisterError("Please fix all validation errors before proceeding.");
      return;
    }

    gsap.to(buttonsRef.current[0], {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });

    try {
      // creating a new user
      await dispatch(
        createUser({
          userName: name,
          userEmail: email,
          userPassword: password,
        })
      );

      // adding that user in the database
      await addUser({
        name: name,
        email: email,
      }).unwrap();

      playSuccessAnimation();
      clearingForm();
      setIsLoading(false);

      setTimeout(() => {
        navigate(location?.state ? location?.state : "/");
      }, 500);

      toast.success("Account created successfully!");
    } catch (error) {
      setIsLoading(false);
      setRegisterError(
        error.message || "Registration failed. Please try again."
      );
    }
  };

  // Register with Google
  const handleGoogleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setRegisterError(""); // Clear any previous error

    // Loading animation (existing code)
    gsap.to(buttonsRef.current[1], {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });

    try {
      // 1. Sign in with Google (Dispatch Redux Thunk)
      const resultAction = await dispatch(googleSignIn());

      // Check if the thunk action was successful
      if (googleSignIn.fulfilled.match(resultAction)) {
        const userPayload = resultAction.payload; // Contains userName and userEmail

        // 2. Add user to your database using RTK Query
        await addUser({
          userName: userPayload.userName,
          userEmail: userPayload.userEmail,
        }).unwrap();

        // Success animation
        playSuccessAnimation();

        // clearing the form
        clearingForm();
        setRegisterError("");
        setIsLoading(false);

        // navigating the user
        setTimeout(() => {
          navigate(location?.state ? location?.state : "/");
        }, 500);

        // showing alert
        toast.success("Signed in with Google successfully!");
      } else {
        // Handle thunk rejection (Firebase error)
        throw new Error(resultAction.error.message || "Google sign-in failed.");
      }
    } catch (error) {
      setIsLoading(false);
      setRegisterError(
        error.message || "Google registration failed. Please try again."
      );
    }
  };

  const clearingForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setTouched({
      name: false,
      email: false,
      password: false,
      confirmPassword: false,
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
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (dotsRef.current[i] = el)}
            className={`absolute w-3 h-3 bg-white rounded-full ${
              i % 3 === 0
                ? "opacity-40"
                : i % 3 === 1
                ? "opacity-20"
                : "opacity-10"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Geometric Grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-8 gap-8 h-full">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="border-r border-gray-800 h-full" />
            ))}
          </div>
          <div className="absolute inset-0 grid grid-rows-8 gap-8">
            {[...Array(8)].map((_, i) => (
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
          onSubmit={handleRegister}
          className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl backdrop-blur-sm"
        >
          {/* Title Section */}
          <div ref={titleRef} className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700 shadow-lg">
                <span className="text-white text-xl font-bold">R</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full animate-pulse" />
            </div>
            <h1 className="text-3xl ml-4 font-bold text-white">
              Create Account
            </h1>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Name Field */}
            <div
              ref={(el) => (fieldsRef.current[0] = el)}
              className="relative group"
            >
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Full Name
              </label>
              <div className="relative">
                <input
                  className={`w-full px-4 py-3 pr-10 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                    touched.name
                      ? nameValidation.isValid
                        ? "border-green-500 focus:border-green-400 focus:ring-2 focus:ring-green-500/20"
                        : "border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20"
                      : "border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  }`}
                  type="text"
                  placeholder="Enter your full name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => handleFieldFocus(0, "name")}
                  onBlur={() => handleFieldBlur(0)}
                />
                {touched.name && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {nameValidation.isValid ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </div>
                )}
              </div>
              {touched.name && !nameValidation.isValid && (
                <p
                  ref={(el) => (validationRef.current[0] = el)}
                  className="text-red-400 text-xs mt-1 opacity-0"
                >
                  {nameValidation.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div
              ref={(el) => (fieldsRef.current[1] = el)}
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
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => handleFieldFocus(1, "email")}
                  onBlur={() => handleFieldBlur(1)}
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
                  ref={(el) => (validationRef.current[1] = el)}
                  className="text-red-400 text-xs mt-1 opacity-0"
                >
                  {emailValidation.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div
              ref={(el) => (fieldsRef.current[2] = el)}
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
                  placeholder="Create a strong password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => handleFieldFocus(2, "password")}
                  onBlur={() => handleFieldBlur(2)}
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
              {touched.password && password && (
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Password Strength</span>
                    <span>{passwordValidation.strength}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        passwordValidation.strength < 40
                          ? "bg-red-500"
                          : passwordValidation.strength < 80
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${passwordValidation.strength}%` }}
                    />
                  </div>
                  {!passwordValidation.isValid &&
                    Array.isArray(passwordValidation.message) && (
                      <div className="mt-2 text-xs text-red-400">
                        <p>Password must contain:</p>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          {passwordValidation.message.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div
              ref={(el) => (fieldsRef.current[3] = el)}
              className="relative group"
            >
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  className={`w-full px-4 py-3 pr-20 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                    touched.confirmPassword
                      ? confirmPasswordValidation.isValid
                        ? "border-green-500 focus:border-green-400 focus:ring-2 focus:ring-green-500/20"
                        : "border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20"
                      : "border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  }`}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => handleFieldFocus(3, "confirmPassword")}
                  onBlur={() => handleFieldBlur(3)}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  {touched.confirmPassword && confirmPassword && (
                    <div>
                      {confirmPasswordValidation.isValid ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </div>
                  )}
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-300 transition-colors duration-200"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              {touched.confirmPassword &&
                !confirmPasswordValidation.isValid && (
                  <p
                    ref={(el) => (validationRef.current[3] = el)}
                    className="text-red-400 text-xs mt-1 opacity-0"
                  >
                    {confirmPasswordValidation.message}
                  </p>
                )}
            </div>
          </div>

          {/* Error Message */}
          {registerError && (
            <div className="error-message mt-6 p-4 bg-red-900/30 border border-red-700/50 rounded-lg">
              <p className="text-red-300 text-sm flex items-center">
                <FaTimes className="mr-2" />
                {registerError}
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-8 space-y-4">
            {/* Register Button */}
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
                    Creating Account...
                  </>
                ) : (
                  <>
                    <FaCheck className="mr-2" />
                    Create Account
                  </>
                )}
              </span>
            </button>

            {/* Google Register Button */}
            <button
              ref={(el) => (buttonsRef.current[1] = el)}
              type="button"
              onClick={handleGoogleRegister}
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

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 hover:text-blue-400 font-semibold transition-colors duration-200 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

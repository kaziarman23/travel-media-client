import { useState } from "react";

const Register = () => {
  // Demo states (your original functionality remains the same)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Demo handlers (replace with your original handlers)
  const handleRegister = (e) => {
    e.preventDefault();
    setRegisterError("");
    setIsLoading(true);

    // Your original validation logic
    if (password.length < 6) {
      setIsLoading(false);
      return setRegisterError("Password must be at least 6 characters long.");
    }

    if (!/[A-Z]/.test(password)) {
      setIsLoading(false);
      return setRegisterError(
        "Password must contain at least one uppercase letter."
      );
    }

    if (!/[a-z]/.test(password)) {
      setIsLoading(false);
      return setRegisterError(
        "Password must contain at least one lowercase letter."
      );
    }

    // Demo success (replace with your original createUser logic)
    setTimeout(() => {
      setIsLoading(false);
      alert("Demo: Registration successful!");
    }, 2000);
  };

  const handleGoogleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Demo success (replace with your original createUserWithGoogle logic)
    setTimeout(() => {
      setIsLoading(false);
      alert("Demo: Google registration successful!");
    }, 2000);
  };

  const EyeIcon = ({ show }) => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      {show ? (
        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
      ) : (
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
      )}
      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
    </svg>
  );

  const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27272727,0 3.28636364,2.6909091 1.63636364,6.65454545 L5.26620003,9.76452941 Z"/>
      <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.63636364,17.3545455 C3.28636364,21.3181818 7.27272727,24 12,24 C14.9677777,24 17.7447899,22.9424658 19.834192,20.9447899 L16.0407269,18.0125889 Z"/>
      <path fill="#4A90E2" d="M19.834192,20.9447899 C22.0291667,18.9476744 23.6363636,15.9547899 23.6363636,12 C23.6363636,11.2909091 23.5454545,10.5818182 23.3636364,9.90909091 L12,9.90909091 L12,14.4545455 L18.4090909,14.4545455 C18.05,16.0181818 17.1363636,17.2272727 15.8181818,18.0363636 L19.834192,20.9447899 Z"/>
      <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.63636364,6.65454545 C0.590909091,8.13636364 0,9.90909091 0,12 C0,14.0909091 0.590909091,15.8636364 1.63636364,17.3454545 L5.27698177,14.2678769 Z"/>
    </svg>
  );

  const UserIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-60 h-60 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" style={{animationDelay: '6s'}}></div>
      </div>

      {/* Main container */}
      <div className="relative w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <UserIcon />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent mb-2">
              Create Account
            </h1>
            <p className="text-gray-400 text-sm">Join us today and get started</p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Name field */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors group-focus-within:text-pink-400">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 focus:outline-none transition-all duration-300"
                  placeholder="Enter your full name"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Email field */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors group-focus-within:text-pink-400">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 focus:outline-none transition-all duration-300"
                  placeholder="Enter your email"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Password field */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors group-focus-within:text-pink-400">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 focus:outline-none transition-all duration-300"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <EyeIcon show={!showPassword} />
                </button>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Password requirements */}
            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <p className="text-xs text-gray-400 mb-2">Password must contain:</p>
              <div className="space-y-1">
                <div className={`text-xs flex items-center gap-2 ${password.length >= 6 ? 'text-green-400' : 'text-gray-400'}`}>
                  <div className={`w-2 h-2 rounded-full ${password.length >= 6 ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                  At least 6 characters
                </div>
                <div className={`text-xs flex items-center gap-2 ${/[A-Z]/.test(password) ? 'text-green-400' : 'text-gray-400'}`}>
                  <div className={`w-2 h-2 rounded-full ${/[A-Z]/.test(password) ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                  One uppercase letter
                </div>
                <div className={`text-xs flex items-center gap-2 ${/[a-z]/.test(password) ? 'text-green-400' : 'text-gray-400'}`}>
                  <div className={`w-2 h-2 rounded-full ${/[a-z]/.test(password) ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                  One lowercase letter
                </div>
              </div>
            </div>

            {/* Error message */}
            {registerError && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 animate-bounce">
                <p className="text-red-400 text-sm">{registerError}</p>
              </div>
            )}

            {/* Register button */}
            <button
              onClick={handleRegister}
              disabled={isLoading}
              className="w-full relative bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span className={isLoading ? "opacity-0" : "opacity-100"}>
                Create Account
              </span>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center">
              <div className="flex-1 border-t border-white/20"></div>
              <span className="px-4 text-gray-400 text-sm">Or register with</span>
              <div className="flex-1 border-t border-white/20"></div>
            </div>

            {/* Google register button */}
            <button
              onClick={handleGoogleRegister}
              disabled={isLoading}
              className="w-full bg-white/5 hover:bg-white/10 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] border border-white/10 hover:border-white/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <GoogleIcon />
              Continue with Google
            </button>
          </div>

          {/* Login link */}
          <div className="text-center mt-8 pt-6 border-t border-white/10">
            <p className="text-gray-400">
              Already have an account?{" "}
              <span className="text-pink-400 hover:text-pink-300 font-medium hover:underline transition-colors duration-200 cursor-pointer">
                Sign in here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
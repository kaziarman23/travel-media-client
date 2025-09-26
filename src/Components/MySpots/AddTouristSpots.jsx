import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaGlobe,
  FaDollarSign,
  FaSun,
  FaClock,
  FaUsers,
  FaCamera,
  FaPlus,
  FaTimes,
  FaArrowLeft,
  FaCheck,
  FaUpload,
  FaImage,
  FaInfoCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { useAddSpotMutation } from "../../Redux/features/api/allSpotsApi";
import { useSelector } from "react-redux";

const AddTouristSpots = () => {
  // States
  const navigate = useNavigate();
  const [spot, setSpot] = useState("");
  const [country, setCountry] = useState("");
  const [average_cost, setAverage_cost] = useState("");
  const [seasonality, setSeasonality] = useState("");
  const [travel_time, setTravel_time] = useState("");
  const [totalVisitorsPerYear, setTotalVisitorsPerYear] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  // Redux
  const { userName, userEmail } = useSelector((state) => state.userSlice);
  const [addSpot, { isLoading: isSubmitting, error, isError }] =
    useAddSpotMutation();

  // Animation trigger
  useState(() => {
    setTimeout(() => setIsLoaded(true), 200);
  }, []);

  // Handle image URL change with preview
  const handleImageChange = (e) => {
    const imageUrl = e.target.value;
    setImage(imageUrl);
    setImagePreview(imageUrl);
  };

  // Validate form
  const validateForm = () => {
    if (!spot.trim()) {
      toast.error("Please enter a tourist spot name");
      return false;
    }
    if (!country.trim()) {
      toast.error("Please enter a country name");
      return false;
    }
    if (!average_cost.trim()) {
      toast.error("Please enter the average cost");
      return false;
    }
    if (!image.trim()) {
      toast.error("Please provide an image URL");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const addingSpotInfo = {
      spot: spot.trim(),
      country: country.trim(),
      average_cost: average_cost.startsWith("$")
        ? average_cost
        : `$${average_cost}`,
      seasonality: seasonality.trim(),
      travel_time: travel_time.trim(),
      totalVisitorsPerYear: totalVisitorsPerYear.trim(),
      image: image.trim(),
      description: description.trim(),
      email: userEmail,
      createdAt: new Date().toISOString(),
      createdBy: userEmail,
    };

    try {
      await addSpot(addingSpotInfo).unwrap();
      clearInputs();
      navigate("/AllTouristSpots");
      toast.success("Tourist Spot Added Successfully!");
    } catch (error) {
      console.error("Error adding tourist spot:", error);
      toast.error("Failed to add tourist spot. Please try again.");
    }
  };

  const handleCancel = () => {
    clearInputs();
    navigate("/AllTouristSpots");
  };

  const clearInputs = () => {
    setSpot("");
    setCountry("");
    setAverage_cost("");
    setSeasonality("");
    setTravel_time("");
    setTotalVisitorsPerYear("");
    setImage("");
    setDescription("");
    setImagePreview("");
  };

  // Predefined options for better UX
  const seasonalityOptions = [
    "Spring (March - May)",
    "Summer (June - August)",
    "Fall (September - November)",
    "Winter (December - February)",
    "Year Round",
    "Dry Season",
    "Wet Season",
  ];

  const countryOptions = [
    "Bangladesh",
    "India",
    "Pakistan",
    "Nepal",
    "Sri Lanka",
    "Maldives",
    "Thailand",
    "Malaysia",
    "Singapore",
    "Indonesia",
    "Philippines",
    "Vietnam",
    "Japan",
    "South Korea",
    "China",
    "Turkey",
    "UAE",
    "Egypt",
    "Morocco",
    "France",
    "Italy",
    "Spain",
    "Germany",
    "United Kingdom",
    "Greece",
    "United States",
    "Canada",
    "Mexico",
    "Brazil",
    "Argentina",
    "Chile",
    "Australia",
    "New Zealand",
    "South Africa",
    "Kenya",
    "Tanzania",
  ];

  if (!userEmail) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <div className="text-center text-white animate-fade-in">
          <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaExclamationTriangle className="text-3xl text-red-400" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
          <p className="text-gray-400 mb-6">
            Please login to add tourist spots.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 hover:scale-105"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (isError) {
    console.log("Error when fetching bookings data: ", error);
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load tourist Bookings
      </div>
    );
  }

  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden">
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
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-white rounded-full animate-float ${
              i % 3 === 0
                ? "opacity-30"
                : i % 3 === 1
                ? "opacity-20"
                : "opacity-10"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaPlus className="text-3xl text-blue-400" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Add New
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              Tourist Destination
            </span>
          </h1>

          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Share an amazing destination with fellow travelers and help expand
            our global travel community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preview Card */}
          <div
            className={`lg:col-span-1 transition-all duration-1000 delay-200 ${
              isLoaded
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm hover:border-gray-700 transition-all duration-300 sticky top-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                <FaImage className="text-blue-400" />
                <span>Preview</span>
              </h3>

              {/* Image Preview */}
              <div className="relative mb-6">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-xl"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className={`w-full h-48 bg-gray-800/50 border-2 border-dashed border-gray-600 rounded-xl flex items-center justify-center ${
                    imagePreview ? "hidden" : "flex"
                  }`}
                >
                  <div className="text-center">
                    <FaCamera className="text-3xl text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">
                      Image preview will appear here
                    </p>
                  </div>
                </div>
              </div>

              {/* Preview Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <FaMapMarkerAlt className="text-blue-400" />
                  <span className="text-gray-300">
                    {spot || "Destination Name"}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaGlobe className="text-green-400" />
                  <span className="text-gray-300">{country || "Country"}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaDollarSign className="text-yellow-400" />
                  <span className="text-gray-300">
                    {average_cost ? `$${average_cost}` : "Cost"}
                  </span>
                </div>
                {seasonality && (
                  <div className="flex items-center space-x-2">
                    <FaSun className="text-orange-400" />
                    <span className="text-gray-300">{seasonality}</span>
                  </div>
                )}
              </div>

              {/* Tips */}
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <div className="flex items-start space-x-2">
                  <FaInfoCircle className="text-blue-400 mt-1" />
                  <div className="text-sm">
                    <p className="font-semibold text-white mb-1">
                      Tips for better listings:
                    </p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Use high-quality images</li>
                      <li>• Provide accurate cost estimates</li>
                      <li>• Include detailed descriptions</li>
                      <li>• Specify best visiting seasons</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div
            className={`lg:col-span-2 transition-all duration-1000 delay-400 ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <FaUpload className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Destination Details
                  </h2>
                  <p className="text-gray-400">
                    Fill in the information about your tourist spot
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-white font-medium">
                      <FaMapMarkerAlt className="text-blue-400" />
                      <span>Tourist Spot Name *</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Eiffel Tower, Machu Picchu"
                      value={spot}
                      onChange={(e) => setSpot(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-white font-medium">
                      <FaGlobe className="text-green-400" />
                      <span>Country *</span>
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      required
                    >
                      <option value="">Select a country</option>
                      {countryOptions.map((countryOption) => (
                        <option key={countryOption} value={countryOption}>
                          {countryOption}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Cost and Season */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-white font-medium">
                      <FaDollarSign className="text-yellow-400" />
                      <span>Average Cost (USD) *</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 500, 1200"
                      value={average_cost}
                      onChange={(e) =>
                        setAverage_cost(e.target.value.replace(/[^0-9]/g, ""))
                      }
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      required
                    />
                    <p className="text-gray-400 text-sm">
                      Enter numbers only (currency symbol will be added
                      automatically)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-white font-medium">
                      <FaSun className="text-orange-400" />
                      <span>Best Season</span>
                    </label>
                    <select
                      value={seasonality}
                      onChange={(e) => setSeasonality(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    >
                      <option value="">Select best season</option>
                      {seasonalityOptions.map((season) => (
                        <option key={season} value={season}>
                          {season}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Visitors and Travel Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-white font-medium">
                      <FaUsers className="text-purple-400" />
                      <span>Annual Visitors</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 1 million, 500,000"
                      value={totalVisitorsPerYear}
                      onChange={(e) => setTotalVisitorsPerYear(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-white font-medium">
                      <FaClock className="text-cyan-400" />
                      <span>Recommended Duration</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 3-5 days, 1 week"
                      value={travel_time}
                      onChange={(e) => setTravel_time(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-white font-medium">
                    <FaCamera className="text-pink-400" />
                    <span>Image URL *</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={image}
                    onChange={handleImageChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    required
                  />
                  <p className="text-gray-400 text-sm">
                    Provide a high-quality image URL for your destination
                  </p>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-white font-medium">
                    <FaInfoCircle className="text-indigo-400" />
                    <span>Description (Optional)</span>
                  </label>
                  <textarea
                    placeholder="Describe what makes this destination special..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-vertical"
                  />
                </div>

                {/* Contributor Info */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">
                    Contributor Information
                  </h4>
                  <div className="text-sm text-gray-300">
                    <p>
                      Added by:{" "}
                      <span className="text-blue-400">{userName}</span>
                    </p>
                    <p>
                      Email: <span className="text-blue-400">{userEmail}</span>
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/30 ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Adding Destination...</span>
                      </>
                    ) : (
                      <>
                        <FaCheck />
                        <span>Add Tourist Spot</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 flex items-center justify-center space-x-3 px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <FaTimes />
                    <span>Cancel</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div
          className={`text-center mt-12 transition-all duration-1000 delay-600 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <button
            onClick={() => navigate("/AllTouristSpots")}
            className="inline-flex items-center space-x-3 px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to All Destinations</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AddTouristSpots;

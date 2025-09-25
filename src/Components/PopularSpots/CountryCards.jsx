import { Link } from "react-router-dom";
import UseExploreBtn from "../CustomHooks/UseExploreBtn";
import { useGetBestSpotsQuery } from "../../Redux/features/api/bestSpotsApi";

const CountryCards = () => {
  const {
    data: countrys = [],
    isLoading,
    isError,
    error,
  } = useGetBestSpotsQuery();

  if (isLoading) {
    return (
      <div className="text-center py-20 text-gray-400">Loading data...</div>
    );
  }

  if (isError) {
    console.error("Error fetching best spot data:", error);
    return (
      <div className="text-center py-20 text-red-500">Failed to load data.</div>
    );
  }

  return (
    <div className="w-11/12 mx-auto xl:w-4/5 py-10">
      <h1 className="text-center text-silver font-bold text-xl sm:text-2xl md:text-3xl mb-4">
        Explore the World Your Way with Travel Media
      </h1>
      <p className="text-light-silver text-center text-sm md:text-base max-w-3xl mx-auto mb-10">
        At Travel Media, we design travel experiences as unique as your dreams.
        Whether you’re looking for a quiet retreat in nature, a heart-pounding
        adventure in the mountains, or a cultural journey through ancient
        cities, we’re here to make it happen. Our personalized approach means
        every detail is thoughtfully curated to match your travel style. From
        luxurious escapes to off-the-beaten-path gems, Travel Media is your key
        to unforgettable journeys.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
        {countrys.map((country) => (
          <div
            key={country.id}
            className="w-full max-w-sm bg-gray-900/80 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden text-white flex flex-col h-[500px]" // Fixed height
          >
            <figure className="overflow-hidden rounded-t-2xl h-48">
              <img
                src={country.img}
                alt={country.country}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </figure>
            <div className="p-5 flex flex-col flex-1">
              <h2 className="text-2xl font-bold mb-2">{country.country}</h2>
              <p className="text-gray-300 text-sm flex-1 mb-4 overflow-hidden">
                {country.description}
              </p>
              <div className="mt-auto flex justify-end">
                <Link to={`/alltouristspots/touristspot/${country._id}`}>
                  <UseExploreBtn>Explore</UseExploreBtn>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryCards;

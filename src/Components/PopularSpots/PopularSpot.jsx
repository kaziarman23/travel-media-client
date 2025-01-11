import { Link, useParams } from "react-router-dom";
import UseBackBtn from "../CustomHooks/UseBackBtn";
import Loader from "../CustomHooks/Loader";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import UseBookingBtn from "../CustomHooks/UseBookingBtn";

const PopularSpot = () => {
  const { popularSpots } = useContext(AuthContext);
  const { country, spot_id } = useParams();

  const countryData = popularSpots.find((spot) => spot.name === country);

  // find the country data by matching the country name from the URL
  const spotData = countryData.plases.find(
    (plase) => plase.spot_id === Number(spot_id)
  );

  useEffect(() => {
    // rendering popularSpots and checking popularSpots has data or not
    if (!popularSpots || !popularSpots.length) {
      return <Loader>Loading spot data...</Loader>;
    }
    //  If no country data is found, going show a loader with a message
    if (!countryData) {
      return (
        <Loader>Wanted country data not found. Try again later....</Loader>
      );
    }
    if (!spotData) {
      return <Loader>Wanted spot data not found. Try again later....</Loader>;
    }
  }, [popularSpots, countryData, spotData]);

  return (
    <div className="w-full h-full gap-10 flex justify-center items-center flex-col bg-slate-900">
      <div className="w-11/12 h-full mx-auto mt-5 text-white bg-black shadow-xl shadow-black rounded-xl">
        <h1 className="text-base text-center font-bold p-5 xl:text-xl">
          Details About {spotData.spot}
        </h1>

        <div className="flex justify-center items-center gap-5 flex-col xl:flex-row">
          <div className="w-full h-full flex justify-center items-center">
            <img
              src={spotData.image}
              alt={spotData.spot}
              className="w-4/5 h-full rounded-xl object-cover"
            />
          </div>

          <div className="w-11/12 text-white text-left text-sm my-10 space-y-5 sm:text-base md:text-lg xl:text-base">
            <h2>Spot name: {spotData.spot}</h2>
            <h3>Country name: {spotData.country}</h3>
            <h3>Average cost: {spotData.average_cost}</h3>
            <h3>Visitors per year: {spotData.totalVisitorsPerYear}</h3>
            <h3>Travel time: {spotData.travel_time}</h3>
            <h3>Seasonality: {spotData.seasonality}</h3>
            <div>
              <Link to="/booking" state={{ spotData }}>
                <UseBookingBtn>Book Now</UseBookingBtn>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-4/5 h-20 mx-auto">
        <UseBackBtn>Go Back</UseBackBtn>
      </div>
    </div>
  );
};

export default PopularSpot;

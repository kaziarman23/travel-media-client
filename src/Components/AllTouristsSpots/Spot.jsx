import { useParams } from "react-router-dom";
import UseBackBtn from "../CustomHooks/UseBackBtn";
import Loader from "../CustomHooks/Loader";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import UseApplayBtn from "../CustomHooks/UseApplayBtn";

const Spot = () => {
  const { spotCards } = useContext(AuthContext);
  const { country, spot_id } = useParams();

  useEffect(() => {
    // rendering spotCards
  }, [spotCards]);

  // checking spotCards has data or not
  if (!spotCards || !spotCards.length) {
    return <Loader>Loading spot data...</Loader>;
  }

  // find the country data by matching the country name from the URL
  const countryData = spotCards.find((spot) => spot.name === country);
  //  If no country data is found, going show a loader with a message
  if (!countryData) {
    return <Loader>Wanted country data not found. Try again later....</Loader>;
  }

  const spotData = countryData.plases.find(
    (plase) => plase.spot_id === Number(spot_id)
  );

  if (!spotData) {
    return <Loader>Wanted spot data not found. Try again later....</Loader>;
  }

  const handleBooking = () => {
    // going to do some thing
  };

  return (
    <div className="w-full h-[800px] gap-10 flex justify-center items-center flex-col bg-slate-900">
      <div className="w-4/5 h-[480px] mx-auto text-white bg-black shadow-xl shadow-black rounded-xl">
        <h1 className="text-2xl text-center font-bold p-5">
          Details About {spotData.spot}
        </h1>

        <div className="flex justify-center items-center gap-5">
          <div className="w-1/2 flex justify-center items-center">
            <img
              src={spotData.image}
              alt={spotData.spot}
              className="w-4/5 rounded-xl object-cover"
            />
          </div>

          <div className="w-1/2 text-white text-left ml-5 my-10 space-y-5">
            <h2 className="text-lg font-semibold">
              Spot name: {spotData.spot}
            </h2>
            <h3 className="text-lg font-semibold">
              Country name: {spotData.country}
            </h3>
            <h3 className="text-lg font-semibold">
              Average cost: {spotData.average_cost}
            </h3>
            <h3 className="text-lg font-semibold">
              Visitors per year: {spotData.totalVisitorsPerYear}
            </h3>
            <h3 className="text-lg font-semibold">
              Travel time: {spotData.travel_time}
            </h3>
            <h3 className="">Seasonality: {spotData.seasonality}</h3>
            <button onClick={handleBooking}>
              <UseApplayBtn>Get it Now</UseApplayBtn>
            </button>
          </div>
        </div>
      </div>
      <div className="w-4/5 h-20 mx-auto">
        <UseBackBtn>Go Back</UseBackBtn>
      </div>
    </div>
  );
};

export default Spot;

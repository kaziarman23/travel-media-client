import { Link, useParams } from "react-router-dom";
import BackBtn from "../CustomHooks/BackBtn";
import Loader from "../CustomHooks/Loader";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Spot = () => {
  const { spotCards } = useContext(AuthContext);
  const { country, spot_id } = useParams();

  useEffect(() => {
    console.log("spotCards in Spot component:", spotCards);
    // rendering spotCards
  }, [spotCards, spot_id]);

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

  return (
    <div
      className="w-full h-[800px] gap-10 flex justify-center items-center flex-col"
      style={{
        backgroundColor: "#111111",
        backgroundImage:
          "linear-gradient(32deg,rgba(8, 8, 8, 0.74) 30pxtransparent)",
        backgroundSize: "60px, 60px",
        backgroundPosition: "-5px, -5px",
      }}
    >
      <div className="w-4/5 mx-auto text-white bg-gray-900 shadow-xl shadow-black">
        <h1 className="text-2xl text-center font-bold p-5">
          Details About {spotData.spot}
        </h1>

        <div className="flex justify-center items-center gap-5">
          <div className="w-1/2 flex justify-center items-center">
            <img
              src={spotData.image}
              alt={spotData.spot}
              className="w-1/2 rounded-xl object-cover"
            />
          </div>

          <div className="w-1/2 text-white text-left ml-5 my-10 space-y-5">
            <h2>Spot name: {spotData.spot}</h2>
            <h3>Country name: {spotData.country}</h3>
            <h3>Average cost: {spotData.average_cost}</h3>
            <h3>Visitors per year: {spotData.totalVisitorsPerYear}</h3>
            <h3>Travel time: {spotData.travel_time}</h3>
            <h3>Seasonality: {spotData.seasonality}</h3>
            <Link to={""}>
              <button>Book Now</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-4/5 h-20 mx-auto">
        <BackBtn>Go Back</BackBtn>
      </div>
    </div>
  );
};

export default Spot;

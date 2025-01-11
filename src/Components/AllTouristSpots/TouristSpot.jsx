import { Link, useLoaderData, useParams } from "react-router-dom";
import UseBackBtn from "../CustomHooks/UseBackBtn";
import { useEffect, useState } from "react";
import UseBookingBtn from "../CustomHooks/UseBookingBtn";
import Loader from "../CustomHooks/Loader";

const TouristSpot = () => {
  const { _id } = useParams();
  const loadedData = useLoaderData();
  const [spotData, setSpotData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const spot = loadedData.find((plase) => plase._id === _id);
    setSpotData(spot);
    setLoading(false);
  }, [loadedData, _id, spotData]);

  // checking spotData has data or not
  if (loading) {
    return <Loader>Loading spot data...</Loader>;
  }

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

export default TouristSpot;

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
    // <div className="w-full h-screen gap-10 flex justify-center items-center flex-col bg-slate-900">
    <div className="w-full h-[800px] gap-10 flex justify-center items-center flex-col bg-slate-900 sm:h-[1000px] lg:h-[1100px] xl:h-screen">
      {/* <div className="w-4/5 h-[500px] mx-auto text-white bg-black shadow-xl shadow-black rounded-xl mt-8"> */}
      <div className="w-4/5 h-[650px] mx-auto text-white bg-black shadow-xl shadow-black rounded-xl mt-8 sm:h-[750px] lg:h-[900px] xl:h-[500px]">
        {/* <h1 className="text-2xl text-center font-bold p-5"> */}
        <h1 className="text-base text-center font-bold p-5 xl:text-2xl">
          Details About {spotData.spot}
        </h1>

        {/* <div className="flex justify-center items-center gap-5"> */}
        <div className="flex justify-center items-center gap-5 flex-col xl:flex-row">
          {/* <div className="w-1/2 flex justify-center items-center"> */}
          <div className="w-full flex justify-center items-center xl:w-1/2">
            <img
              src={spotData.image}
              alt={spotData.spot}
              className="w-4/5 rounded-xl object-cover"
            />
          </div>

          {/* <div className="w-1/2 text-white text-left ml-5 my-10 space-y-5"> */}
          <div className="w-full text-white text-left ml-5 my-10 space-y-5 xl:w-1/2">
            {/* <h2 className="text-lg font-semibold"> */}
            <h2 className="text-lg font-semibold xl:text-xl">
              Spot name: {spotData.spot}
            </h2>
            <h3 className="text-sm font-semibold xl:text-lg">
              Country name: {spotData.country}
            </h3>
            <h3 className="text-sm font-semibold xl:text-lg">
              Average cost: {spotData.average_cost}
            </h3>
            <h3 className="text-sm font-semibold xl:text-lg">
              Visitors per year: {spotData.totalVisitorsPerYear}
            </h3>
            <h3 className="text-sm font-semibold xl:text-lg">
              Travel time: {spotData.travel_time}
            </h3>
            <h3 className="text-sm font-semibold xl:text-lg">
              Seasonality: {spotData.seasonality}
            </h3>
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

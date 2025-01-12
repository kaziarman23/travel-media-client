import { Link } from "react-router-dom";
import UseBackBtn from "../CustomHooks/UseBackBtn";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useContext, useEffect, useState } from "react";
import Loader from "../CustomHooks/Loader";

const MyTouristSpots = () => {
  // context api
  const { user } = useContext(AuthContext);

  // states
  const [touristSpots, setTouristSpots] = useState("");

  useEffect(() => {
    fetch(
      `https://travel-media-server.vercel.app/allSpotsById?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => setTouristSpots(data));
  }, [user.email]);

  if (!touristSpots) {
    return <Loader />;
  }

  return (
    <>
      <div className="w-full h-full bg-BlackBg">
        <div className="w-4/5 h-full mx-auto">
          <h1 className="text-left text-silver font-bold text-base my-4 md:text-center md:text-xl lg:text-center lg:text-2xl">
            Your Personalized Travel Bucket List
          </h1>
          <p className="text-light-silver text-left">
            Here are the tourist spots you’ve added, tailored to fit your travel
            dreams. Get ready to experience the most amazing destinations with
            unique attractions that will leave you in awe.
          </p>
          <h1 className="text-left text-silver font-bold text-xl my-4">
            You have added {touristSpots.length} tourist spots.
          </h1>
          <div className="w-full h-full my-10 grid sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-8">
            {touristSpots.map((data, index) => (
              <div key={index}>
                <div className="w-full hover:shadow-2xl hover:shadow-white sm:w-72 sm:mx-auto md:w-60 md:mx-0 lg:w-60 xl:w-80">
                  <figure className="h-48 md:h-32 xl:h-48">
                    <img
                      src={data.image}
                      alt={data.spot}
                      className="w-full h-full rounded-t-xl object-cover"
                    />
                  </figure>
                  <div className="card-body rounded-b-xl gap-3 bg-[#000411]">
                    <h2 className="card-title md:text-sm lg:text-lg xl:text-xl">
                      {data.spot}
                    </h2>
                    <p className="md:text-sm lg:text-base">
                      Price: {data.average_cost}
                    </p>
                    <div className="card-actions">
                      <Link to={`/allTouristSpots/touristSpot/${data._id}`}>
                        <button className="btn btn-primary hover:btn-success hover:text-white">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <UseBackBtn>Go Back</UseBackBtn>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyTouristSpots;

import { useContext, useEffect, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import Loader from "../CustomHooks/Loader";
import UseBackBtn from "../CustomHooks/UseBackBtn";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const AllPopularSpots = () => {
  const { country } = useParams();
  const loadedData = useLoaderData();
  const [loading, setLoading] = useState(true);

  const { popularSpots, setPopularSpots } = useContext(AuthContext);

  useEffect(() => {
    // filtering datas for right data
    const currentData = loadedData.filter((spot) => spot.name === country);
    setPopularSpots(currentData);
    setLoading(false);
  }, [loadedData, country, setPopularSpots]);

  // setting loaders to load the data properly
  if (loading || !popularSpots.length) {
    return <Loader />;
  }

  return (
    <div className="w-full h-full overflow-hidden bg-BlackBg">
      <div className="w-11/12 text-white mx-auto lg:w-4/5">
        <h1 className="text-left font-bold text-base my-5 sm:text-xl lg:text-center lg:text-2xl">
          {popularSpots[0]?.title}
        </h1>
        <p className="text-left text-sm">{popularSpots[0]?.description}</p>
        <h2 className="text-base my-3 font-bold sm:text-xl lg:text-2xl">
          Here are some popular tourist spots in {popularSpots[0]?.name} :
        </h2>

        {/* card section start */}
        <div className="w-full h-full grid gap-5 place-items-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {popularSpots[0]?.plases.map((plase, index) => (
            <div key={index} className="w-full max-w-sm">
              <div className="w-full h-full hover:shadow-2xl hover:shadow-white">
                <img
                  src={plase.image}
                  alt={plase.spot}
                  className="w-full h-60 rounded-t-xl object-cover lg:h-52"
                />
                <div className="card-body rounded-b-xl gap-3 bg-[#000411] p-4">
                  <h2 className="card-title text-lg font-bold">{plase.spot}</h2>
                  <p className="h-20 text-sm">Price: {plase.average_cost}</p>
                  <div className="card-actions mt-4">
                    <Link
                      to={`/popularSpots/${plase.country}/popularSpot/${plase.spot_id}`}
                    >
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
        {/* card section end */}
      </div>
      <div className="w-4/5 h-20 mx-auto">
        {/* <div className="w-full h-20 mx-auto"> */}
        <UseBackBtn>Go Back</UseBackBtn>
      </div>
    </div>
  );
};

export default AllPopularSpots;

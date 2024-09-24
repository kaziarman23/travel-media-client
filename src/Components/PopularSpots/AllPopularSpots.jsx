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
    <div className="w-full h-[3400px] overflow-hidden bg-BlackBg sm:h-[3000px] md:h-[1800px] lg:h-[1300px]">
      <div className="w-4/5 text-white mx-auto">
        <h1 className="text-left font-bold text-2xl my-5 lg:text-center">
          {popularSpots[0]?.title}
        </h1>
        <p className=" text-left">{popularSpots[0]?.description}</p>
        <h2 className=" text-xl my-3 font-bold">
          Here are some popular tourist spots in {popularSpots[0]?.name} :
        </h2>
        <div className="w-full  grid sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-5 place-items-center my-10">
          {popularSpots[0]?.plases.map((plase, index) => (
            <div key={index}>
              <div className="w-60 hover:shadow-2xl hover:shadow-white sm:w-80 md:w-60 xl:w-80">
                <figure className="h-48">
                  <img
                    src={plase.image}
                    alt={plase.spot}
                    className="w-full h-full rounded-t-xl object-cover"
                  />
                </figure>
                <div className="card-body rounded-b-xl gap-3 bg-[#000411]">
                  <h2 className="card-title">{plase.spot}</h2>
                  <p className="h-20">Price: {plase.average_cost}</p>
                  <div className="card-actions">
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
      </div>
      <div className="w-4/5 h-20 mx-auto">
        {/* <div className="w-full h-20 mx-auto"> */}
        <UseBackBtn>Go Back</UseBackBtn>
      </div>
    </div>
  );
};

export default AllPopularSpots;

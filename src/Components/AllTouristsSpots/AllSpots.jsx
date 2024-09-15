import { useEffect, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import Loader from "../CustomHooks/Loader";
import BackBtn from "../CustomHooks/BackBtn";

const AllSpots = () => {
  const { country } = useParams();
  const loadedData = useLoaderData();
  const [spotDatas, setSpotDatas] = useState([]);
  const [spotCards, setSpotCards] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // storing datas in a state
    setSpotDatas(loadedData);

    // filtering datas for right data
    const CurrentData = spotDatas.filter((spot) => spot.name === country);
    setSpotCards(CurrentData);
    setLoading(false);
  }, [country, spotDatas, loadedData]);

  // setting loaders to load the data properly
  if (loading || !spotCards.length) {
    return <Loader />;
  }

  return (
    <div className="w-full h-auto overflow-hidden bg-BlackBg">
      <div className="w-4/5 h-full text-white mx-auto my-20">
        <h1 className="text-center font-bold text-2xl my-5">
          {spotCards[0]?.title}
        </h1>
        <p className=" text-left">{spotCards[0]?.description}</p>
        <h2 className=" text-xl my-3 font-bold">
          Here are some popular tourist spots in {spotCards[0].name} :
        </h2>
        <div className="w-full h-full grid sm:grid-cols-1 mg:grid-cols-2  lg:grid-cols-3 gap-5 place-items-center my-10">
          {spotCards[0]?.plases.map((plase, index) => (
            <div key={index}>
              <div className="w-80 hover:shadow-2xl hover:shadow-white">
                <figure className="h-48">
                  <img
                    src={plase.image}
                    alt={plase.spot}
                    className="w-full h-full rounded-t-xl object-cover"
                  />
                </figure>
                <div className="card-body rounded-b-xl gap-3 bg-[#000411]">
                  <h2 className="card-title">{plase.spot}</h2>
                  <p>Price: {plase.average_cost}</p>
                  <div className="card-actions">
                    <button className="btn btn-primary hover:btn-success hover:text-white">
                      More Informetion
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-4/5 h-20 mx-auto">
        <Link to="/AllTouristsSpots">
          <BackBtn>Go Back</BackBtn>
        </Link>
      </div>
    </div>
  );
};

export default AllSpots;

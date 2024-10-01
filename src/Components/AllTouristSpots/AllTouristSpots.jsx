import { Link, useLoaderData } from "react-router-dom";
import UseBackBtn from "../CustomHooks/UseBackBtn";

const AllTouristSpots = () => {
  const loadedData = useLoaderData();

  return (
    <>
      <div className="w-full h-auto bg-BlackBg">
        <div className="w-4/5 h-full mx-auto">
          <h1 className="text-left text-silver font-bold text-xl my-4 md:text-center md:text-xl lg:text-center lg:text-2xl">
            Discover the World&#39;s Best Destinations with Travel Media
          </h1>
          <p className="text-light-silver text-left">
            At Travel Media, we bring you closer to the world&#39;s most
            breathtaking tourist spots. From serene beaches and majestic
            mountains to vibrant cities and ancient wonders, we have curated an
            extensive collection of must-see destinations for every type of
            traveler. Whether you&#39;re planning a relaxing retreat or an
            action-packed adventure, our expert guides and insider knowledge
            ensure you experience the best each location has to offer. Start
            exploring today and uncover hidden gems and iconic landmarks across
            the globe all at your fingertips with Travel Media
          </p>
          <div className="w-full h-full my-10 grid sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-8">
            {loadedData.map((data, index) => (
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
                    <h2 className="card-title md:text-sm lg:text-lg xl:text-xl">{data.spot}</h2>
                    <p className="md:text-sm lg:text-base">Price: {data.average_cost}</p>
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

export default AllTouristSpots;

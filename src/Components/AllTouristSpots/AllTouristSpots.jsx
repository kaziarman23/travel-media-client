import { Link, useLoaderData } from "react-router-dom";
import UseBackBtn from "../CustomHooks/UseBackBtn";

const AllTouristSpots = () => {
  const loadedData = useLoaderData();

  return (
    <>
      <div className="w-full h-full bg-BlackBg">
        <div className="w-4/5 h-full mx-auto">
          <h1 className="text-left text-silver font-bold text-base my-4 sm:text-xl md:text-center lg:text-center lg:text-2xl">
            Discover the World&#39;s Best Destinations with Travel Media
          </h1>
          <p className="text-light-silver text-left text-sm sm:text-base">
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
          <div className="w-full h-full my-10 grid sm:grid-cols-2 md:grid-cols-2  lg:grid-cols-3 gap-8">
            {loadedData.map((data, index) => (
              <div key={index}>
                <div className="w-full hover:shadow-2xl hover:shadow-white">
                  <figure className="h-48 sm:h-32 md:h-40 xl:h-48">
                    <img
                      src={data.image}
                      alt={data.spot}
                      className="w-full h-full rounded-t-xl object-cover"
                    />
                  </figure>
                  <div className="card-body rounded-b-xl gap-3 bg-[#000411]">
                    <h2 className="card-title text-sm md:text-lg lg:text-base xl:text-xl">
                      {data.spot}
                    </h2>
                    <p className="text-sm md:text-base">
                      Price: {data.average_cost}
                    </p>
                    <div className="card-actions">
                      <Link to={`/allTouristSpots/touristSpot/${data._id}`}>
                        <button className="btn btn-primary text-sm hover:btn-success hover:text-white">
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

import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import "./CssSections/BestSpots.css";
import { Link } from "react-router-dom";

const BestSpots = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("https://travel-media-server.vercel.app/bestSpots")
      .then((res) => res.json())
      .then((datas) => setCards(datas));
  }, [cards]);

  return (
    <div className="mt-10 w-full h-full bg-slate-900 xl:h-screen">
      <div className="w-11/12 h-full mx-auto overflow-hidden xl:w-4/5">
        <h1 className="my-5 text-base font-bold text-silver text-left lg:text-center lg:text-2xl">
          Discover the World&#39;s Hidden Treasures with Travel Media
        </h1>
        <p className="mb-3 text-light-silver text-left text-sm">
          At Travel Media, we believe that every journey should be an
          unforgettable adventure. Our mission is to connect you with the most
          breathtaking and culturally rich destinations across the globe.
          Whether you&#39;re seeking serene beaches, bustling cities, or
          off-the-beaten-path wonders, we curate experiences tailored to your
          unique travel dreams. Explore our handpicked selection of popular
          travel spots, and let us guide you to destinations that inspire,
          rejuvenate, and amaze. With Travel Media, your next adventure is just
          a click away!
        </p>
        <Link to="/PopularSpots">
          <span className="text-blue-500 font-semibold">
            View All Tourists Spots
          </span>
        </Link>

        <div className="my-5 w-full h-full">
          {/* using react fast marquee for auto scroll */}
          <Marquee
            speed={50}
            pauseOnHover={true}
            // gradientColor={[255, 255, 255]}
            // gradient={false}
          >
            {cards.map((card) => (
              <div key={card.id} className="mr-5 my-5 ">
                <div className="card">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="card__content">
                    <p className="card__title">{card.title}</p>
                    <p className="text-sm">{card.description}</p>
                    <div>
                      <Link to={`/alltouristspots/touristspot/${card._id}`}>
                        <button className="btn mt-3 bg-white text-black hover:text-white hover:bg-black transition">
                          More Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default BestSpots;

import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import "./CssSections/BestSpots.css";
import { Link } from "react-router-dom";

const BestSpots = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("/BestSpots.json")
      .then((res) => res.json())
      .then((datas) => setCards(datas));
  }, [cards]);

  return (
    <div className="mt-10 w-full h-auto bg-slate-900">
      <div className="w-4/5 h-full mx-auto overflow-hidden">
        <h1 className="my-5 text-2xl font-bold text-silver text-center">
          Discover the World&#39;s Hidden Treasures with Travel Media
        </h1>
        <p className="mb-3 text-light-silver text-left">
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
          <span className="text-blue-500 font-semibold">View All Tourists Spots</span>
        </Link>

        <div className="my-5 w-full h-full">
          {/* using react fast marquee for auto scroll */}
          <Marquee
            speed={50}
            pauseOnHover={true}
            gradientColor={[255, 255, 255]}
            gradient={false}
          >
            {cards.map((card) => (
              <div key={card.id} className="mr-5 my-5">
                <div className="card">
                  <img
                    src={card.img}
                    alt={card.title}
                    className=" object-cover"
                  />
                  <div className="card__content">
                    <p className="card__title">{card.title}</p>
                    <p className="card__description">{card.description}</p>
                    <button className="btn btn-ghost btn-outline mt-3 text-white">
                      More Details
                    </button>
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

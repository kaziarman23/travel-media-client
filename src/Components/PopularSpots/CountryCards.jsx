import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import UseExploreBtn from "../CustomHooks/UseExploreBtn";

const CountryCards = () => {
  const [countrys, setCountrys] = useState([]);

  useEffect(() => {
    fetch("/Countrys.json")
      .then((res) => res.json())
      .then((data) => setCountrys(data))
      .catch((error) => console.log("error in the country section", error));
  }, []);

  return (
    <>
      <div className="w-4/5 h-[3800px] mx-auto sm:h-[1900px] lg:h-[1800px] xl:h-[1250px]">
        <h1 className="text-left text-silver font-bold text-2xl my-4 md:text-center">
          Explore the World Your Way with Travel Media
        </h1>
        <p className="text-light-silver text-left">
          At Travel Media, we design travel experiences as unique as your
          dreams. Whether you’re looking for a quiet retreat in nature, a
          heart-pounding adventure in the mountains, or a cultural journey
          through ancient cities, we’re here to make it happen. Our personalized
          approach means every detail is thoughtfully curated to match your
          travel style. From luxurious escapes to off-the-beaten-path gems,
          Travel Media is your key to unforgettable journeys.
        </p>
        <div className="w-full grid gap-5 place-items-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {countrys.map((country) => (
            <div key={country.id} className="my-10 ">
              <div className="w-64 h-auto rounded-xl hover:shadow-2xl hover:shadow-black shadow-xl shadow-black text-white sm:w-60 md:w-72 lg:w-80">
                <figure>
                  <img
                    src={country.img}
                    alt={country.country}
                    className="rounded-t-xl"
                  />
                </figure>
                <div className="rounded-b-xl flex flex-col mx-5">
                  <h2 className="card-title my-3">{country.country}</h2>
                  <p className="h-40 lg:h-32">{country.description}</p>
                  <div className="card-actions mt-2 mb-4 justify-end">
                    <Link to={`/popularSpots/${country.country}`}>
                      <UseExploreBtn>Explore</UseExploreBtn>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CountryCards;

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
      <div className="w-4/5 h-full mx-auto">
        <h1 className="text-center text-silver font-bold text-2xl my-4">
          Discover Your Next Adventure with Travel Media
        </h1>
        <p className="text-light-silver text-left">
          At Travel Media, we&#39;re passionate about turning your travel dreams
          into reality. Whether you&#39;re seeking a tranquil getaway, a
          thrilling adventure, or a cultural deep dive, our expert team is here
          to craft unforgettable experiences tailored to your desires. From
          pristine beaches to bustling city escapes, we connect you with the
          world&#39;s most iconic destinations and hidden gems. With our
          personalized service, your perfect vacation is just a click away. Let
          Travel Media be your gateway to the extraordinary because every
          journey should be as unique as you are.
        </p>
        <div className="w-full h-full grid sm:grid-cols-1 mg:grid-cols-2  lg:grid-cols-3 gap-5">
          {countrys.map((country) => (
            <div key={country.id} className="my-10 ">
              <div className="w-80 rounded-xl hover:shadow-2xl hover:shadow-black shadow-xl shadow-black text-white ">
                <figure>
                  <img
                    src={country.img}
                    alt={country.country}
                    className="rounded-t-xl"
                  />
                </figure>
                <div className="rounded-b-xl flex flex-col mx-5">
                  <h2 className="card-title my-3">{country.country}</h2>
                  <p className="h-32">{country.description}</p>
                  <div className="card-actions mt-2 mb-4 justify-end">
                    <Link to={`/popularspots/${country.country}`}>
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

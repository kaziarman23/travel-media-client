import { useEffect } from "react";
import { useState } from "react";

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
          some title
        </h1>
        <p className="text-light-silver text-left">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi
          aliquam qui, laboriosam, voluptatem soluta beatae nulla ullam nisi
          cumque perferendis debitis? Sit repellendus quisquam eius ipsum natus
          voluptatibus pariatur sint?
        </p>
        <div className="w-full h-full grid sm:grid-cols-1 mg:grid-cols-2  lg:grid-cols-3 gap-5">
          {countrys.map((country) => (
            <div key={country.id} className="my-10 ">
              <div className="CountryCard w-80 shadow-xl">
                <figure>
                  <img
                    src={country.img}
                    alt={country.country}
                    className="rounded-t-xl"
                  />
                </figure>
                <div className="flex flex-col mx-5 text-white">
                  <h2 className="card-title my-3">{country.country}</h2>
                  <p className="h-32">{country.description}</p>
                  <div className="card-actions my-2 justify-end">
                    <button className="btn btn-primary">View More</button>
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

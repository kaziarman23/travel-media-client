import { useContext, useState } from "react";
import UseBackBtn from "../CustomHooks/UseBackBtn";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const AddTouristSpots = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [spot, setSpot] = useState("");
  const [country, setCountry] = useState("");
  const [average_cost, setAverage_cost] = useState("");
  const [seasonality, setSeasonality] = useState("");
  const [travel_time, setTravel_time] = useState("");
  const [totalVisitorsPerYear, setTotalVisitorsPerYear] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState(user.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    const addingSpotInfo = {
      spot,
      country,
      average_cost: "$" + average_cost,
      seasonality,
      travel_time,
      totalVisitorsPerYear,
      image,
      email,
    };

    // sending details in the backend
    fetch("http://localhost:5000/AllSpots", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(addingSpotInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success",
            text: "Tourist Spot Added Successfully",
            icon: "success",
            background: "black",
            color: "white",
            confirmButtonText: "Cool",
            confirmButtonColor: "green",
          });

          // clearing inputs and navigating the user
          clearInputs();
          navigate("/AllTouristSpots");
        }
      })
      .catch((error) => console.log("error in Add Tourist spots page:", error));
  };

  const handleCancel = () => {
    clearInputs();
    navigate("/");
  };

  const clearInputs = () => {
    setSpot("");
    setCountry("");
    setAverage_cost("");
    setSeasonality("");
    setTravel_time("");
    setTotalVisitorsPerYear("");
    setImage("");
    setEmail("");
  };

  return (
    <div className="w-full h-auto bg-blackBg">
      <div className="w-4/5 h-full my-20 mx-auto">
        <h1 className="text-center text-2xl text-white">
          Adding a Tourist Spot
        </h1>
        <div className="w-full h-full">
          <div className="hero ">
            <div className="hero-content flex-col lg:flex-row ">
              <div className="w-full shrink-0 shadow-2xl bg-black rounded-xl">
                <form onSubmit={handleSubmit} className="card-body w-full">
                  {/* 1st row */}
                  <div className="flex justify-between gap-5">
                    <div className="form-control w-1/2">
                      <label className="label">
                        <span className="label-text text-white">
                          Travel Spot
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Travel Spot"
                        value={spot}
                        onChange={(e) => setSpot(e.target.value)}
                        className="input input-bordered text-white"
                      />
                    </div>
                    <div className="form-control w-1/2">
                      <label className="label">
                        <span className="label-text text-white">Country</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="input input-bordered text-white"
                      />
                    </div>
                  </div>
                  {/* 2st row */}
                  <div className="flex justify-between gap-5">
                    <div className="form-control w-1/2">
                      <label className="label">
                        <span className="label-text text-white">
                          Average Cost
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Average Cost"
                        value={average_cost}
                        onChange={(e) => setAverage_cost(e.target.value)}
                        className="input input-bordered text-white"
                      />
                    </div>
                    <div className="form-control w-1/2">
                      <label className="label">
                        <span className="label-text text-white">
                          Seasonality
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Seasonality"
                        value={seasonality}
                        onChange={(e) => setSeasonality(e.target.value)}
                        className="input input-bordered text-white"
                      />
                    </div>
                  </div>
                  {/* 3th row */}
                  <div className="flex justify-between gap-5">
                    <div className="form-control w-1/2">
                      <label className="label">
                        <span className="label-text text-white">
                          Visitors Per Year
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Total Visitors Per Year"
                        value={totalVisitorsPerYear}
                        onChange={(e) =>
                          setTotalVisitorsPerYear(e.target.value)
                        }
                        className="input input-bordered text-white"
                        required
                      />
                    </div>
                    <div className="form-control w-1/2">
                      <label className="label">
                        <span className="label-text text-white">
                          Travel Time
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Travel Time"
                        value={travel_time}
                        onChange={(e) => setTravel_time(e.target.value)}
                        className="input input-bordered text-white"
                        required
                      />
                    </div>
                  </div>
                  {/* 4th row */}
                  <div className="form-control mt-6">
                    <label className="label">
                      <span className="label-text text-white">Spot Image</span>
                    </label>
                    <input
                      type="text"
                      placeholder="spot image url"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      className="input input-bordered text-white"
                      required
                    />
                  </div>
                  <div className="form-control mt-6">
                    <button
                      type="submit"
                      className="btn bg-green-800 text-black font-bold hover:bg-green-500"
                    >
                      Add Tourist Spot
                    </button>
                  </div>
                  <div className="form-control mt-6">
                    <button
                      onClick={handleCancel}
                      className="btn bg-red-800 text-black font-bold hover:bg-red-500"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="w-4/5 h-20 mx-auto">
          <UseBackBtn>Go Back</UseBackBtn>
        </div>
      </div>
    </div>
  );
};

export default AddTouristSpots;

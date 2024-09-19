import { useEffect, useState } from "react";
import UseBackBtn from "../CustomHooks/UseBackBtn";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../CustomHooks/Loader";
import Swal from "sweetalert2";

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { spotData } = location.state || {};

  const [travelSpot, setTravelspot] = useState("");
  const [travelCountry, setTravelCountry] = useState("");
  const [travelCost, setTravelCost] = useState("");
  const [travelSeason, setTravelSeason] = useState("");
  const [travelName, setTravelName] = useState("");
  const [travelEmail, setTravelEmail] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travelDuration, setTravelDuration] = useState(1);

  useEffect(() => {
    if (spotData) {
      setTravelspot(spotData.spot);
      setTravelCountry(spotData.country);
      setTravelCost(spotData.average_cost);
      setTravelSeason(spotData.seasonality);
    }
  }, [spotData]);

  if (!spotData) {
    return <Loader />;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingInfo = {
      travelSpot,
      travelCountry,
      travelCost,
      travelSeason,
      travelName,
      travelEmail,
      travelDate,
      travelDuration,
    };

    // sending details in the backend
    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookingInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success",
            text: "Booking Added Successfully",
            icon: "success",
            background: "black",
            color: "white",
            confirmButtonText: "Cool",
            confirmButtonColor: "green",
          });

          // clearing inputs and navigating the user
          clearInputs();
          navigate(-2);
        }
      })
      .catch((error) => console.log("error in post method", error));
  };

  const handleCancel = () => {
    clearInputs();
    navigate(-2);
  };

  const clearInputs = () => {
    setTravelspot("");
    setTravelCountry("");
    setTravelCost("");
    setTravelSeason("");
    setTravelName("");
    setTravelEmail("");
    setTravelDate("");
    setTravelDuration(1);
  };
  return (
    <div className="w-full h-auto bg-blackBg">
      <div className="w-4/5 h-full my-20 mx-auto">
        <h1 className="text-center text-2xl text-white">Booking Tour</h1>
        <div className="w-full h-full">
          <div className="hero ">
            <div className="hero-content flex-col lg:flex-row ">
              <div className="w-full shrink-0 shadow-2xl bg-black rounded-xl">
                <form className="card-body w-full">
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
                        readOnly
                        value={travelSpot}
                        onChange={(e) => setTravelspot(e.target.value)}
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
                        readOnly
                        value={travelCountry}
                        onChange={(e) => setTravelCountry(e.target.value)}
                        className="input input-bordered text-white"
                      />
                    </div>
                  </div>
                  {/* 2st row */}
                  <div className="flex justify-between gap-5">
                    <div className="form-control w-1/2">
                      <label className="label">
                        <span className="label-text text-white">Cost</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Cost"
                        readOnly
                        value={travelCost}
                        onChange={(e) => setTravelCost(e.target.value)}
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
                        readOnly
                        value={travelSeason}
                        onChange={(e) => setTravelSeason(e.target.value)}
                        className="input input-bordered text-white"
                      />
                    </div>
                  </div>
                  {/* 3th row */}
                  <div className="flex justify-between gap-5">
                    <div className="form-control w-1/2">
                      <label className="label">
                        <span className="label-text text-white">Name</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Name"
                        value={travelName}
                        onChange={(e) => setTravelName(e.target.value)}
                        className="input input-bordered text-white"
                        required
                      />
                    </div>
                    <div className="form-control w-1/2">
                      <label className="label">
                        <span className="label-text text-white">Email</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Email"
                        value={travelEmail}
                        onChange={(e) => setTravelEmail(e.target.value)}
                        className="input input-bordered text-white"
                        required
                      />
                    </div>
                  </div>
                  {/* 4th row */}
                  <div className="flex justify-between gap-5">
                    <div className="form-control w-1/2">
                      <label className="label">
                        <span className="label-text text-white">Date</span>
                      </label>
                      <input
                        type="date"
                        placeholder="Date"
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="input input-bordered text-white"
                        required
                      />
                    </div>
                    <div className="form-control w-1/2">
                      <label className="label">
                        <span className="label-text text-white">
                          Travel Duration
                        </span>
                      </label>
                      <input
                        type="number"
                        max={4}
                        min={1}
                        value={travelDuration}
                        placeholder="Travel Time"
                        onChange={(e) => setTravelDuration(e.target.value)}
                        className="input input-bordered text-white"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-control mt-6">
                    <button
                      onClick={handleSubmit}
                      className="btn bg-green-800 text-black font-bold hover:bg-green-500"
                    >
                      Submit
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

export default Booking;

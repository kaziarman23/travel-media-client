import Swal from "sweetalert2";
import UseBackBtn from "../CustomHooks/UseBackBtn";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const UpdateBooking = () => {
  const loadedData = useLoaderData();
  const navigate = useNavigate();

  const [travelDate, setTravelDate] = useState("");
  const [travelDuration, setTravelDuration] = useState(1);

  useEffect(() => {
    if (loadedData) {
      setTravelDate(loadedData.travelDate || "");
      setTravelDuration(loadedData.travelDuration || 1);
    }
  }, [loadedData]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const updateInfo = {
      travelDate,
      travelDuration,
    };

    // sending details in the backend
    fetch(`http://localhost:5000/bookings/${loadedData._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Success",
            text: "Booking Updated Successfully",
            icon: "success",
            background: "black",
            color: "white",
            confirmButtonText: "Cool",
            confirmButtonColor: "green",
          });

          // clearing inputs and navigating the user
          clearInputs();
          navigate(-1);
        }
      })
      .catch((error) => console.log("error in put method", error));
  };

  const clearInputs = () => {
    setTravelDate("");
    setTravelDuration(1);
  };
  return (
    <div className="w-full h-auto bg-blackBg">
      <div className="w-4/5 h-full my-20 mx-auto">
        <h1 className="text-center text-2xl text-white">
          Updating Booking Tour
        </h1>
        <div className="w-full h-full">
          <div className="hero ">
            <div className="hero-content flex-col lg:flex-row ">
              <div className="w-full shrink-0 shadow-2xl bg-black rounded-xl">
                <form onSubmit={handleUpdate} className="card-body w-full">
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
                    <button className="btn bg-green-800 text-black font-bold hover:bg-green-500">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <UseBackBtn>Go Back</UseBackBtn>
        </div>
      </div>
    </div>
  );
};

export default UpdateBooking;

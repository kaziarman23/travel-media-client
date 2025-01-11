import UseBackBtn from "../CustomHooks/UseBackBtn";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UpdateBooking = () => {
  // states
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
    fetch(`https://travel-media-server.vercel.app/bookings/${loadedData._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          // clearing the form
          clearInputs();

          // navigating the user
          navigate(location?.state ? location?.state : "/");

          // showing alert
          toast.success("Updated successfully");
        }
      })
      .catch((error) => {
        console.log("error in put method", error);

        // showing alert
        toast.error(error);
      });
  };

  const clearInputs = () => {
    setTravelDate("");
    setTravelDuration(1);
  };
  return (
    <div className="w-full h-full bg-BlackBg">
      <div className="w-4/5 h-full mx-auto">
        <div className="hero">
          <div className="hero-content flex-col lg:flex-row ">
            <div className="w-full shrink-0 shadow-2xl bg-black rounded-xl">
              <form onSubmit={handleUpdate} className="card-body w-full">
                <h1 className="text-center text-2xl text-white font-bold">
                  Updating Tour
                </h1>
                <div className="flex justify-center flex-col gap-5 md:flex-row">
                  <div className="form-control w-full md:w-1/2">
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
                  <div className="form-control w-full md:w-1/2">
                    <label className="label">
                      <span className="label-text text-white">
                        Travel Duration
                      </span>
                    </label>
                    <input
                      type="number"
                      max={20}
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
        <div className="">
          <UseBackBtn>Go Back</UseBackBtn>
        </div>
      </div>
    </div>
  );
};

export default UpdateBooking;

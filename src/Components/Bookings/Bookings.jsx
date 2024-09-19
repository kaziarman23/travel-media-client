import { Link, useLoaderData } from "react-router-dom";
import UseBackBtn from "../CustomHooks/UseBackBtn";
import Loader from "../CustomHooks/Loader";
import Swal from "sweetalert2";
import { useState } from "react";

const Bookings = () => {
  const loadedData = useLoaderData();
  const [remaingData, setRemaingData] = useState(loadedData);

  if (!loadedData) {
    return <Loader>Loading Booking Details</Loader>;
  }

  // if the remaingData is empty then it will show a message and navigate the user.
  if (!remaingData || remaingData.length === 0) {
    return (
      <div className="w-full h-screen bg-black flex flex-col justify-center items-center">
        <h1 className="text-white font-bold text-3xl text-center mb-5 flex gap-2">
          <span className="loading loading-ring text-red-500 loading-lg"></span>
          We are waiting for your booking!{" "}
        </h1>

        <Link to="/AllTouristSpots">
          <button className="btn bg-orange-500 text-white mt-5 hover:bg-orange-700">
            Create a Booking
          </button>
        </Link>
      </div>
    );
  }

  const handleDelete = (_id) => {
    fetch(`http://localhost:5000/bookings/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          const currentDatas = remaingData.filter((datas) => datas._id !== _id);
          setRemaingData(currentDatas);

          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "Booking Deleted",
            background: "#0f172a",
            color: "white",
          });
        }
      });
  };

  return (
    <div className="w-full h-auto bg-slate-900">
      <div className="w-4/5 h-full mx-auto mt-16 overflow-hidden">
        <h1 className="text-center font-bold text-2xl my-5">
          All bookings for Mr.{remaingData[0].travelName}
        </h1>
        {/* Table div start here */}
        <div className="w-full h-full my-10">
          <div className="overflow-x-auto">
            <table className="table">
              {/* Table head */}
              <thead>
                <tr>
                  <th>SL:</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Spot</th>
                  <th>Average Cost</th>
                  <th>Travel Date</th>
                  <th>Travel Duration</th>
                  <th>Action</th>
                </tr>
              </thead>

              {/* Table body */}
              <tbody>
                {remaingData.map((booking, index) => (
                  <tr key={index} className="hover:bg-slate-800">
                    <th>{index + 1}</th>
                    <td>{booking.travelName}</td>
                    <td>{booking.travelEmail}</td>
                    <td>
                      {booking.travelSpot},
                      <br />
                      {booking.travelCountry}
                    </td>
                    <td>{booking.travelCost.toString().slice(0,3)}</td>
                    <td>{booking.travelDate}</td>
                    <td>{booking.travelDuration} day</td>
                    <td className="flex items-center justify-center gap-4">
                      <Link to={`/updateBooking/${booking._id}`}>
                        <button className="btn bg-orange-500 text-black hover:bg-orange-900 hover:text-white">
                          Update
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(booking._id)}
                        className="btn bg-red-600 text-black hover:bg-red-900 hover:text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="my-5">
          <UseBackBtn>Go Back</UseBackBtn>
        </div>
      </div>
    </div>
  );
};

export default Bookings;

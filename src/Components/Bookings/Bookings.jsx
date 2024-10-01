import { Link, useLoaderData } from "react-router-dom";
import UseBackBtn from "../CustomHooks/UseBackBtn";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import UseDeleteBtn from "../CustomHooks/UseDeleteBtn";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const loadedData = useLoaderData();
  const [remaingData, setRemaingData] = useState([]);

  useEffect(() => {
    console.log(loadedData);
    if (user) {
      const remain = loadedData.filter(
        (data) => data.travelEmail === user.email
      );
      console.log("Filtered Query:", remain);
      setRemaingData(remain);
    }
  }, [loadedData, user]);

  // if the remaingData is empty then it will show a message and navigate the user.
  if (!remaingData || remaingData.length === 0) {
    return (
      <div className="w-full h-screen bg-black flex flex-col justify-center items-center">
        <h1 className="text-white font-bold text-3xl text-center mb-5 flex gap-2">
          <span className="loading loading-ring text-red-500 loading-lg"></span>
          We are waiting for your booking!{" "}
        </h1>

        <Link to="/AllTouristSpots">
          <button className="btn bg-green-700 text-white mt-5 hover:bg-green-500 hover:text-black">
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
      <div className="w-4/5 h-full mx-auto overflow-hidden">
        {user.displayName ? (
          <h1 className="text-center font-bold text-2xl my-5">
            All bookings for Mr.{user.displayName}
          </h1>
        ) : (
          <h1 className="text-center font-bold text-2xl my-5">
            Here is your all bookings.
          </h1>
        )}
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
                  <th>Actions</th>
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
                    <td>{booking.travelCost.toString().slice(0, 3)}</td>
                    <td>{booking.travelDate}</td>
                    <td>{booking.travelDuration} day</td>
                    <td className="flex items-center justify-center gap-4">
                      <Link to={`/updateBooking/${booking._id}`}>
                        <button className="btn bg-orange-500 text-black hover:bg-orange-900 hover:text-white">
                          Update
                        </button>
                      </Link>

                      <UseDeleteBtn onClick={() => handleDelete(booking._id)}>
                        Delete
                      </UseDeleteBtn>
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

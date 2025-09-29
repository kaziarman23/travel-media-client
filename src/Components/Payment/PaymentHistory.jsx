import { useMemo } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  useDeletePaymentsMutation,
  useGetPaymentsQuery,
} from "../../Redux/features/api/paymentApi";
import Loading from "../CustomHooks/Loader";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const PaymentHistory = () => {
  // Redux state
  const { userName, userEmail } = useSelector((state) => state.userSlice);

  // RTK Query hooks
  const { data, isLoading, isError, error } = useGetPaymentsQuery();
  const [deletePayments] = useDeletePaymentsMutation();

  // Filter payments for the current user
  const payments = useMemo(
    () =>
      data?.filter((payment) => payment.userEmail === userEmail) || [],
    [data, userEmail]
  );

  // Loading state
  if (isLoading) return <Loading />;

  // Error state
  if (isError) {
    console.error("Failed to fetch payments:", error);
    toast.error("Failed to fetch payment history");
    return null;
  }

  // Empty payment history
  if (payments.length === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#e0cece]">
        <div className="flex h-40 w-4/5 flex-col items-center justify-center gap-5 rounded-2xl bg-[#c7c1c1] md:w-1/2">
          <h1 className="text-center text-base font-bold sm:text-2xl">
            {userName}, you have no payment history.
          </h1>
          <Link to="/">
            <button className="btn hover:border-none hover:bg-blue-500 hover:text-white">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Handle delete payment
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePayments(id)
          .unwrap()
          .then(() => {
            toast.success("Payment history deleted successfully");
          })
          .catch((err) => {
            console.error("Failed to delete payment history:", err);
            toast.error("Failed to delete payment history");
          });
      }
    });
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#e0cece]">
      <div className="w-11/12 overflow-hidden rounded-xl bg-[#c7c1c1]">
        <h1 className="p-2 text-center text-base font-bold lg:text-3xl">
          Payment History
        </h1>

        <div className="overflow-x-auto p-5">
          <table className="table table-zebra">
            <thead>
              <tr className="border-y-2 border-black text-base uppercase">
                <th>SL</th>
                <th>Trip Name</th>
                <th>Price</th>
                <th>Transaction Id</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment._id}>
                  <th>{index + 1}</th>
                  <td>{payment.tripTitle}</td>
                  <td>${payment.price}</td>
                  <td>{payment.transactionId}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(payment._id)}
                      type="button"
                      className="btn border-black bg-red-500 text-white hover:bg-red-600"
                    >
                      <FaRegTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;

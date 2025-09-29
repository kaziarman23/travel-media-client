import { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  useDeletePaymentsMutation,
  useGetPaymentsQuery,
} from "../../Redux/features/api/paymentApi";
import Loader from "../CustomHooks/Loader";
import { FaRegTrashAlt, FaDollarSign, FaTicketAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const PaymentHistory = () => {
  const { userName, userEmail } = useSelector((state) => state.userSlice);

  // RTK Query
  const { data, isLoading, isError, error } = useGetPaymentsQuery();
  const [deletePayments] = useDeletePaymentsMutation();

  const [isLoaded, setIsLoaded] = useState(false);

  // Filter payments for the current user
  const payments = useMemo(
    () => data?.filter((payment) => payment.userEmail === userEmail) || [],
    [data, userEmail]
  );

  // Animate page load
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 200);
  }, []);

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

  if (isLoading) return <Loader>Loading Payment History...</Loader>;
  if (isError) {
    console.error(error);
    toast.error("Failed to fetch payment history");
    return null;
  }

  if (payments.length === 0) {
    return (
      <section className="relative w-full min-h-screen bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 gap-6 h-full">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border-r border-gray-800 h-full" />
            ))}
          </div>
        </div>

        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-white rounded-full animate-float ${
                i % 3 === 0
                  ? "opacity-30"
                  : i % 3 === 1
                  ? "opacity-20"
                  : "opacity-10"
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center text-white animate-fade-in max-w-2xl px-6">
            <div className="w-24 h-24 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
              <FaTicketAlt className="text-4xl text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              No Payment History
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              {userName}, you have not made any payments yet. Complete a booking
              to see your payment history here.
            </p>
            <Link
              to="/AllTouristSpots"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/30"
            >
              Make a Booking
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-6 h-full">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-r border-gray-800 h-full" />
          ))}
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-white rounded-full animate-float ${
              i % 3 === 0
                ? "opacity-30"
                : i % 3 === 1
                ? "opacity-20"
                : "opacity-10"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {userName} Payment History
          </h1>
          <p className="text-gray-300 text-lg">
            Review all your completed payments here
          </p>
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 transition-all duration-1000 delay-200 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm hover:border-gray-700 hover:scale-105 transition-all duration-300 animate-slide-up">
            <div className="flex items-center space-x-3">
              <FaTicketAlt className="text-2xl text-blue-400" />
              <div>
                <div className="text-2xl font-bold text-blue-400">
                  {payments.length}
                </div>
                <div className="text-gray-400 text-sm">Total Payments</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm hover:border-gray-700 hover:scale-105 transition-all duration-300 animate-slide-up">
            <div className="flex items-center space-x-3">
              <FaDollarSign className="text-2xl text-yellow-400" />
              <div>
                <div className="text-2xl font-bold text-yellow-400">
                  $
                  {payments
                    .reduce((sum, p) => sum + p.price, 0)
                    .toLocaleString()}
                </div>
                <div className="text-gray-400 text-sm">Total Spent</div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment List */}
        <div
          className={`transition-all duration-1000 delay-400 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Mobile Cards */}
          <div className="block md:hidden space-y-4">
            {payments.map((payment, index) => (
              <div
                key={payment._id}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm hover:border-gray-700 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">{payment.tripTitle}</h3>
                  <span className="text-yellow-400 font-semibold">
                    ${payment.price}
                  </span>
                </div>
                <div className="flex justify-between items-center text-gray-300 text-sm mb-2">
                  <span>Transaction ID: {payment.transactionId}</span>
                </div>
                <button
                  onClick={() => handleDelete(payment._id)}
                  className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <FaRegTrashAlt />
                    <span>Delete</span>
                  </div>
                </button>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block bg-gray-900/30 border border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800/50 border-b border-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      #
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      Trip Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      Transaction ID
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, index) => (
                    <tr
                      key={payment._id}
                      className={`border-b border-gray-800 hover:bg-gray-800/30 transition-colors duration-200 animate-fade-in-up`}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <td className="px-6 py-4 text-gray-300">{index + 1}</td>
                      <td className="px-6 py-4 text-white font-medium">{payment.tripTitle}</td>
                      <td className="px-6 py-4 text-yellow-400 font-medium">${payment.price}</td>
                      <td className="px-6 py-4 text-gray-300">{payment.transactionId}</td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDelete(payment._id)}
                          className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all duration-300"
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

        {/* Back Button */}
        <div
          className={`text-center mt-12 transition-all duration-1000 delay-600 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 group"
          >
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PaymentHistory;

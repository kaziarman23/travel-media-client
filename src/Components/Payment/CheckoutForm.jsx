// src/pages/Payment/CheckoutForm.jsx
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import {
  usePostPaymentIntentMutation,
  usePostPaymentsMutation,
} from "../../Redux/features/api/paymentApi";
import { useGetBookingsQuery } from "../../Redux/features/api/bookingsApi";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../CustomHooks/Loader";

const CheckoutForm = () => {
  const { id } = useParams();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  // RTK Query
  const { data: bookings = [], isLoading, isError } = useGetBookingsQuery();
  const [postPaymentIntent] = usePostPaymentIntentMutation();
  const [postPayments] = usePostPaymentsMutation();

  // find the selected booking
  const bookingDetails = bookings.find((b) => b._id === id);

  // Initialize payment intent
  useEffect(() => {
    if (!bookingDetails?.travelCost) return;

    const fetchClientSecret = async () => {
      try {
        const amount = parseFloat(
          bookingDetails.travelCost.replace(/[^0-9.-]+/g, "")
        );
        const result = await postPaymentIntent({ price: amount }).unwrap();
        setClientSecret(result.clientSecret);
      } catch (error) {
        console.error(error);
        toast.error("Failed to initialize payment");
      }
    };

    fetchClientSecret();
  }, [bookingDetails, postPaymentIntent]);

  if (!bookingDetails) {
    return (
      <p className="text-center text-red-500 font-semibold py-10">
        Booking not found!
      </p>
    );
  }

  if (isLoading) return <Loader>Loading Booking...</Loader>;
  if (isError) {
    toast.error("Failed to load booking");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setIsProcessing(true);

    // Step 1: Create payment method
    const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (pmError) {
      console.log("pmError: ", pmError);
      setPaymentError(pmError.message);
      setIsProcessing(false);
      return;
    } else {
      console.log("PaymentMethod: ", paymentMethod);
      setPaymentError("");
    }

    // Step 2: Confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: bookingDetails.travelName,
            email: bookingDetails.travelEmail,
          },
        },
      });

    if (confirmError) {
      setPaymentError(confirmError.message);
      setIsProcessing(false);
      return;
    }

    // Step 3: Save payment
    if (paymentIntent.status === "succeeded") {
      const amount = parseFloat(
        bookingDetails.travelCost.replace(/[^0-9.-]+/g, "")
      );

      const paymentInfo = {
        bookingId: bookingDetails._id,
        tripTitle: bookingDetails.travelSpot,
        price: amount,
        userEmail: bookingDetails.travelEmail,
        transactionId: paymentIntent.id,
      };

      try {
        await postPayments(paymentInfo).unwrap();
        toast.success("Payment Successful!");
        navigate("/bookings");
      } catch {
        toast.error("Failed to save payment");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  // return (
  //   <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
  //     <CardElement
  //       className="p-3 border rounded-md bg-white"
  //       options={{
  //         style: {
  //           base: {
  //             fontSize: "1rem",
  //             color: "#000",
  //             "::placeholder": { color: "#888" },
  //           },
  //           invalid: { color: "#e53e3e" },
  //         },
  //       }}
  //     />
  //     <button
  //       type="submit"
  //       disabled={!stripe || !clientSecret || isProcessing}
  //       className="w-full py-2 bg-yellow-600 text-white font-bold rounded-lg hover:bg-yellow-500 transition-all duration-300"
  //     >
  //       {isProcessing ? "Processing..." : `Pay ${bookingDetails.travelCost}`}
  //     </button>
  //     <a
  //       href="https://docs.stripe.com/testing#cards"
  //       target="_blank"
  //       rel="noopener noreferrer"
  //       className="block w-full text-center py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-500 transition-all duration-300"
  //     >
  //       Test Cards
  //     </a>
  //     {paymentError && <p className="text-red-500 text-sm">{paymentError}</p>}
  //   </form>
  // );
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <CardElement
        className="p-4 border rounded-xl bg-gray-800 text-white"
        options={{
          style: {
            base: {
              fontSize: "1rem",
              color: "#fff",
              "::placeholder": { color: "#888" },
            },
            invalid: { color: "#e53e3e" },
          },
        }}
      />

      {paymentError && <p className="text-red-500 text-sm">{paymentError}</p>}

      <button
        type="submit"
        disabled={!stripe || !clientSecret || isProcessing}
        className="w-full py-3 bg-yellow-600 hover:bg-yellow-500 text-white font-bold rounded-xl transition-all duration-300"
      >
        {isProcessing ? "Processing..." : `Pay ${bookingDetails.travelCost}`}
      </button>

      <a
        href="https://docs.stripe.com/testing#cards"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all duration-300"
      >
        Test Cards
      </a>
    </form>
  );
};

export default CheckoutForm;

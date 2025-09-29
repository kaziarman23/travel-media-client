// src/pages/Payment/Payment.jsx
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router";
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
  const { id } = useParams();

  return (
    <div className="w-full h-screen bg-black flex justify-center items-center">
      <div className="w-11/12 md:w-2/3 lg:w-1/2 bg-gray-900/95 shadow-xl rounded-xl p-6">
        <h1 className="text-xl md:text-2xl font-bold text-center mb-6">
          Complete Your Payment
        </h1>
        <Elements stripe={stripePromise}>
          <CheckoutForm id={id} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;

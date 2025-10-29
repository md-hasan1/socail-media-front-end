/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { useCreatePaymentInfoMutation } from "@/redux/features/api/prouductApi";


const SuccessIcon = (
  <svg
    width="16"
    height="14"
    viewBox="0 0 16 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.4695 0.232963C15.8241 0.561287 15.8454 1.1149 15.5171 1.46949L6.14206 11.5945C5.97228 11.7778 5.73221 11.8799 5.48237 11.8748C5.23253 11.8698 4.99677 11.7582 4.83452 11.5681L0.459523 6.44311C0.145767 6.07557 0.18937 5.52327 0.556912 5.20951C0.924454 4.89575 1.47676 4.93936 1.79051 5.3069L5.52658 9.68343L14.233 0.280522C14.5613 -0.0740672 15.1149 -0.0953599 15.4695 0.232963Z"
      fill="white"
    />
  </svg>
);

const ErrorIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.25628 1.25628C1.59799 0.914573 2.15201 0.914573 2.49372 1.25628L8 6.76256L13.5063 1.25628C13.848 0.914573 14.402 0.914573 14.7437 1.25628C15.0854 1.59799 15.0854 2.15201 14.7437 2.49372L9.23744 8L14.7437 13.5063C15.0854 13.848 15.0854 14.402 14.7437 14.7437C14.402 15.0854 13.848 15.0854 13.5063 14.7437L8 9.23744L2.49372 14.7437C2.15201 15.0854 1.59799 15.0854 1.25628 14.7437C0.914573 14.402 0.914573 13.848 1.25628 13.5063L6.76256 8L1.25628 2.49372C0.914573 2.15201 0.914573 1.59799 1.25628 1.25628Z"
      fill="white"
    />
  </svg>
);

const InfoIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 1.5H4C2.61929 1.5 1.5 2.61929 1.5 4V10C1.5 11.3807 2.61929 12.5 4 12.5H10C11.3807 12.5 12.5 11.3807 12.5 10V4C12.5 2.61929 11.3807 1.5 10 1.5ZM4 0C1.79086 0 0 1.79086 0 4V10C0 12.2091 1.79086 14 4 14H10C12.2091 14 14 12.2091 14 10V4C14 1.79086 12.2091 0 10 0H4Z"
      fill="white"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.25 7C5.25 6.58579 5.58579 6.25 6 6.25H7.25C7.66421 6.25 8 6.58579 8 7V10.5C8 10.9142 7.66421 11.25 7.25 11.25C6.83579 11.25 6.5 10.9142 6.5 10.5V7.75H6C5.58579 7.75 5.25 7.41421 5.25 7Z"
      fill="white"
    />
    <path
      d="M5.75 4C5.75 3.31075 6.31075 2.75 7 2.75C7.68925 2.75 8.25 3.31075 8.25 4C8.25 4.68925 7.68925 5.25 7 5.25C6.31075 5.25 5.75 4.68925 5.75 4Z"
      fill="white"
    />
  </svg>
);

const STATUS_CONTENT_MAP = {
  succeeded: {
    text: "Payment succeeded",
    iconColor: "#30B130",
    icon: SuccessIcon,
  },
  processing: {
    text: "Your payment is processing.",
    iconColor: "#6D6E78",
    icon: InfoIcon,
  },
  requires_payment_method: {
    text: "Your payment was not successful, please try again.",
    iconColor: "#DF1B41",
    icon: ErrorIcon,
  },
  default: {
    text: "Something went wrong, please try again.",
    iconColor: "#DF1B41",
    icon: ErrorIcon,
  },
} as const;

// Define the type for payment statuses
type PaymentStatus = keyof typeof STATUS_CONTENT_MAP;

function CompletePage() {
  const stripe = useStripe();


  const[createPaymentInfo]=useCreatePaymentInfoMutation()
  // const price = cartData
  //   ?.reduce(
  //     (total, product) =>
  //       total + (product?.product?.price ?? 0) * product.quantity,
  //     0
  //   )
  //   .toFixed(2);
    // console.log(price)

  const [status, setStatus] = useState<PaymentStatus>("default");
  const [intent, setIntent] = useState<Record<string,any>>({});

  useEffect(() => {
    if (!stripe) return;
  
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
  
    if (!clientSecret) {
      console.error("Missing client secret in URL parameters");
      return;
    }
  
    const retrieveAndHandlePaymentIntent = async () => {
      try {
        const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
  
        if (!paymentIntent) {
          console.error("Failed to retrieve payment intent");
          return;
        }
  
        const paymentStatus = paymentIntent.status as PaymentStatus;
  
        if (paymentIntent.status === "succeeded") {
         
          const paymentData = {
            price: paymentIntent.amount / 100,
            paymentStatus: paymentIntent.status,
            intentId:paymentIntent.id
          };
        await createPaymentInfo(paymentData); // Ensure createPaymentInfo is an async function
   
        }
  
        setStatus(paymentStatus);
        setIntent(paymentIntent);
      } catch (error) {
        console.error("Error retrieving payment intent:", error);
      }
    };
  
    retrieveAndHandlePaymentIntent();
  }, [stripe,createPaymentInfo]);

  

  return (
    <div id="payment-status" className="p-6 max-w-lg mx-auto text-center">
      <div
        id="status-icon"
        className="p-4 rounded-full mx-auto flex justify-center items-center w-16 h-16"
        style={{
          backgroundColor: STATUS_CONTENT_MAP[status]?.iconColor || "#DF1B41",
        }}
      >
        {STATUS_CONTENT_MAP[status]?.icon}
      </div>
      <h2 id="status-text" className="text-lg font-semibold mt-4">
        {STATUS_CONTENT_MAP[status]?.text}
      </h2>
      {intent && (
    <div id="details-table" className="mt-6 bg-white shadow-md rounded-lg overflow-hidden">
    <table className="w-full text-left border-collapse">
      <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
        <tr>
          <th className="px-6 py-3">Field</th>
          <th className="px-6 py-3">Details</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        <tr className="hover:bg-gray-50">
          <td className="font-semibold px-6 py-4 text-gray-600">ID</td>
          <td className="px-6 py-4 text-gray-800">{intent.id}</td>
        </tr>
        <tr className="hover:bg-gray-50">
          <td className="font-semibold px-6 py-4 text-gray-600">Amount</td>
          <td className="px-6 py-4 text-gray-800">${(intent.amount / 100).toFixed(2)}</td>
        </tr>
        <tr className="hover:bg-gray-50">
          <td className="font-semibold px-6 py-4 text-gray-600">Status</td>
          <td className="px-6 py-4">
            <span
              className={`px-2 py-1 rounded text-sm ${
                status === 'succeeded'
                  ? 'bg-green-100 text-green-700'
                  : status === 'processing'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {status}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  
      )}
     
    </div>
  );
}







const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "");

export default function page() {
  return (
    <Elements stripe={stripePromise}>
      <CompletePage />
    </Elements>
  );
}

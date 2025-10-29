/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // Required for client-side rendering in Next.js
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { BillingInfo } from "./Checkout";

export default function Pay({ address }: { address: BillingInfo }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `http://localhost:3000/complete`, // Use environment variable for the base URL
      },
    });

    // Handle errors from Stripe
    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message as string);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion" as const,
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button
        disabled={isLoading || !stripe || !elements || !address}
        id="submit"
        className={`${
          isLoading || !stripe || !elements || !address
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500"
        } text-white px-4 py-2 rounded mt-4`}
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>

      {/* Display any error or success messages */}
      {message && (
        <div id="payment-message" className="text-red-500 mt-2">
          {message}
        </div>
      )}
    </form>
  );
}

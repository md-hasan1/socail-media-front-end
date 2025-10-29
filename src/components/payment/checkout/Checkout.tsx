"use client";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useCreateBillingInfoMutation,

  useUpdateBillingInfoMutation,
} from "@/redux/features/api/prouductApi";


const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ""
);
export type BillingInfo = {
  id: string;
  userId: string;
  orderId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  address: string;
  street: string | null; // Optional or nullable field
  zipCode: string;
  additionalInformation: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

const Checkout = ({ address }: { address: BillingInfo }) => {
  // const [clientSecret, setClientSecret] = useState("");

  const [createBillingInfo, { isLoading }] = useCreateBillingInfoMutation();
  const [updateBillingInfo] = useUpdateBillingInfoMutation();

  // State for form fields
  const [formData, setFormData] = useState({
    phone: address?.phone || "",
    email: address?.email || "",
    country: address?.country || " ",
    firstName: address?.firstName || "",
    lastName: address?.lastName || "",
    address: address?.address || "",
    city: address?.city || "",
    state: address?.state || "",
    zipCode: address?.zipCode || "",
    additionalInformation: address?.additionalInformation || "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = async () => {
    const response = await createBillingInfo(formData);
    if ((await response).data) {
      toast.success("Billing information saved successfully!");

      // Reset the form fields to their initial values
      setFormData({
        phone: "",
        email: "",
        country: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        additionalInformation: "",
      });
    }
  };
  const handleUpdateBilling = async () => {
    const response = await updateBillingInfo(formData);
    if ((await response).data) {
      toast.success("Billing information updated successfully!");
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 gap-8">
          {/* Left Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Contact</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                className="w-full p-3 border rounded-md"
                value={formData.phone}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-3 border rounded-md"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <h2 className="text-xl font-semibold">Billing Information!</h2>
            <div className="space-y-4">
              <Input
                name="country"
                className="w-full p-3 border rounded-md"
                placeholder="Country Name"
                onChange={handleChange}
              ></Input>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="w-full p-3 border rounded-md"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="w-full p-3 border rounded-md"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="w-full p-3 border rounded-md"
                value={formData.address}
                onChange={handleChange}
              />
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="w-full p-3 border rounded-md"
                  value={formData.city}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  className="w-full p-3 border rounded-md"
                  value={formData.state}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP Code"
                  className="w-full p-3 border rounded-md"
                  value={formData.zipCode}
                  onChange={handleChange}
                />
              </div>
              <textarea
                name="additionalInformation"
                placeholder="Additional Information"
                className="w-full p-3 border rounded-md"
                rows={4}
                value={formData.additionalInformation}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          {/* Payment Button */}
          {address ? (
            <Button
              className="w-full text-white bg-blue-500 py-3 rounded-md"
              onClick={handleUpdateBilling}
        disabled={isLoading}
            >
              { isLoading ? "Processing..." : "Change and Save"}
            </Button>
          ) : (
            <Button
              className="w-full text-white bg-blue-500 py-3 rounded-md"
              onClick={handlePayment}
              disabled={isLoading}
            >
              { isLoading ? "Processing..." : "Save Information"}
            </Button>
          )}
        </div>
      </div>
    </Elements>
  );
};

export default Checkout;
